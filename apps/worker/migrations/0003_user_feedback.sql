-- Dawn Phase — user feedback table (dashboard feedback widget)
-- Apply: wrangler d1 execute dawnphase-db --remote --file migrations/0003_user_feedback.sql

CREATE TABLE IF NOT EXISTS user_feedback (
  id         TEXT PRIMARY KEY,
  user_id    TEXT NOT NULL,
  user_email TEXT,
  message    TEXT NOT NULL,
  created_at TEXT NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_user_feedback_user ON user_feedback (user_id, created_at DESC);
