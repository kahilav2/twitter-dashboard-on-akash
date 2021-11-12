const _ = require('underscore');

const asyncHandler = require('../utils/async-handler.js');
const db = require('../utils/db.js');

module.exports = asyncHandler(async (req, res, next) => {
  const rows = db.prepare('SELECT * FROM data_points').all();

  res.responseData = 
     _.pairs(
      _.groupBy(rows, 'twitter_id')
    )
    .map((pairs) => (
      { 
        twitterID: pairs[0], 
        latestFollowersCount: Math.max.apply(Math, pairs[1].map((row) => row.followers_count)),
        dataPoints: pairs[1].map((b) => (
          { 
            followersCount: b.followers_count, 
            date: b.date 
          }))
      }
    ))
    .sort((a, b) => b.latestFollowersCount - a.latestFollowersCount );

  next();
});