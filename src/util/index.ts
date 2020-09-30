import crypto from "crypto";
import admin from "firebase-admin";

const IV_LENGTH = 16;

let secVar = null;

async function sec() {
  if (!secVar) {
    const db = admin.firestore();
    const result = await db.collection("sec").doc("enc").get();
    secVar = result.data().text;
  }

  return secVar;
}

export async function enc(text: string) {
  const secVal = await sec();
  const hash = crypto.createHash("sha512").update(secVal).digest();
  const key = hash.slice(0, 32);

  const iv = crypto.randomBytes(IV_LENGTH);
  const cipher = crypto.createCipheriv("aes-256-cbc", key, iv);
  const encrypted = cipher.update(text);
  const result = Buffer.concat([encrypted, cipher.final()]);

  return `${iv.toString("hex")}:${result.toString("hex")}`;
}

export async function dec(text: string) {
  const secVal = await sec();
  const hash = crypto.createHash("sha512").update(secVal).digest();
  const key = hash.slice(0, 32);

  const textParts = text.split(":");
  const shifted = textParts.shift() || "";
  const iv = Buffer.from(shifted, "hex");
  const encryptedText = Buffer.from(textParts.join(":"), "hex");
  const decipher = crypto.createDecipheriv("aes-256-cbc", key, iv);
  const decrypted = decipher.update(encryptedText);
  const result = Buffer.concat([decrypted, decipher.final()]);

  return result.toString();
}
