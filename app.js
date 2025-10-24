// Importation des modules
const express = require("express");
const bodyParser = require("body-parser");
const catchAsync = require("./Utils/Catch-async.js");
const errorHandler = require("./Middlewares/Error-middl.js");
// Importation des routes
const userRouter = require("./Routes/Users.routes.js");

// Initialisation de l'application
const app = express();

// Autoriser les requetes de n'importe quel origine
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept",
    "Authorization"
  );
  next();
});

// Utilisation de body-parser
app.use(bodyParser.json());

// Utilisation de express.json()
app.use(express.json());

// Utilisation de express.urlencoded()
app.use(express.urlencoded({ extended: true }));

// Utilisation de express.static()
app.use(express.static("public"));

// Utilisation de catchAsync
app.use(catchAsync);

// Utilisation des routes
app.use("/api/user", userRouter);

// Utilisation de error middl
app.use(errorHandler);

module.exports = app;
