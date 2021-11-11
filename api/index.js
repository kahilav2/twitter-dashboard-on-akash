const axios = require('axios');

const express = require('express')
const _ = require('underscore')
const app = express()

const options = {};
const db = require('better-sqlite3')('./api/database.db', options);

app.get('/', (req, res) => {
  const rows = db.prepare("SELECT * FROM data_points").all();

  res.json(
     _.pairs(
      _.groupBy(rows, 'twitter_id')
    )
    .map((a) => (
      { 
        twitterID: a[0], 
        latestFollowerCount: Math.max.apply(Math, a[1].map(function(o) { return o.followers_count; })),
        dataPoints: a[1].map((b) => (
          { 
            followersCount: b.followers_count, 
            date: b.date 
          }))
      }
    ))
    .sort((a, b)=> b.latestFollowerCount - a.latestFollowerCount )
  )
})
app.get('/raw', (req, res) => {
  const rows = db.prepare("SELECT * FROM data_points").all();

  res.json(
    rows
  )
})
const LOOP_INTERVAL_SHORT = 1000 * 60 * 10;
const LOOP_INTERVAL_LONG = 1000 * 60 * 60 * 24;
const LOOP_SWITCH_COUNT = 6;
let loopRunCount = 0;
const watchedScreenNames = process.env.TWITTER_IDS.split(' ');
console.log("watchedScreenNames: ")
console.log(watchedScreenNames)
const TWITTER_KEY = process.env.TWITTER_KEY;

const loop = async () => {
  for (const screenName of watchedScreenNames) {
    console.log("GET:", screenName);
    try {
      const result = await axios.get(`https://api.twitter.com/1.1/users/show.json?screen_name=${screenName}`,
        { 
          headers: {
            'Authorization': `Bearer ${TWITTER_KEY}`,
          } 
        }
      );
      const row = db.prepare("INSERT INTO data_points(twitter_id, followers_count, date) VALUES (?,?,CURRENT_TIMESTAMP)");
      row.run(screenName, result.data.followers_count);
    } catch(error) {
      console.error("ERROR: ", error.message);
    }
    
  }
  console.log("RETRIEVAL FINISHED");

  loopRunCount += 1;
  setTimeout(loop, (loopRunCount < LOOP_SWITCH_COUNT) ? LOOP_INTERVAL_SHORT : LOOP_INTERVAL_LONG);
}
console.log("Starting loop")
loop();
//setTimeout(loop, 0);

module.exports = {
  path: '/api',
  handler: app
}