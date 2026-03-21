// ➡️ <--- Importation des modules --->
import axios from "axios";

// ➡️ <--- Importation de setKeystoneToken, getKeystoneToken --->
import {
  setKeystoneToken,
  getKeystoneToken,
} from "../Services/keystoneTokenStore.js";

// ➡️ <--- Importation des utils Error formatter et catchAsync --->
import format from "../../Utils/format-error.js";
import catchAsyncFn from "../../Utils/catch-asyncFn.js";
import { getCachedKeystoneToken } from "../../Keystone module/Services/getCachedKeystoneToken.js";

// ➡️ <--- Export de la fonction authenticateKeystone --->
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
    },
  };

  const response = await axios.post(
    `${process.env.KEYSTONE_ENDPOINT}/auth/tokens`,
    authBody,
    { validateStatus: () => true },
  );

  if (response.status !== 201) {
    throw new format("Erreur d'authentification Keystone", 401);
  }

  const token = response.headers["x-subject-token"];

  const user = response.data.token.user;
  console.log("user data: ", user);
  setKeystoneToken(token); // ➡️ <--- Sauvegarde du token Keystone --->

  // ➡️ <--- Retourne le token et l'utilisateur --->
  return {
    token: token,
    user: user,
  };
};

// ➡️ <--- Export de la fonction getProjects --->
export const KeystoneProject = {
  getProjects: async () => {
    // ➡️ <--- Récupération du token Keystone depuis le cache --->
    const token = getKeystoneToken();

    // ➡️ <--- Appel de l'API Keystone pour récupérer les projets --->
    const response = await axios.get(
      `${process.env.KEYSTONE_ENDPOINT}/auth/projects`,
      {
        headers: {
          "X-Auth-Token": token,
        },
      },
    );

    // ➡️ <--- Vérification de la réponse --->
    if (!response.data.projects) {
      throw new format("Aucun projet trouvé", 404);
    }

    // ➡️ <--- Retourne les projets sous forme d'un tableau --->
    return response.data.projects;
  },
};

// ➡️ <--- Obtenir token scoped pour un projet spécifique --->
export const getScopedToken = async (username, password, projectId) => {
  console.log(username, password, projectId);
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
        project: {
          id: projectId, // ➡️ <--- SCOPED au projet sélectionné --->
        },
      },
    },
  };

  const response = await axios.post(
    `${process.env.KEYSTONE_ENDPOINT}/auth/tokens`,
    authBody,
  );

  if (response.status !== 201) {
    throw new format("Erreur d'authentification Keystone", 401);
  }

  const token = response.headers["x-subject-token"];
  console.log("token scoped project: ", token);

  return token;
};

// ➡️ <--- Export de la fonction getUserById --->
export const KeystoneUser = {
  getUserById: catchAsyncFn(
    async (userId) => {
      const token = getCachedKeystoneToken();
      const response = await axios.get(
        `${process.env.KEYSTONE_ENDPOINT}/v3/users/${userId}`,
        { headers: { "X-Auth-Token": token } },
      );
      return response.data.user;
    },
    { exitOnError: false },
  ),
};

export const KeystoneService = {
  getProject: async (projectId, scopedToken) => {
    const res = await axios.get(
      `${process.env.KEYSTONE_ENDPOINT}/projects/${projectId}`,
      { headers: { "X-Auth-Token": scopedToken } },
    );

    const p = res.data.project;
    console.log("project data: ", p);
    return {
      id: p.id,
      name: p.name,
      description: p.description,
      enabled: p.enabled,
    };
  },

  getUser: async (userId, token) => {
    const res = await axios.get(
      `${process.env.KEYSTONE_ENDPOINT}/users/${userId}`,
      { headers: { "X-Auth-Token": token } },
    );
    const u = res.data.user;
    console.log("user selected notification: ", u);
    return {
      id: u.id,
      name: u.name,
      email: u.email,
      enabled: u.enabled,
    };
  },

  getProjectUsers: async (projectId, scopedToken) => {
    // ➡️ <--- Récupérer les assignations de rôle pour ce projet --->
    const res = await axios.get(
      `${process.env.KEYSTONE_ENDPOINT}/role_assignments`,
      {
        headers: { "X-Auth-Token": scopedToken },
        params: {
          "project.id": projectId,
          include_names: true,
        },
      },
    );

    // ➡️ <--- Construire un dictionnaire pour stocker les rôles par utilisateur --->
    const usersMap = {};

    res.data.role_assignments.forEach((assignment) => {
      const user = assignment.user;
      const roleName = assignment.role?.name;

      if (!usersMap[user.id]) {
        usersMap[user.id] = { roles: [], userRef: user };
      }

      if (roleName && !usersMap[user.id].roles.includes(roleName)) {
        usersMap[user.id].roles.push(roleName);
      }
    });

    // ➡️ <--- Récupérer les détails complets de chaque utilisateur --->
    const userDetailsPromises = Object.values(usersMap).map(
      async ({ userRef, roles }) => {
        const userRes = await axios.get(
          `${process.env.KEYSTONE_ENDPOINT}/users/${userRef.id}`,
          {
            headers: { "X-Auth-Token": scopedToken },
          },
        );

        const u = userRes.data.user;

        return {
          id: u.id,
          name: u.name,
          domainId: u.domain_id,
          email: u.email || null,
          enabled: u.enabled,
          createdAt: u.created_at,
          lastModifiedAt: u.last_modified_at,
          roles,
        };
      },
    );

    // 4️⃣ Retourner tous les utilisateurs sous forme de tableau
    return Promise.all(userDetailsPromises);
  },
};

// ➡️ <--- Obtenir token scoped system --->
export const getScopedTokenSystem = async (username, password) => {
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
        system: { all: true },
      },
    },
  };

  const response = await axios.post(
    `${process.env.KEYSTONE_ENDPOINT}/auth/tokens`,
    authBody,
  );

  if (response.status !== 201) {
    throw new format("Erreur d'authentification Keystone", 401);
  }

  const token = response.headers["x-subject-token"];

  return token;
};

// ➡️ Token scopé projet admin — pour opérations cross-projet Keystone
export const getadminScopedToken = async () => {
  const authBody = {
    auth: {
      identity: {
        methods: ["password"],
        password: {
          user: {
            name: process.env.OS_ADMIN_USERNAME,
            domain: { name: "Default" },
            password: process.env.OS_ADMIN_PASSWORD,
          },
        },
      },
      scope: {
        project: {
          name: "admin",
          domain: { name: "Default" },
        },
      },
    },
  };

  const response = await axios.post(
    `${process.env.KEYSTONE_ENDPOINT}/auth/tokens`,
    authBody,
  );

  if (response.status !== 201) {
    throw new Error("Erreur d'authentification Keystone admin");
  }

  return response.headers["x-subject-token"];
};
