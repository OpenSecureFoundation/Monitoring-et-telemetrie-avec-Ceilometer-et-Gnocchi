// planRate.model.js
import mongoose from "mongoose";
const PlanRateSchema = new mongoose.Schema(
  {
    planId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Plan",
      required: true,
      index: true,
    },

    billableMetricId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "BillableMetric",
      required: true,
      index: true,
    },

    price: {
      type: Number,
      required: true,
      min: 0,
    },
  },
  {
    versionKey: false,
  },
);

// PlanRateSchema.index({ planId: 1, metricKey: 1 }, { unique: true });

export default mongoose.model("PlanRate", PlanRateSchema);
