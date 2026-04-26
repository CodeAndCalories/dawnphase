import type { JWTPayload } from "../types";

const ALGORITHM = { name: "HMAC", hash: "SHA-256" };

function base64url(data: ArrayBuffer): string {
  return btoa(String.fromCharCode(...new Uint8Array(data)))
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=/g, "");
}

function base64urlDecode(str: string): string {
  str = str.replace(/-/g, "+").replace(/_/g, "/");
  while (str.length % 4) str += "=";
  return atob(str);
}

async function importKey(secret: string): Promise<CryptoKey> {
  return crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(secret),
    ALGORITHM,
    false,
    ["sign", "verify"]
  );
}

export async function signJWT(
  payload: Omit<JWTPayload, "iat" | "exp">,
  secret: string,
  expiresInSeconds = 60 * 60 * 24 * 30 // 30 days
): Promise<string> {
  const now = Math.floor(Date.now() / 1000);
  const fullPayload: JWTPayload = { ...payload, iat: now, exp: now + expiresInSeconds };

  const header = base64url(new TextEncoder().encode(JSON.stringify({ alg: "HS256", typ: "JWT" })));
  const body = base64url(new TextEncoder().encode(JSON.stringify(fullPayload)));
  const signingInput = `${header}.${body}`;

  const key = await importKey(secret);
  const sig = await crypto.subtle.sign(ALGORITHM, key, new TextEncoder().encode(signingInput));

  return `${signingInput}.${base64url(sig)}`;
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
  const expectedSig = await crypto.subtle.sign(
    ALGORITHM,
    key,
    new TextEncoder().encode(signingInput)
  );

  const expectedB64 = base64url(expectedSig);
  if (expectedB64 !== signature) return null;

  const payload = JSON.parse(base64urlDecode(body)) as JWTPayload;
  if (payload.exp < Math.floor(Date.now() / 1000)) return null;

  return payload;
}
