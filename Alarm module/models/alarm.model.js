import mongoose from "mongoose";

const alarmSchema = new mongoose.Schema(
  {
    alarmId: {
      type: String,
      required: true,
      index: true,
    },

    alarmName: {
      type: String,
      required: true,
    },

    userId: {
      type: String,
      required: true,
    },

    userEmail: {
      type: String,
      required: true,
    },

    projectId: {
      type: String,
    },

    resourceId: {
      type: String,
    },

    metric: {
      type: String,
    },

    threshold: {
      type: Number,
    },

    severity: {
      type: String,
      enum: ["low", "moderate", "critical"],
    },

    state: {
      type: String,
      enum: ["alarm", "ok", "insufficient data"],
    },

    reason: {
      type: String,
    },

    timestamp: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  },
);

export const Alarm = mongoose.model("Alert", alarmSchema);

// export default Alert = mongoose.model("Alert", alertSchema);
