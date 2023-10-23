import puppeteerExtra from 'puppeteer-extra';
import stealthPlugin from 'puppeteer-extra-plugin-stealth';
import chromium from '@sparticuz/chromium';
import { chromePath } from '../settings/index.js';

puppeteerExtra.use(stealthPlugin());

// DEVELOPMENT PC
// ======================
// const browser = await puppeteerExtra.launch({
//   headless: 'new',
//   executablePath: chromePath,
// });

// PRODUCTION
// ======================
const browser = await puppeteerExtra.launch({
  args: chromium.args,
  defaultViewport: chromium.defaultViewport,
  executablePath: await chromium.executablePath(),
  headless: chromium.headless,
  ignoreHTTPSErrors: true,
});

export default browser;
