import { Hono } from "hono";
import type { Env, Cycle, CycleLog, User } from "../types";
import { dbAll, dbFirst } from "../lib/db";

const exportRoute = new Hono<{ Bindings: Env; Variables: { userId: string } }>();

exportRoute.get("/csv", async (c) => {
  const userId = c.get("userId");

  const [user, logs] = await Promise.all([
    dbFirst<User>(c.env.DB, "SELECT name, email FROM users WHERE id = ?", [userId]),
    dbAll<CycleLog>(
      c.env.DB,
      "SELECT * FROM cycle_logs WHERE user_id = ? ORDER BY date ASC",
      [userId]
    ),
  ]);

  const headers = ["date", "flow", "mood", "symptoms", "energy", "sleep_hours", "notes"];
  const rows = logs.map((l) =>
    [
      l.date,
      l.flow ?? "",
      l.mood ? JSON.parse(l.mood).join(";") : "",
      l.symptoms ? JSON.parse(l.symptoms).join(";") : "",
      l.energy ?? "",
      l.sleep_hours ?? "",
      `"${(l.notes ?? "").replace(/"/g, '""')}"`,
    ].join(",")
  );

  const csv = [headers.join(","), ...rows].join("\n");
  const filename = `dawnphase-export-${user?.email ?? userId}.csv`;

  return new Response(csv, {
    headers: {
      "Content-Type": "text/csv",
      "Content-Disposition": `attachment; filename="${filename}"`,
    },
  });
});

exportRoute.get("/cycles", async (c) => {
  const userId = c.get("userId");
  const cycles = await dbAll<Cycle>(
    c.env.DB,
    "SELECT * FROM cycles WHERE user_id = ? ORDER BY start_date ASC",
    [userId]
  );
  return c.json({ cycles });
});

export default exportRoute;
