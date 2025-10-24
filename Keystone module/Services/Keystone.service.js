// Importation des modules
import axios from "axios";

// Importation de setKeystoneToken, getKeystoneToken
import {
  setKeystoneToken,
  getKeystoneToken,
} from "../Services/keystoneTokenStore.js";

// Importation des utils Error formatter et catchAsync
import { errorFormat } from "../../Utils/Error-formatter.util.js";
import { catchAsyncFn } from "../../Utils/catch-asyncFn.util.js";

// Export de la fonction authenticateKeystone
export const authenticateKeystone = async (username, password) => {
  const authBody = {
    auth: {
      identity: {
        methods: ["password"],
        password: {
          user: {
            name: username,
            domain: { name: "Default" },
            password: password,
          },
        },
      },
      scope: {
        project: { name: "admin", domain: { name: "Default" } },
      },
    },
  };

  const response = await axios.post(
    `${process.env.KEYSTONE_ENDPOINT}/auth/tokens`,
    authBody,
    { validateStatus: () => true }
  );

  if (response.status !== 201) {
    throw new errorFormat("Erreur d'authentification Keystone", 401);
  }

  const token = response.headers["x-subject-token"];
  const user = response.data.token.user;
  setKeystoneToken(token); // Sauvegarde du token Keystone

  // Retourne le token et l'utilisateur
  return {
    token: token,
    user: user,
  };
};

// Export de la fonction getProjects
export const KeystoneProject = {
  getProjects: catchAsyncFn(async () => {
    // Récupération du token Keystone depuis le store
    const token = getKeystoneToken();

    // Appel de l'API Keystone pour récupérer les projets
    const response = await axios.get(
      `${process.env.KEYSTONE_ENDPOINT}/v3/projects`,
      {
        headers: {
          "X-Auth-Token": token,
        },
      }
    );

    // Vérification de la réponse
    if (!response.data.projects) {
      throw new errorFormat(
        "Aucun projet trouvé dans la réponse de Keystone",
        404
      );
    }

    // Retourne les projets sous forme d'un tableau
    return response.data.projects.map((proj) => ({
      id: proj.id,
      name: proj.name,
      domain_id: proj.domain_id,
      enabled: proj.enabled,
    }));
  }),
};
