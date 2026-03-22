// controllers/alarm.controller.js

import { getInstanceAlarms } from "../Services/aodh.service.js";

import { getScopedToken } from "../../Keystone module/Services/Keystone.service.js";

export const getInstanceAlarmsController = async (req, res) => {
  try {
    const { projectId, instanceId } = req.params;
    const { username, password } = req.user;
    const token = await getScopedToken(username, password, projectId);
    console.log("token", token);

    const alarms = await getInstanceAlarms(instanceId, token);
    res.status(200).json({
      success: true,
      message: "Get alarms successfully for instance",
      data: alarms,
    });
  } catch (err) {
    res.status(500).json({
      message: "Error retrieving alarms",
      error: err.message,
    });
  }
};
