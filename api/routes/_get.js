const asyncHandler = require('../utils/async-handler.js');
const db = require('../utils/db.js');

module.exports = asyncHandler(async (req, res, next) => {
  const rows = db.prepare('SELECT * FROM data_points').all();

  res.responseData = {
    data: rows,
    pageTitle: process.env.PAGE_TITLE,
    introductionText: process.env.INTRODUCTION_TEXT,
  };
  next();
});