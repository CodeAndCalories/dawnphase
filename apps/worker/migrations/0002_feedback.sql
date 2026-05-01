-- Dawn Phase — feedback table
-- Apply: wrangler d1 execute dawnphase-db --remote --file migrations/0002_feedback.sql

CREATE TABLE IF NOT EXISTS feedback (
  id         TEXT PRIMARY KEY,
  user_id    TEXT,
  type       TEXT NOT NULL,
  value      TEXT NOT NULL,
  notes      TEXT,
  created_at TEXT DEFAULT (datetime('now'))
);

CREATE INDEX IF NOT EXISTS idx_feedback_type       ON feedback (type, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_feedback_user       ON feedback (user_id) WHERE user_id IS NOT NULL;
