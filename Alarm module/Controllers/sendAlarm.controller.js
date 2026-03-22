import { AodhService } from "../Services/aodh.service.js";
import {
  KeystoneService,
  getadminScopedToken,
} from "../../Keystone module/Services/Keystone.service.js";
import { sendAlarmEmail } from "../../Billing/Mail/sendInvoiceEmail.js";
import { Alarm } from "../models/alarm.model.js";
import { emitAlarm } from "../../Notification/Socket/service/socket.service.js";

export const sendAlarm = async (req, res, next) => {
  try {
    const { alarm_id, current, reason } = req.body;

    const token = await getadminScopedToken();

    const alarm = await AodhService.getAlarm(token, alarm_id);

    const user = await KeystoneService.getUser(alarm.user_id, token);

    const {
      name,
      severity,
      project_id,
      resource_id,
      gnocchi_resources_threshold_rule: { metric, threshold },
    } = alarm;

    // 🔴 Enregistrer en base
    // await Alarm.create({
    //   alarmId: alarm_id,
    //   alarmName: name,
    //   userId: alarm.user_id,
    //   userEmail: user.email,
    //   projectId: project_id,
    //   resourceId: resource_id,
    //   metric: metric,
    //   threshold: threshold,
    //   severity: severity,
    //   state: current,
    //   reason: reason,
    // });

    // 📧 Envoyer email
    await sendAlarmEmail(user.email, alarm, current, reason);

    // Notification Dashboard
    // emitAlarm({
    //   alarm_id,
    //   name,
    //   state: current,
    //   reason,
    // });

    res.status(200).json({
      success: true,
      message: "Alarme envoyée et enregistrée",
    });
  } catch (error) {
    next(error);
  }
};
