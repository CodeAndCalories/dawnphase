export interface Env {
  DB: D1Database;
  JWT_SECRET: string;
  RESEND_API_KEY: string;
  STRIPE_SECRET_KEY: string;
  STRIPE_WEBHOOK_SECRET: string;
  ENVIRONMENT: string;
}

export interface JWTPayload {
  sub: string;   // user id
  email: string;
  plan: "free" | "pro";
  iat: number;
  exp: number;
}

export interface User {
  id: string;
  email: string;
  name: string;
  password_hash: string;
  plan: "free" | "pro";
  stripe_customer_id: string | null;
  cycle_length: number;
  period_length: number;
  created_at: string;
}

export interface CycleLog {
  id: string;
  user_id: string;
  date: string;
  flow: "none" | "spotting" | "light" | "medium" | "heavy" | null;
  mood: string | null;       // JSON array
  symptoms: string | null;   // JSON array
  energy: number | null;     // 1-5
  sleep_hours: number | null;
  notes: string | null;
  created_at: string;
}

export interface Cycle {
  id: string;
  user_id: string;
  start_date: string;
  end_date: string | null;
  cycle_length: number | null;
  period_length: number | null;
  created_at: string;
}
