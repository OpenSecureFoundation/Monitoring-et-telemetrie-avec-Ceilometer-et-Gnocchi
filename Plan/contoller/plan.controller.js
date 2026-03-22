// plan.controller.js
import {
  newPlan,
  getPlans,
  deletePlanById,
  getPlanById,
  setPlanStatus,
  getAvailableMetricsForPlan,
  addMetricPric,
  updatePlanVersioned,
  deletePlanRate,
} from "../service/plan.service.js";

export const createPlan = async (req, res, next) => {
  try {
    const payload = {
      ...req.body,
      // createdBy: req.user.id, // ⭐ injecté par middleware
    };

    const plan = await newPlan(payload);

    res.status(201).json({
      success: true,
      message: "Plan created successfully",
      data: plan,
    });
  } catch (err) {
    next(err);
  }
};

export const fetchPlans = async (req, res, next) => {
  try {
    const plans = await getPlans();

    const stats = {
      totalPlans: plans.length,
      activePlans: plans.filter((p) => p.status === "active").length,
      inactivePlans: plans.filter((p) => p.status === "inactive").length,
      archivedPlans: plans.filter((p) => p.status === "archived").length,
    };

    res.json({
      success: true,
      message: "Plans fetched successfully",
      stats: stats,
      data: plans,
    });
  } catch (err) {
    next(err);
  }
};

export const deletePlan = async (req, res, next) => {
  try {
    await deletePlanById(req.params.id);

    res.json({
      success: true,
      message: "Plan deleted successfully",
    });
  } catch (err) {
    if (err.message === "PLAN_NOT_FOUND") {
      return res.status(404).json({
        success: false,
        message: "Plan not found",
      });
    }

    next(err);
  }
};

// export const fetchPlanById = async (req, res, next) => {
//   try {
//     const plan = await getPlanById(req.params.id);

//     res.json({
//       success: true,
//       message: "Plan fetched successfully",
//       data: plan,
//     });
//   } catch (err) {
//     next(err);
//   }
// };

export const getPlanDetails = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await getPlanById(id);

    return res.status(200).json({
      success: true,
      message: "Plan details fetched successfully",
      data: result,
    });
  } catch (error) {
    console.error("Plan details error:", error);

    if (error.message === "PLAN_NOT_FOUND") {
      return res.status(404).json({
        success: false,
        message: "Plan not found",
      });
    }

    return res.status(500).json({
      success: false,
      message: "Failed to fetch plan details",
    });
  }
};

export const togglePlanStatus = async (req, res, next) => {
  try {
    const { planId, active } = req.body;

    if (typeof active !== "boolean") {
      return res.status(400).json({
        success: false,
        message: "active must be boolean",
      });
    }

    const plan = await setPlanStatus(planId, active);

    res.json({
      success: true,
      message: active ? "Plan activated" : "Plan deactivated",
      data: plan,
    });
  } catch (err) {
    next(err);
  }
};

export const getAvailableMetrics = async (req, res) => {
  try {
    const { id: planId } = req.params;

    const metrics = await getAvailableMetricsForPlan(planId);

    return res.status(200).json({
      success: true,
      message: "Available metrics fetched successfully",
      // stats: {
      //   count: metrics.length,
      // },
      data: metrics,
    });
  } catch (error) {
    console.error("Error fetching available metrics:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch available metrics",
    });
  }
};

export const addMetricPrice = async (req, res) => {
  try {
    const { id: planId } = req.params;

    const data = await addMetricPric(planId, req.body);

    return res.status(201).json({
      success: true,
      message: "Metric price added successfully",
      data,
    });
  } catch (error) {
    console.error("Add metric price error:", error);

    if (error.message === "METRIC_ALREADY_PRICED") {
      return res.status(409).json({
        success: false,
        message: "Metric already priced in this plan",
      });
    }

    if (error.message === "METRIC_NOT_AVAILABLE") {
      return res.status(404).json({
        success: false,
        message: "Metric not available",
      });
    }

    return res.status(500).json({
      success: false,
      message: "Failed to add metric price",
    });
  }
};

export const updatePlanVersion = async (req, res) => {
  try {
    // TODO: Add authentication check here
    const { planId } = req.params;
    const { planRateId, price } = req.body;

    const result = await updatePlanVersioned({
      planId: planId,
      rateId: planRateId,
      newPrice: price,
    });

    return res.json({
      success: true,
      message: "Nouvelle version du catalogue créée",
      data: result,
    });
  } catch (err) {
    if (err.message === "PLAN_NOT_FOUND") {
      return res.status(404).json({ message: "Plan introuvable" });
    }

    if (err.message === "PLAN_HAS_NO_RATES") {
      return res.status(400).json({ message: "Aucune métrique sur ce plan" });
    }

    return res.status(500).json({
      message: err.message,
    });
  }
};

export const deletePlanRat = async (req, res) => {
  try {
    const { id: planId } = req.params;

    await deletePlanRate(planId, req.body.rateId);

    return res.status(200).json({
      success: true,
      message: "Metric removed from plan",
    });
  } catch (error) {
    console.error("Delete metric error:", error);

    if (error.message === "RATE_NOT_FOUND") {
      return res.status(404).json({
        success: false,
        message: "Metric price not found in this plan",
      });
    }

    return res.status(500).json({
      success: false,
      message: "Failed to delete metric price",
    });
  }
};
