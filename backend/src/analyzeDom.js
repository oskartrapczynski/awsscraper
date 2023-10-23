import jsdom from 'jsdom';
import { checkIsContain } from './index.js';

const { JSDOM } = jsdom;

const analyzeDom = (
  scrapedPage,
  titleSelector,
  splitedPhrase,
  imgSelector,
  linkSelector
) => {
  return scrapedPage.reduce((accumulator, current) => {
    const dom = new JSDOM(current);

    const scrapedTitle = dom.window.document.querySelector(titleSelector);
    const title = scrapedTitle ? scrapedTitle.textContent : null;
    if (!title) return accumulator;

    if (splitedPhrase && !checkIsContain(title, splitedPhrase))
      return accumulator;

    const scrapedImage = dom.window.document.querySelector(imgSelector);
    const image = scrapedImage ? scrapedImage.src : null;
    if (!image) return accumulator;

    const scrapedLink = dom.window.document.querySelector(linkSelector);
    const link = scrapedLink ? scrapedLink.href : null;
    if (!link || !link.includes('http')) return accumulator;

    // remove duplicates
    const isUniqueData =
      accumulator.filter((item) => item.title === title).length === 0
        ? true
        : false;

    if (!isUniqueData) return accumulator;

    accumulator.push({ title, image, link });

    return accumulator;
  }, []);
};

export default analyzeDom;
