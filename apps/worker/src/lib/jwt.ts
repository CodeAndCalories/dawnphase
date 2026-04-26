import type { JWTPayload } from "../types";

const ALGORITHM = { name: "HMAC", hash: "SHA-256" };

function encode(data: Uint8Array): string {
  return btoa(String.fromCharCode(...data))
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=/g, "");
}

function base64urlFromBuffer(buf: ArrayBuffer): string {
  return encode(new Uint8Array(buf));
}

function base64urlFromString(str: string): string {
  return encode(new TextEncoder().encode(str));
}

function base64urlDecode(str: string): string {
  str = str.replace(/-/g, "+").replace(/_/g, "/");
  while (str.length % 4) str += "=";
  return atob(str);
}

async function importKey(secret: string): Promise<CryptoKey> {
  const raw = new TextEncoder().encode(secret);
  return crypto.subtle.importKey("raw", raw, ALGORITHM, false, [
    "sign",
    "verify",
  ]);
}

export async function signJWT(
  payload: Omit<JWTPayload, "iat" | "exp">,
  secret: string,
  expiresInSeconds = 60 * 60 * 24 * 30 // 30 days
): Promise<string> {
  const now = Math.floor(Date.now() / 1000);
  const fullPayload: JWTPayload = {
    ...payload,
    iat: now,
    exp: now + expiresInSeconds,
  };

  const header = base64urlFromString(
    JSON.stringify({ alg: "HS256", typ: "JWT" })
  );
  const body = base64urlFromString(JSON.stringify(fullPayload));
  const signingInput = `${header}.${body}`;

  const key = await importKey(secret);
  const sigBuf = await crypto.subtle.sign(
    ALGORITHM,
    key,
    new TextEncoder().encode(signingInput)
  );

  return `${signingInput}.${base64urlFromBuffer(sigBuf)}`;
}

export async function verifyJWT(
  token: string,
  secret: string
): Promise<JWTPayload | null> {
  const parts = token.split(".");
  if (parts.length !== 3) return null;

  const [header, body, signature] = parts;
  const signingInput = `${header}.${body}`;

  const key = await importKey(secret);
  const expectedBuf = await crypto.subtle.sign(
    ALGORITHM,
    key,
    new TextEncoder().encode(signingInput)
  );

  if (base64urlFromBuffer(expectedBuf) !== signature) return null;

  const payload = JSON.parse(base64urlDecode(body)) as JWTPayload;
  if (payload.exp < Math.floor(Date.now() / 1000)) return null;

  return payload;
}
