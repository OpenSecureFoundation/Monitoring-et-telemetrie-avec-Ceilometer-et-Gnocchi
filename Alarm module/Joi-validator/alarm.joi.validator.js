// Importation des modules
import joi from "joi";

// --- Schéma de validation ---
const alarmJoiSchema = joi.object({
  name: joi.string().required(),
  description: joi.string().required(),
  type: joi.string().valid("gnocchi_resources_threshold").required(),
  severity: joi.string().valid("critical", "major", "minor", "info").required(),
  enabled: joi.boolean().default(true),
  repeat_actions: joi.boolean().default(false),

  // --- AJOUT ICI ---
  time_constraints: joi
    .array()
    .items(
      joi.object({
        name: joi.string().required(),
        start: joi.string().required(), // Format "HH:MM" ou cron
        duration: joi.number().integer().required(),
        description: joi.string().optional(),
        timezone: joi.string().optional(),
      }),
    )
    .default([]),
  // -----------------

  gnocchi_resources_threshold_rule: joi
    .object({
      resource_type: joi.string().required(),
      resource_id: joi
        .string()
        .guid({ version: ["uuidv4"] })
        .required(),
      metric: joi.string().required(),
      aggregation_method: joi
        .string()
        .valid("mean", "max", "min", "sum")
        .default("mean"),
      comparison_operator: joi
        .string()
        .valid("gt", "lt", "ge", "le", "eq", "ne")
        .required(),
      threshold: joi.number().required(),
      granularity: joi.number().integer().required(),
      evaluation_periods: joi.number().integer().required(),
    })
    .required(),

  alarm_actions: joi.array().items(joi.string().uri()).default([]),
  ok_actions: joi.array().items(joi.string().uri()).default([]),
  insufficient_data_actions: joi.array().items(joi.string().uri()).default([]),
});

export default alarmJoiSchema;
