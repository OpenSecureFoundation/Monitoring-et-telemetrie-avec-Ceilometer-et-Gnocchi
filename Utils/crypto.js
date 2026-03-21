// utils/crypto.utils.js
import crypto from "node:crypto";

export const encrypt = (text) => {
  const iv = crypto.randomBytes(Number.parseInt(process.env.IV_LENGTH, 10));
  const cipher = crypto.createCipheriv(
    process.env.ALGORITHM,
    Buffer.from(process.env.ENCRYPTION_KEY, "hex"),
    iv
  );

  let encrypted = cipher.update(text, "utf8", "hex");
  encrypted += cipher.final("hex");

  // Retourner IV + encrypted (séparés par :)
  return iv.toString("hex") + ":" + encrypted;
};

export const decrypt = (text) => {
  const parts = text.split(":");
  const iv = Buffer.from(parts.shift(), "hex");
  const encryptedText = parts.join(":");

  const decipher = crypto.createDecipheriv(
    process.env.ALGORITHM,
    Buffer.from(process.env.ENCRYPTION_KEY, "hex"),
    iv
  );

  let decrypted = decipher.update(encryptedText, "hex", "utf8");
  decrypted += decipher.final("utf8");

  return decrypted;
};
