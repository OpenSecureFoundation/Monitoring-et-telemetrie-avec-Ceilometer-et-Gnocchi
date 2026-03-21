// main.js
import "./config.env.js";
import http from "node:http";
import app from "./app.js";
import connectMongoDB from "./Config/mongo.js";
import catchAsyncFn from "./Utils/catch-asyncFn.js";
import { startAuditWatcher } from "./Event-module/Watcher/watcher.js";
import { Server } from "socket.io";
export let io;

// Normalisation du port (une seule définition)
const normalizePort = (val) => {
  const port = Number.parseInt(val, 10);
  if (Number.isNaN(port)) return val; // si val n'est pas un nombre (pipe)
  if (port >= 0) return port; // port valide
  return false; // port invalide
};

// Gestion des erreurs serveur
const errorHandler = (error, port) => {
  if (error.syscall !== "listen") throw error;

  const bind = typeof port === "string" ? "pipe " + port : "port " + port;

  switch (error.code) {
    case "EACCES":
      console.error(bind + " requires elevated privileges.");
      process.exit(1);
    case "EADDRINUSE":
      console.error(bind + " is already in use.");
      process.exit(1);
    default:
      throw error;
  }
};

// 🔹 Démarrage du serveur après connexion MongoDB
const initializeServer = catchAsyncFn(
  async () => {
    console.log("🔗 Connecting to MongoDB...");
    await connectMongoDB();
    console.log("🟢 MongoDB connected successfully");

    const port = normalizePort(process.env.PORT);
    app.set("port", port);

    // Create Http serveur
    const server = http.createServer(app);

    // 🔹 Initialisation de Socket.IO sur le même serveur HTTP
    io = new Server(server, {
      cors: {
        origin: "*",
      },
    });

    // 🔹 Gestion des connexions socket
    io.on("connection", (socket) => {
      console.log("🔌 Client Socket connecté :", socket.id);

      socket.on("disconnect", () => {
        console.log("❌ Client Socket déconnecté :", socket.id);
      });
    });

    // 🔹 Démarre le watcher d’audit Keystone en arrière-plan
    await startAuditWatcher();
    server.on("error", (err) => errorHandler(err, port));
    server.on("listening", () => {
      const address = server.address();
      const bind =
        typeof address === "string" ? "pipe " + address : "port " + port;
      console.log(
        `🟢 Server listening on ${bind} in ${process.env.NODE_ENV} mode`,
      );
    });

    server.listen(port);
  },
  { exitOnError: true },
);

// Initialise server
initializeServer(); // si erreur critique → process.exit(1)
