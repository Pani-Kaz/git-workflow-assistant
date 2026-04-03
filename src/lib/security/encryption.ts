import crypto from "node:crypto";

const ALGORITHM = "aes-256-gcm";

function getEncryptionKey() {
  const secret = process.env.USER_API_KEY_ENCRYPTION_SECRET;

  if (!secret) {
    throw new Error("Missing USER_API_KEY_ENCRYPTION_SECRET");
  }

  return crypto.createHash("sha256").update(secret).digest();
}

export function encryptSensitiveValue(value: string) {
  const key = getEncryptionKey();
  const iv = crypto.randomBytes(12);
  const cipher = crypto.createCipheriv(ALGORITHM, key, iv);

  const encrypted = Buffer.concat([
    cipher.update(value, "utf8"),
    cipher.final(),
  ]);

  const authTag = cipher.getAuthTag();

  return Buffer.from(
    JSON.stringify({
      iv: iv.toString("base64"),
      content: encrypted.toString("base64"),
      tag: authTag.toString("base64"),
    }),
  ).toString("base64");
}

export function decryptSensitiveValue(payload: string) {
  const key = getEncryptionKey();

  const parsed = JSON.parse(Buffer.from(payload, "base64").toString("utf8")) as {
    iv: string;
    content: string;
    tag: string;
  };

  const decipher = crypto.createDecipheriv(
    ALGORITHM,
    key,
    Buffer.from(parsed.iv, "base64"),
  );

  decipher.setAuthTag(Buffer.from(parsed.tag, "base64"));

  const decrypted = Buffer.concat([
    decipher.update(Buffer.from(parsed.content, "base64")),
    decipher.final(),
  ]);

  return decrypted.toString("utf8");
}