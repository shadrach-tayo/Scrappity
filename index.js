import {
  getHTML,
  getTwitterFollowers,
  getInstagramFollowers
} from './lib/scrapper.js';

async function go() {
  const tPromise = getHTML('https://twitter.com/oloyedeshadrach');
  const iPromise = getHTML('https://instagram.com/shadrachtemitayo');

  const [instagramHtml, twitterHtml] = await Promise.all([iPromise, tPromise]);

  const twCount = await getTwitterFollowers(twitterHtml);
  const instagramCount = await getInstagramFollowers(instagramHtml);

  console.log(`You have ${instagramCount} instagram followers and ${twCount} twitter followers`)
  
}

go();
