import {
  createCipheriv,
  createDecipheriv,
  createHash,
  pbkdf2Sync,
  randomBytes,
} from "node:crypto";

const ALGORITHM = "aes-256-gcm";
const KEY_LENGTH = 32;
const IV_LENGTH = 12;
const SALT_LENGTH = 16;
const PBKDF2_ITERATIONS = 600000;
const DIGEST = "sha512";

function deriveKey(password: string, salt: Buffer): Buffer {
  return pbkdf2Sync(password, salt, PBKDF2_ITERATIONS, KEY_LENGTH, DIGEST);
}

export function encrypt(
  plaintext: string,
  password: string,
): { ciphertext: string; iv: string; salt: string } {
  const salt = randomBytes(SALT_LENGTH);
  const iv = randomBytes(IV_LENGTH);
  const key = deriveKey(password, salt);
  const cipher = createCipheriv(ALGORITHM, key, iv);

  let encrypted = cipher.update(plaintext, "utf8", "hex");
  encrypted += cipher.final("hex");
  const authTag = cipher.getAuthTag().toString("hex");

  return {
    ciphertext: encrypted + authTag,
    iv: iv.toString("hex"),
    salt: salt.toString("hex"),
  };
}

export function decrypt(
  ciphertext: string,
  iv: string,
  salt: string,
  password: string,
): string {
  const key = deriveKey(password, Buffer.from(salt, "hex"));
  const decipher = createDecipheriv(ALGORITHM, key, Buffer.from(iv, "hex"));

  const encData = ciphertext.slice(0, -32);
  const authTag = Buffer.from(ciphertext.slice(-32), "hex");
  decipher.setAuthTag(authTag);

  let decrypted = decipher.update(encData, "hex", "utf8");
  decrypted += decipher.final("utf8");
  return decrypted;
}

export function hashPassword(password: string): string {
  return createHash("sha256").update(password).digest("hex");
}
