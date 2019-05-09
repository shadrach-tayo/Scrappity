import express from 'express';
import './lib/cron';

const app = express();
app.use(express.json());

app.get('/scrape', async (req, res, next) => {
  console.log('Scraping');
  const [iCount, tCount] = await Promise.all([
    getInstagramCount(),
    getTwitterCount()
  ]);

  res.json({ iCount, tCount });
});

app.listen(2900, () =>
  console.log('App is listening on http://localhost:2900')
);
