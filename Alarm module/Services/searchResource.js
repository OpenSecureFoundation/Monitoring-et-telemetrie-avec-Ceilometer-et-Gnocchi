// services/gnocchi.service.js
import axios from "axios";

export const searchResources = async (
  resourceType,
  token,
  queryObject = {},
) => {
  try {
    const response = await axios.post(
      `${process.env.GNOCCHI_ENDPOINT}/search/resource/${resourceType}`,
      queryObject,
      {
        headers: {
          "X-Auth-Token": token,
          "Content-Type": "application/json",
        },
      },
    );

    return response.data;
  } catch (error) {
    // Gestion propre des erreurs Axios
    if (error.response) {
      throw new Error(
        `Gnocchi searchResources error (${resourceType}): ${error.response.status} - ${JSON.stringify(error.response.data)}`,
      );
    }

    throw new Error(`Gnocchi searchResources error: ${error.message}`);
  }
};
