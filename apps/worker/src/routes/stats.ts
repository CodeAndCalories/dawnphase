import { Hono } from "hono";
import type { Env } from "../types";
import { dbFirst } from "../lib/db";

interface StatsRow {
  total_users: number;
  total_logs: number;
  total_cycles: number;
}

function floorToTen(n: number): string {
  return `${Math.floor(n / 10) * 10}+`;
}

const stats = new Hono<{ Bindings: Env }>();

stats.get("/", async (c) => {
  const row = await dbFirst<StatsRow>(
    c.env.DB,
    `SELECT
       (SELECT COUNT(*) FROM users
        WHERE subscription_status IN ('trialing', 'active')) AS total_users,
       (SELECT COUNT(*) FROM daily_logs)                       AS total_logs,
       (SELECT COUNT(*) FROM cycles)                           AS total_cycles`,
    []
  );

  c.header("Cache-Control", "public, max-age=300, stale-while-revalidate=60");

  return c.json({
    users:  floorToTen(row?.total_users  ?? 0),
    logs:   floorToTen(row?.total_logs   ?? 0),
    cycles: floorToTen(row?.total_cycles ?? 0),
  });
});

export default stats;
