// Importation des modules
import express from "express";
import validateRequest from "../../Middlewares/Validate.middl.js";
import { getAlertOverview } from "../Controllers/alertOverview.controller.js";
import { authMidll } from "../../Middlewares/Auth.middl.js";
import alarmJoiSchema from "../Joi-validator/alarm.joi.validator.js";
import { createAlarm } from "../Controllers/createAlarms.controller.js";
import { sendAlarm } from "../Controllers/sendAlarm.controller.js";
import { getInstanceAlarmsController } from "../Controllers/getInstanceAlarm.js";
import { validateWebhookSecret } from "../../Middlewares/webhookAuth.middl.js";

// Création du routeur
const router = express.Router();

// Route pour récupérer les alarms
router.get("/alarms", authMidll, getAlertOverview);

// Route pour créer une alarme
router.post(
  "/project/:projectId/create/alarm",
  validateRequest(alarmJoiSchema, "body"),
  authMidll,
  createAlarm,
);

// Route pour envoyer une alarme
router.post("/webhook/alarm", validateWebhookSecret, sendAlarm);

router.get(
  "/project/:projectId/instance/:instanceId/alarms",
  authMidll,
  getInstanceAlarmsController,
);

// Exportation du routeur
export default router;
