// plan.model.js
import mongoose from "mongoose";

const PlanSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      trim: true,
    },

    currency: {
      type: String,
      required: true,
      uppercase: true,
      default: "XAF",
      enum: ["XAF", "EUR", "USD"],
    },

    billingCycle: {
      type: String,
      enum: ["hourly", "daily", "weekly", "monthly", "yearly"],
      default: "monthly",
    },

    basePrice: {
      type: Number,
      default: 0,
      min: 0,
    },

    status: {
      type: String,
      enum: ["active", "inactive", "archived"],
      default: "inactive",
    },

    version: {
      type: Number,
      default: 1,
    },

    ratesCount: {
      type: Number,
      default: 0,
    },

    activatedAt: {
      type: Date,
    },
    deactivatedAt: {
      type: Date,
      default: Date.now(),
    },
    createdBy: {
      type: String,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
  {
    versionKey: false,
  },
);

// Désactive automatiquement l'ancien plan actif avant d'en activer un nouveau
PlanSchema.pre("save", async function (next) {
  if (this.isModified("status") && this.status === "active") {
    await this.constructor.updateMany(
      { status: "active", _id: { $ne: this._id } },
      { status: "inactive", deactivatedAt: new Date() },
    );
    this.activatedAt = new Date();
  }
  next();
});

PlanSchema.virtual("rates", {
  ref: "PlanRate",
  localField: "_id",
  foreignField: "planId",
});

export default mongoose.model("Plan", PlanSchema);
