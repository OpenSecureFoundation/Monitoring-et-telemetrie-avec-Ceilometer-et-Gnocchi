// plan.routes.js

import express from "express";
import {
  createPlan,
  fetchPlans,
  getPlanDetails,
  togglePlanStatus,
  deletePlan,
  getAvailableMetrics,
  addMetricPrice,
  // updatePlan,
  updatePlanVersion,
  deletePlanRat,
} from "../contoller/plan.controller.js";
import { authMidll } from "../../Middlewares/Auth.middl.js";
import validateRequest from "../../Middlewares/Validate.middl.js";
import createPlanSchema from "../joi-validations/Plan.validation.js";

const router = express.Router();

// router.post(
//   "/create",
//   validateRequest(createPlanSchema),
//   authMidll,
//   createPlan,
// );

router.post("/create", validateRequest(createPlanSchema), createPlan);

// plan.routes.js
// router.get("/list", authMidll, fetchPlans);

router.get("/list", fetchPlans);

// router.get("/:id", authMidll, fetchPlanById);

router.get("/:id/details", getPlanDetails);

// router.patch("/status", authMidll, togglePlanStatus);

router.patch("/status", togglePlanStatus);

// router.delete("/:id", authMidll, deletePlan);

router.delete("/:id", deletePlan);

router.get("/:id/available-metrics", getAvailableMetrics);

router.post("/:id/metrics", addMetricPrice);

router.patch("/:id/version", updatePlanVersion);

router.delete("/:id/planRate", deletePlanRat);

// router.put("/update/:id", updatePlan);

export default router;
