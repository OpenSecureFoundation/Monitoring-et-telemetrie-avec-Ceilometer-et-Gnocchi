import express from "express";
import { getInstanceMetrics } from "../controllers/metric.instance.controller.js";
import { authMidll } from "../../Middlewares/Auth.middl.js";

const router = express.Router();

router.post(
  "/project/:projectId/instance/:instanceId/metrics",
  authMidll,
  getInstanceMetrics,
);

export default router;
