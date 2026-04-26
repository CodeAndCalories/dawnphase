import { Hono } from "hono";
import type { Env, Cycle, DailyLog, User } from "../types";
import { dbAll, dbFirst } from "../lib/db";

const exportRoute = new Hono<{ Bindings: Env; Variables: { userId: string } }>();

exportRoute.get("/csv", async (c) => {
  const userId = c.get("userId");

  const [user, logs] = await Promise.all([
    dbFirst<Pick<User, "email">>(
      c.env.DB,
      "SELECT email FROM users WHERE id = ?",
      [userId]
    ),
    dbAll<DailyLog>(
      c.env.DB,
      "SELECT * FROM daily_logs WHERE user_id = ? ORDER BY date ASC",
      [userId]
    ),
  ]);

  const headers = [
    "date", "flow_intensity", "mood", "energy",
    "cramps", "bloating", "headache", "sleep_hours",
    "hot_flashes", "night_sweats", "brain_fog", "custom_symptoms", "notes",
  ];

  const rows = logs.map((l) =>
    [
      l.date,
      l.flow_intensity ?? "",
      l.mood ? JSON.parse(l.mood).join(";") : "",
      l.energy ?? "",
      l.cramps ?? "",
      l.bloating ?? "",
      l.headache ?? "",
      l.sleep_hours ?? "",
      l.hot_flashes ?? "",
      l.night_sweats ?? "",
      l.brain_fog ?? "",
      l.custom_symptoms ? JSON.parse(l.custom_symptoms).join(";") : "",
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
