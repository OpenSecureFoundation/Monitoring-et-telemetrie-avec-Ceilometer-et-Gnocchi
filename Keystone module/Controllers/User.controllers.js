// Importation des services Keystone
import { authenticateKeystone } from "../Services/Keystone.service.js";
// Importation des utils JWT et CatchAsync
import generateJWT from "../../Utils/jwt.js";
import catchAsync from "../../Utils/Catch-async.js";

// Export de la fonction login
export const login = catchAsync(async (req, res, next) => {
  const { username, password } = req.body;
  console.log("body data", req.body);

  // ➡️ <--- Appel à Keystone pour authentification --->
  const tokenData = await authenticateKeystone(username, password);

  // ➡️ <--- Génération d’un JWT interne pour ta session applicative --->
  const appToken = generateJWT({
    username: username,
    password: password,
    userId: tokenData.user.id,
  });
  console.log("app token: ", appToken);

  // ➡️ <--- Réponse sécurisée au frontend ---->
  res.status(200).json({
    message: "Authentification réussie",
    user: {
      jwt: appToken,
      keystoneToken: tokenData.token, // ➡️ <--- À envoyer ou non selon ta politique --->
      user: tokenData.user,
    },
  });
});
