// Importation des modules
import joi from "joi";

const rateSchema = joi.object({
  resourceKey: joi.string().required(),
  unit: joi.string().required(),
  price: joi.number().min(0).required(),
});

export default rateSchema;
