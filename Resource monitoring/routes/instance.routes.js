import express from "express";
import {
  getInstanceOverview,
  getResourceOverview,
} from "../controllers/instance.controller.js";
import { authMidll } from "../../Middlewares/Auth.middl.js";
import { getInstancePorts } from "../controllers/port.controller.js";

const router = express.Router();

// router.post(
//   "/project/:projectId/instance/:instanceId/overview",
//   authMidll,
//   getInstanceOverview,
// );

router.post(
  "/project/:projectId/instance/:instanceId/overview",
  authMidll,
  getResourceOverview,
);

router.get(
  "/project/:projectId/instance/:instanceId/port",
  authMidll,
  getInstancePorts,
);

export default router;
