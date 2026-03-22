import mongoose from "mongoose";

const BillableMetricSchema = new mongoose.Schema({
  metricKey: {
    type: String,
    required: true,
  },

  displayName: {
    type: String,
    required: true,
  },

  technicalUnit: {
    type: String,
    required: true,
  },

  billingUnit: {
    type: String,
    required: true,
  },

  billingMode: {
    type: String,
    required: true,
  },

  category: {
    type: String,
    required: true,
  },

  isActive: {
    type: Boolean,
    default: true,
  },
});

export default mongoose.model("BillableMetric", BillableMetricSchema);
