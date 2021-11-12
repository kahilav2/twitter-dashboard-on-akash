const db = require('better-sqlite3')('./api/database.db', {});

db.prepare(`
CREATE TABLE IF NOT EXISTS data_points (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
	twitter_id TEXT,
  followers_count INTEGER NOT NULL,
	date TEXT NOT NULL
);
`);

module.exports = db;