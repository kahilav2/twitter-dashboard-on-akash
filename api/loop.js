const axios = require('axios');
const db = require('./utils/db.js');
const { sleep } = require('../utils/common');
const constants = require('../utils/constants');
const { performance } = require('perf_hooks');

const LOOP_INTERVAL = 1000 * 60 * 60 * 24;

const watchedTwitterIDs = constants.general.twitterIDs;

const TWITTER_KEY = process.env.TWITTER_KEY;

const loop = async () => {
  let startTime = performance.now()
  try {
    for (const { twitterID, tags } of watchedTwitterIDs) {
      console.log(`Updating ${twitterID} (${tags})`);
      
      const result = await axios.get(`https://api.twitter.com/1.1/users/show.json?screen_name=${twitterID}`,
        { 
          headers: {
            'Authorization': `Bearer ${TWITTER_KEY}`,
          } 
        }
      );
      
      const row = db.prepare('INSERT INTO data_points(twitter_id, followers_count, date) VALUES (?, ?, CURRENT_TIMESTAMP)');
      row.run(twitterID, result.data.followers_count);
      
      console.log(`${twitterID} updated successfully`);
      await sleep(8000);
    }
  } catch (error) {
    console.error(error);
  }
  let endTime = performance.now()
  let timeElapsed = endTime - startTime;
  console.log("timeElapsed", timeElapsed);
  console.log("next update", LOOP_INTERVAL - timeElapsed)
  setTimeout(loop, LOOP_INTERVAL - timeElapsed );
}

module.exports = loop