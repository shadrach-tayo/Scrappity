import cron from 'node-cron';
import { runCron } from './scrapper';

cron.schedule('*/30 * * * *', () => {
  console.log('RUNNING CRON');
  runCron();
});
