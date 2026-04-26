import type { D1Database } from "@cloudflare/workers-types";

export async function dbFirst<T>(
  db: D1Database,
  query: string,
  params: unknown[] = []
): Promise<T | null> {
  const stmt = db.prepare(query);
  const result = await stmt.bind(...params).first<T>();
  return result ?? null;
}

export async function dbAll<T>(
  db: D1Database,
  query: string,
  params: unknown[] = []
): Promise<T[]> {
  const stmt = db.prepare(query);
  const result = await stmt.bind(...params).all<T>();
  return result.results;
}

export async function dbRun(
  db: D1Database,
  query: string,
  params: unknown[] = []
): Promise<D1Result> {
  const stmt = db.prepare(query);
  return stmt.bind(...params).run();
}

export function newId(): string {
  return crypto.randomUUID();
}
