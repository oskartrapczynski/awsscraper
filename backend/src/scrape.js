import { browser } from '../settings/index.js';
import { analyzeDom } from './index.js';

const scrape = async (
  url,
  articleSelector,
  titleSelector,
  imgSelector,
  linkSelector,
  phrase
) => {
  try {
    const page = await browser.newPage();
    await page.goto(url, { waitUntil: 'domcontentloaded' });

    const scrapedPage = await page.evaluate((articleSelector) => {
      const scrapedArticles = [...document.querySelectorAll(articleSelector)];
      const articles = scrapedArticles.map((element) => element.innerHTML);
      return articles;
    }, articleSelector);

    const splitedPhrase = phrase === '' ? null : phrase.split(' ');

    const pages = await browser.pages();
    await Promise.all(pages.map(async (page) => await page.close()));
    await browser.close();

    const data = analyzeDom(
      scrapedPage,
      titleSelector,
      splitedPhrase,
      imgSelector,
      linkSelector
    );

    return data;
  } catch (error) {
    // console.log('error at scrape', error.message);
  }
};

export default scrape;
