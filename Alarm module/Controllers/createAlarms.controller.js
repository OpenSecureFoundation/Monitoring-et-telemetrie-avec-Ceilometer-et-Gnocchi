// --- Controller createAlarm ---
import { AodhService } from "../Services/aodh.service.js";
import { getScopedToken } from "../../Keystone module/Services/Keystone.service.js";

export const createAlarm = async (req, res, next) => {
  try {
    //
    const { username, password } = req.user;

    const { projectId } = req.params;

    const value = req.body;

    // Récupérer le token scopé projet
    const token = await getScopedToken(username, password, projectId);

    // Appel du service Aodh
    const alarm = await AodhService.createAlarm(token, value);

    // Retour succès au frontend
    return res.status(201).json({
      success: true,
      message: "Alarm create successfully",
      alarm: alarm,
    });
  } catch (err) {
    console.error("Erreur création alarme:", err.response?.data || err.message);
    return res.status(500).json({
      success: false,
      message: "Impossible de créer l’alarme",
    });
  }
};
