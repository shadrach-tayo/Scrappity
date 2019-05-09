import cron from 'node-cron';
import { runCron } from './scrapper';

cron.schedule('* * * * *', () => {
  console.log('RUNNING CRON');
  runCron();
});
