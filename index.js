import express from 'express';
import cors from 'cors';
import './lib/cron';
import { getInstagramCount, getTwitterCount } from './lib/scrapper';
import db from './lib/db';
import { uniqueCount } from './lib/utils';

const app = express();
app.use(express.json());
app.use(cors());

app.get('/scrape', async (req, res, next) => {
  console.log('Scraping');
  const [iCount, tCount] = await Promise.all([
    getInstagramCount(),
    getTwitterCount()
  ]);

  res.json({ iCount, tCount });
});

app.get('/data', async (req, res, next) => {
  // get the scrape data
  const { twitter, instagram } = db.value();
  const uniqueTwitter = uniqueCount(twitter);
  const uniqueInstagram = uniqueCount(instagram);
  // respond with json
  res.json({ twitter: [...uniqueTwitter], instagram: [...uniqueInstagram] });
});

app.listen(2900, () =>
  console.log('App is listening on http://localhost:2900')
);
