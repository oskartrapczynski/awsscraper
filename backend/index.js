/**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 */

import { headers, scrapSettings } from './settings/index.js';
import { scrape } from './src/index.js';

export const handler = async (event) => {
  try {
    const body = JSON.parse(event.body);
    const { phrase } = body;

    const decodedPhrase = decodeURIComponent(phrase);

    const dataPromises = scrapSettings.map(
      ({ url, articleSelector, titleSelector, imgSelector, linkSelector }) => {
        return scrape(
          url,
          articleSelector,
          titleSelector,
          imgSelector,
          linkSelector,
          decodedPhrase
        );
      }
    );
    const data = [].concat(...(await Promise.all(dataPromises)));

    // console.log(data);

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify(data),
    };
  } catch (error) {
    // console.log(error.message);
    return {
      statusCode: 400,
      headers,
      body: JSON.stringify({
        error: error.message,
      }),
    };
  }
};

// DEVELOPMENT
// ======================
// handler({
//   body: JSON.stringify({
//     id: 0,
//     phrase: encodeURIComponent(''),
//   }),
// });
