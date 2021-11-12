const db = require('better-sqlite3')('./api/database.db', {});

module.exports = db;