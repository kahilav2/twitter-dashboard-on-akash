const express = require('express');
const app = express();

// Prepare a new database if DATABASE_URL was not defined
const db = require('./utils/db.js');
db.exec(`
CREATE TABLE IF NOT EXISTS data_points (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
	twitter_id TEXT,
  followers_count INTEGER NOT NULL,
	date TEXT NOT NULL
);
`);

app.use('/', require('./routes/'));
    
app.use((req, res, next) => {
  res.status(200);
  res.header('Content-Type', 'application/json; charset=utf8mb4');
  const responseData = res.responseData || {};
  res.send(responseData);
});

app.use((err, req, res, next) => {
  console.error(`ERROR (${err.name}) ${req.originalUrl}, ${err.message} ${err.stack}`);
  res.sendStatus(err.httpStatus || 500);
});

if (process.env.NODE_ENV === 'production') {
  const loop = require('./loop.js');

  loop();
}

module.exports = {
  path: '/api',
  handler: app
}