export interface Env {
  DB: D1Database;
  JWT_SECRET: string;
  RESEND_API_KEY: string;
  STRIPE_SECRET_KEY: string;
  STRIPE_WEBHOOK_SECRET: string;
  ADMIN_KEY: string;
  ENVIRONMENT: string;
  APP_URL: string;   // frontend origin, e.g. https://www.dawnphase.com
}

export interface JWTPayload {
  sub: string;   // user id
  email: string;
  status: "trialing" | "active" | "past_due" | "canceled" | "incomplete";
  iat: number;
  exp: number;
}

// Maps to the `users` table in D1
export interface User {
  id: string;
  email: string;
  password_hash: string;
  mode: "cycle" | "perimenopause";
  birth_date: string | null;
  created_at: string;
  stripe_customer_id: string | null;
  subscription_status: "trialing" | "active" | "past_due" | "canceled" | "incomplete";
  trial_ends_at: string | null;
}

// Maps to the `daily_logs` table in D1
export interface DailyLog {
  id: string;
  user_id: string;
  date: string;                  // YYYY-MM-DD
  flow_intensity: "none" | "spotting" | "light" | "medium" | "heavy" | null;
  mood: string | null;           // JSON array of strings
  energy: number | null;         // 1–5
  cramps: number | null;         // 0–3
  bloating: number | null;       // 0–3
  headache: number | null;       // 0–3
  sleep_hours: number | null;
  notes: string | null;
  // perimenopause columns
  hot_flashes: number | null;    // 0–3
  night_sweats: number | null;   // 0–3
  brain_fog: number | null;      // 0–3
  custom_symptoms: string | null; // JSON array of strings
}

// Maps to the `cycles` table in D1
export interface Cycle {
  id: string;
  user_id: string;
  start_date: string;            // YYYY-MM-DD
  end_date: string | null;       // YYYY-MM-DD; null while open
  cycle_length: number | null;   // computed when end_date is set
}
