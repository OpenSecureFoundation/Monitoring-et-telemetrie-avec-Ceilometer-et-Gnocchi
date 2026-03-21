// --- Importation des modules ---
import express from "express";

// --- Importation des middlewares ---
import handleError from "./Middlewares/Error.middl.js";

// --- Importation des routes ---
import userRouter from "./Keystone module/Routes/User.routes.js";
import projectRoutes from "./Keystone module/Routes/Project.routes.js";
import alertRoutes from "./Alarm module/Routes/Alert.routes.js";
import instanceRoutes from "./Resource monitoring/routes/instance.routes.js";
import portRoutes from "./Metric monitoring/Network/route/port.route.js";
import instMetricRoutes from "./Metric monitoring/routes/metric.instance.route.js";
import planRoutes from "./Plan/routes/plan.route.js";

import billingRoute from "./Billing/Engine/runBillingEngine.js";
// import networkRoutes from "./Resource monitoring/routes/network.routes.js";
// import volumeRoutes from "./Resource monitoring/routes/volume.routes.js";

// --- Initialisation de l'application ---
const app = express();

// --- Autoriser les requetes de n'importe quel origine (CORS) ---
app.use((req, res, next) => {
  // --- Permet à tous les domaines d'accéder à l'API ---
  res.header("Access-Control-Allow-Origin", "*");

  // --- Correction de la syntaxe : tous les headers sont dans la même chaîne ---
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization",
  );

  // --- Optionnel, mais recommandé pour les requêtes non GET/POST ---
  res.header(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS",
  );

  // --- Passez le flux au prochain middleware ---
  next();
});

// --- Utilisation de express.json() ---
app.use(express.json());

// --- Utilisation des routes ---
// --- Toutes les routes définies dans userRouter seront préfixées par /api/user ---
app.use("/api/auth", userRouter);

// --- Toutes les routes définies dans projectRoutes seront préfixées par / ---
app.use("/", projectRoutes);

// --- Toutes les routes définies dans alertRoutes seront préfixées par / ---
app.use("/", alertRoutes);

// --- Toutes les routes définies dans instanceRoutes seront préfixées par / ---
app.use("/", instanceRoutes);

//
app.use("/", portRoutes);

//
app.use("/", instMetricRoutes);

//
app.use("/plan", planRoutes);

app.use("/billing/run", billingRoute);
// --- Toutes les routes définies dans instanceRoutes seront préfixées par / ---
// app.use("/", networkRoutes);

// --- Toutes les routes définies dans instanceRoutes seront préfixées par / ---
// app.use("/", volumeRoutes);

// --- Utilisation de handle error ---
app.use(handleError);

// --- Exportation principale (par défaut) du fichier app.js ---
export default app;
