const asyncHandler = require('../utils/async-handler.js');
const db = require('../utils/db.js');

let pageloadCount = 0;

module.exports = asyncHandler(async (req, res, next) => {
  pageloadCount++;
  const rows = db.prepare('SELECT * FROM data_points').all();

  res.responseData = {
    data: rows,
    pageTitle: process.env.PAGE_TITLE,
    introductionText: process.env.INTRODUCTION_TEXT,
    adminTwitterID: process.env.ADMIN_TWITTER_ID,
    pageloadCount,
  };
  next();
});