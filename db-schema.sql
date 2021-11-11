CREATE TABLE IF NOT EXISTS data_points (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
	twitter_id TEXT,
  followers_count INTEGER NOT NULL,
	date TEXT NOT NULL
);

INSERT INTO data_points(twitter_id, followers_count, date) VALUES ('elonmusk',1046530,'2021-11-03 04:39:31');