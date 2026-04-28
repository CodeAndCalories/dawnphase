-- Dawn Phase — D1 schema
-- Run locally:     wrangler d1 migrations apply dawnphase-db --local
-- Run production:  wrangler d1 migrations apply dawnphase-db

-- ─── users ────────────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS users (
  id                  TEXT    PRIMARY KEY,
  email               TEXT    NOT NULL UNIQUE,
  password_hash       TEXT    NOT NULL,
  mode                TEXT    NOT NULL DEFAULT 'cycle'
                              CHECK (mode IN ('cycle', 'perimenopause')),
  created_at          TEXT    NOT NULL DEFAULT (datetime('now')),
  stripe_customer_id  TEXT,
  subscription_status TEXT    NOT NULL DEFAULT 'trialing'
                              CHECK (subscription_status IN (
                                'trialing', 'active', 'past_due',
                                'canceled', 'incomplete'
                              )),
  trial_ends_at       TEXT                              -- ISO-8601 datetime
);

CREATE INDEX IF NOT EXISTS idx_users_email ON users (email);

-- ─── cycles ───────────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS cycles (
  id           TEXT    PRIMARY KEY,
  user_id      TEXT    NOT NULL REFERENCES users (id) ON DELETE CASCADE,
  start_date   TEXT    NOT NULL,   -- YYYY-MM-DD
  end_date     TEXT,               -- YYYY-MM-DD; NULL while cycle is open
  cycle_length INTEGER             -- computed when end_date is set
);

CREATE INDEX IF NOT EXISTS idx_cycles_user ON cycles (user_id, start_date DESC);

-- ─── daily_logs ───────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS daily_logs (
  id               TEXT     PRIMARY KEY,
  user_id          TEXT     NOT NULL REFERENCES users (id) ON DELETE CASCADE,
  date             TEXT     NOT NULL,   -- YYYY-MM-DD
  flow_intensity   TEXT     CHECK (flow_intensity IN (
                              'none', 'spotting', 'light', 'medium', 'heavy'
                            )),
  mood             TEXT,                -- JSON array  e.g. ["happy","calm"]
  energy           INTEGER  CHECK (energy BETWEEN 1 AND 5),
  cramps           INTEGER  CHECK (cramps BETWEEN 0 AND 3),    -- 0 none → 3 severe
  bloating         INTEGER  CHECK (bloating BETWEEN 0 AND 3),
  headache         INTEGER  CHECK (headache BETWEEN 0 AND 3),
  sleep_hours      REAL,
  notes            TEXT,
  -- perimenopause-specific columns
  hot_flashes      INTEGER  CHECK (hot_flashes BETWEEN 0 AND 3),
  night_sweats     INTEGER  CHECK (night_sweats BETWEEN 0 AND 3),
  brain_fog        INTEGER  CHECK (brain_fog BETWEEN 0 AND 3),
  custom_symptoms  TEXT,               -- JSON array of freeform strings
  UNIQUE (user_id, date)
);

CREATE INDEX IF NOT EXISTS idx_daily_logs_user_date
  ON daily_logs (user_id, date DESC);

-- ─── reminders ────────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS reminders (
  id                  TEXT     PRIMARY KEY,
  user_id             TEXT     NOT NULL REFERENCES users (id) ON DELETE CASCADE,
  reminder_days_before INTEGER NOT NULL DEFAULT 2,
  active              INTEGER  NOT NULL DEFAULT 1  -- 0 = off, 1 = on
);

CREATE UNIQUE INDEX IF NOT EXISTS idx_reminders_user ON reminders (user_id);

-- ─── email_leads ──────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS email_leads (
  id         TEXT    PRIMARY KEY,
  email      TEXT    UNIQUE NOT NULL,
  source     TEXT    NOT NULL,
  created_at TEXT    DEFAULT (datetime('now')),
  emailed_at TEXT,
  converted  INTEGER DEFAULT 0
);

CREATE INDEX IF NOT EXISTS idx_email_leads_email ON email_leads (email);
