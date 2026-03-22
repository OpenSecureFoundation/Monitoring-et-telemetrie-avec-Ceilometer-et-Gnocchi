// plan.service.js
import mongoose from "mongoose";
import PlanModel from "../models/plan.model.js";
import PlanRateModel from "../models/planRate.model.js";
import BillableMetricModel from "../models/billableMetric.model.js";
import planModel from "../models/plan.model.js";

export const newPlan = async (payload) => {
  const plan = await PlanModel.create(payload);
  return plan;
};

export const getPlans = async () => {
  return PlanModel.find().sort({ createdAt: -1 });
};

export const deletePlanById = async (planId) => {
  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    const plan = await PlanModel.findById(planId).session(session);

    if (!plan) {
      throw new Error("PLAN_NOT_FOUND");
    }

    // supprimer les rates
    await PlanRateModel.deleteMany({ planId }).session(session);

    // supprimer le plan
    await PlanModel.deleteOne({ _id: planId }).session(session);

    await session.commitTransaction();

    return true;
  } catch (err) {
    await session.abortTransaction();
    throw err;
  } finally {
    session.endSession();
  }
};

// export const getPlanById = async (planId) => {
//   const plan = await PlanModel.findById(planId).lean();

//   if (!plan) {
//     const error = new Error("PLAN_NOT_FOUND");
//     error.status = 404;
//     throw error;
//   }

//   const rates = await PlanRateModel.find({ planId }).lean();

//   return {
//     ...plan,
//     rates,
//   };
// };

export const getPlanById = async (planId) => {
  // 1️⃣ récupérer le plan
  const plan = await PlanModel.findById(planId).lean();

  if (!plan) {
    throw new Error("PLAN_NOT_FOUND");
  }

  // 2️⃣ récupérer les métriques tarifées
  const rates = await PlanRateModel.find({ planId })
    .populate("billableMetricId")
    .lean();

  // 3️⃣ transformer pour le frontend
  const metrics = rates.map((r) => ({
    planRateId: r._id,
    metricId: r.billableMetricId?._id,
    metricKey: r.billableMetricId?.metricKey,
    name: r.billableMetricId?.displayName,
    billingUnit: r.billableMetricId?.billingUnit,
    billingMode: r.billableMetricId?.billingMode,
    category: r.billableMetricId?.category,
    price: r.price,
  }));

  return {
    plan,
    metrics,
  };
};

export const setPlanStatus = async (planId, active) => {
  const plan = await PlanModel.findById(planId);

  if (!plan) {
    const err = new Error("PLAN_NOT_FOUND");
    err.status = 404;
    throw err;
  }

  if (plan.status === "archived") {
    const err = new Error("ARCHIVED_PLAN_CANNOT_BE_MODIFIED");
    err.status = 400;
    throw err;
  }

  if (active) {
    // 🔥 désactiver autres versions du même catalogue
    await PlanModel.updateMany(
      {
        name: plan.name,
        _id: { $ne: plan._id },
      },
      {
        status: "inactive",
        deactivatedAt: new Date(),
      },
    );

    plan.status = "active";
    plan.activatedAt = new Date();
    plan.deactivatedAt = null;
  } else {
    plan.status = "inactive";
    plan.deactivatedAt = new Date();
  }

  await plan.save();

  return plan;
};

export const getAvailableMetricsForPlan = async (planId) => {
  // 1️⃣ récupérer les métriques déjà tarifées
  const existingRates = await PlanRateModel.find({ planId }).select(
    "billableMetricId",
  );
  console.log("Métriques déjà tarifées: ", existingRates);

  const existingMetricIds = existingRates.map((rate) => rate.billableMetricId);

  console.log("existing metric ids: ", existingMetricIds);

  // 2️⃣ récupérer les métriques disponibles
  const availableMetrics = await BillableMetricModel.find({
    _id: { $nin: existingMetricIds },
    isActive: true,
  }).sort({ category: 1, displayName: 1 });

  console.log("available metrics: ", availableMetrics);

  return availableMetrics;
};

export const addMetricPric = async (planId, payload) => {
  const { billableMetricId, price } = payload;

  // 1️⃣ Vérifier si la métrique existe et est active
  const metric = await BillableMetricModel.findById(billableMetricId);

  if (!metric || !metric.isActive) {
    throw new Error("METRIC_NOT_AVAILABLE");
  }

  // 2️⃣ Vérifier le doublon métier
  const existing = await PlanRateModel.findOne({
    planId,
    billableMetricId,
  });

  if (existing) {
    throw new Error("METRIC_ALREADY_PRICED");
  }

  // 3️⃣ Création du tarif
  const rate = await PlanRateModel.create({
    planId,
    billableMetricId,
    price,
  });

  // 4️⃣ Update atomique compteur
  await PlanModel.updateOne({ _id: planId }, { $inc: { ratesCount: 1 } });

  // 5️⃣ 🔥 Construire directement l'objet de réponse métier
  return {
    planRateId: rate._id,
    metricId: metric._id,
    metricKey: metric.key,
    name: metric.name,
    billingUnit: metric.billingUnit,
    billingMode: metric.billingMode,
    category: metric.category,
    price: rate.price,
  };
};

export const updatePlanVersioned = async ({ planId, rateId, newPrice }) => {
  // 🔎 récupérer plan courant
  const currentPlan = await PlanModel.findById(planId);
  if (!currentPlan) {
    throw new Error("PLAN_NOT_FOUND");
  }

  // 🧠 récupérer toutes les métriques du plan
  const rates = await PlanRateModel.find({ planId });
  if (!rates.length) {
    throw new Error("PLAN_HAS_NO_RATES");
  }

  // 🔴 désactiver ancienne version
  currentPlan.status = "inactive";
  await currentPlan.save();

  // 🟢 créer nouvelle version
  const newPlan = await PlanModel.create({
    name: currentPlan.name,
    description: currentPlan.description,
    currency: currentPlan.currency,
    billingCycle: currentPlan.billingCycle,
    basePrice: currentPlan.basePrice,
    status: "inactive",
    version: currentPlan.version + 1,
    createdBy: userId, // 👈 on ajoutera le userId provenant du token avec req.user.id
  });

  let updatedRate = null;

  // 🔁 cloner toutes les métriques
  for (const r of rates) {
    const cloned = await PlanRateModel.create({
      planId: newPlan._id,
      billableMetricId: r.billableMetricId,
      price: r._id.toString() === rateId ? newPrice : r.price,
    });

    if (r._id.toString() === rateId) {
      updatedRate = cloned;
    }
  }

  return {
    newPlan,
    updatedRate,
  };
};

export const deletePlanRate = async (planId, rateId) => {
  const rate = await PlanRateModel.findOneAndDelete({
    _id: rateId,
    planId,
  });

  if (!rate) {
    throw new Error("RATE_NOT_FOUND");
  }

  return true;
};
