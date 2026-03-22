export const mapAodhAlarmToAlert = (alarm, projectMap) => {
  const severityMap = {
    alarm: "critical",
    ok: "ok",
    insufficient_data: "warning",
  };

  return {
    id: alarm.alarm_id,
    title: alarm.name,
    message: alarm.description || "No description provided",
    severity: severityMap[alarm.state] || "warning",
    projectId: alarm.project_id,
    projectName: projectMap[alarm.project_id] || "Unknown",
    resourceType: alarm.type,
    timestamp: new Date(alarm.state_timestamp),
    acknowledged: alarm.enabled === false,
    details: [
      { label: "Metric", value: alarm.type },
      { label: "State", value: alarm.state },
      { label: "Threshold", value: alarm.threshold },
    ],
  };
};
