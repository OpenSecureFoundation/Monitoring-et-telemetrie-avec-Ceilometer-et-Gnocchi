// Validate secret Webhook
export const validateWebhookSecret = (req, res, next) => {
  // Accepter le secret depuis le header OU le query parameter
  const secret = req.headers["x-webhook-secret"] || req.query.secret;
  console.log("secret: ", secret);

  if (secret !== process.env.WEBHOOK_SECRET) {
    return res.status(401).json({ error: "Unauthorized" });
  }
  next();
};
