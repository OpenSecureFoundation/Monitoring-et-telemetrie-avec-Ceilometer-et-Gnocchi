import { io } from "../../../main.js";

export const emitAlarm = (alarm) => {
  io.emit("new_alarm", alarm);
};
