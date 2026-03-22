import express from "express";
import { getPortMetrics } from "../controller/port.controller.js";
import { authMidll } from "../../../Middlewares/Auth.middl.js";

const router = express.Router();

router.post(
  "/project/:projectId/net-inst/:instanceId/metrics",
  authMidll,
  getPortMetrics,
);

export default router;
