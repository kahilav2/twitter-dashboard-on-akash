const axios = require('axios');
const db = require('./utils/db.js');
const { sleep } = require('../utils/common');

const LOOP_INTERVAL = 1000 * 60 * 60 * 24;

const watchedTwitterIDs = process.env.TWITTER_IDS.split(' ');

const TWITTER_KEY = process.env.TWITTER_KEY;

const loop = async () => {
  try {
    for (const twitterID of watchedTwitterIDs) {
      console.log(`Updating ${twitterID}`);
      
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

  setTimeout(loop, LOOP_INTERVAL);
}

module.exports = loop