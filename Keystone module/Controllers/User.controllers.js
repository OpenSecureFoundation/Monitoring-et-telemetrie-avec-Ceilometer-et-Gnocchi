// Importation des services Keystone
import { authenticateKeystone } from "../Services/Keystone.service.js";
// Importation des utils JWT et CatchAsync
import { generateJWT } from "../../Utils/jwt.util.js";
import { catchAsync } from "../../Utils/Catch-async.util.js";

// Export de la fonction login
export const login = catchAsync(async (req, res, next) => {
  const { username, password } = req.body;
  console.log("body data", req.body);

  // 1️⃣ Appel à Keystone pour authentification
  const tokenData = await authenticateKeystone(username, password);

  // 2️⃣ Génération d’un JWT interne pour ta session applicative
  const appToken = generateJWT({ username });

  // 3️⃣ Réponse sécurisée au frontend
  res.status(200).json({
    message: "Authentification réussie",
    jwt: appToken,
    keystoneToken: tokenData.token, // ⚠️ À envoyer ou non selon ta politique
    user: tokenData.user,
  });
});
