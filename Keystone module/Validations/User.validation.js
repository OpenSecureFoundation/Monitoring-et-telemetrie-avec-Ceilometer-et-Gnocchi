// Importation des modules
import joi from "joi";

const userJoiSchema = joi.object({
  username: joi
    .string()
    .pattern(new RegExp("^[a-zA-Z0-9_-]+$"))
    .min(3)
    .max(30)
    .required(),
  password: joi.string().pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")).required(),
});

export default userJoiSchema;
