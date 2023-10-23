# SERVERLESS

## AWS Lambda Scraper

### ⚙ Tech stack:

- JavaScript
- JSDOM
- Puppeter

### ⌨ Workflow:

1. Development:
   - in `browser.js` uncomment whole code below `DEVELOPMENT` and comment `PRODUCTION`
   - uncomment `handler` function below `DEVELOPMENT`
   - set correct path of chrome executable file of your system in `chromePath`
   - use `node .\index.js` in command line for run app localy
2. Production
   - in `browser.js` uncomment whole code below `PRODUCTION` and comment `DEVELOPMENT`
   - comment `handler` function below `DEVELOPMENT`
   - zip whole project and upload to AWS

### 📝Documentation

1. Whole logic is included in `index.js` in `amplify\backend\function\awsscraper\src`
2. `handler` is AWS Lambda function. It recevies response which contains searching phrase
3. `scrape` is function which contains logic of scraping element selected page
4. `scrapSettings` is array which contains objects. That object is build by:
   - `url`
   - `articleSelector`
   - `titleSelector`
   - `imgSelector`
   - `linkSelector`
5. Successful scraping should return empty array or array of objects which contains:
   - `title` - title of article
   - `image` - url link to image of article
   - `link` -url link to artcle website

# FrontEnd

## React + TypeScript

### ⌨ Workflow:

1. Development:
   - make sure your packages are installed `npm i` in `aws-scraper` folder
   - run `npm start` and use `http://localhost:3000` in the browser

### ⚙ Tech stack:

- JavaScript
- TypeScript
- React
- Axios
- MUI

### 📝Documentation:

1. Folders structure:

- `node-modules`
- `src` ⤵
  - `components`
  - `interfaces`
  - `localStorage`
