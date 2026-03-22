// Importation des modules
import joi from "joi";

const createPlanSchema = joi.object({
  name: joi.string().required(),

  description: joi.string().allow("", null),

  currency: joi.string().default("XAF"),

  billingCycle: joi
    .string()
    .valid("monthly", "hourly", "weekly", "daily")
    .default("monthly"),

  basePrice: joi.number().min(0).default(0),

  // 1. On retire .email() pour accepter ton ID technique
  // createdBy: joi.string().optional(),

  // 2. On ajoute les champs manquants pour que Joi les accepte
  status: joi.string().valid("active", "inactive").default("inactive"),

  version: joi.number().integer().default(1),
});

export default createPlanSchema;
