import axios from 'axios';
import cheerio from 'cheerio';
import db from './db';

export async function getHTML(url) {
  const { data: html } = await axios.get(url);
  return html;
}

export async function getTwitterFollowers(html) {
  const $ = cheerio.load(html);
  const span = $('[data-nav="followers"] .ProfileNav-value');

  return span.data('count');
}

export async function getInstagramFollowers(html) {
  const $ = cheerio.load(html);
  const dataInSttring = $('script[type="application/ld+json"]').html();
  const pageObject = JSON.parse(dataInSttring);

  return parseInt(
    pageObject.mainEntityofPage.interactionStatistic.userInteractionCount
  );
}

export async function getInstagramCount() {
  const html = await getHTML('https://instagram.com/wesbos');
  const instagramCount = await getInstagramFollowers(html);
  return instagramCount;
}

export async function getTwitterCount() {
  const html = await getHTML('https://twitter.com/wesbos');
  const twiiterCount = await getTwitterFollowers(html);
  return twiiterCount;
}

export async function runCron() {
  const [iCount, tCount] = await Promise.all([
    getInstagramCount(),
    getTwitterCount()
  ]);
  console.log(iCount, tCount);
  db.get('twitter')
    .push({ date: Date.now(), count: tCount })
    .write();
  db.get('instagram')
    .push({ date: Date.now(), count: iCount })
    .write();
  console.log('Done!');
}
