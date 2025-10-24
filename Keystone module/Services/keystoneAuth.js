import axios from "axios";
import { setKeystoneAuth } from "./keystoneTokenStore";

// Export de la fonction d'authentification du moteur de facturation
export async function getKeystoneToken() {
  const authUrl = process.env.OS_AUTH_URL + "/auth/tokens";

  const data = {
    auth: {
      identity: {
        methods: ["password"],
        password: {
          user: {
            name: process.env.OS_USERNAME,
            domain: { name: process.env.OS_USER_DOMAIN_NAME },
            password: process.env.OS_PASSWORD,
          },
        },
      },
      scope: {
        project: {
          name: process.env.OS_PROJECT_NAME,
          domain: { name: process.env.OS_PROJECT_DOMAIN_NAME },
        },
      },
    },
  };

  try {
    const res = await axios.post(authUrl, data, {
      headers: { "Content-Type": "application/json" },
    });
    // Le token est dans le header 'x-subject-token'
    const token = res.headers["x-subject-token"];
    // Set le token dans le store
    setKeystoneAuth(token);
    return token;
  } catch (err) {
    console.error(
      "Erreur d'authentification Keystone :",
      err.response?.data || err.message
    );
    throw err;
  }
}
