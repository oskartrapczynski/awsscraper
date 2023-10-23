const scrapSettings = [
  {
    url: 'https://www.interia.pl',
    articleSelector: 'div[class*=tile]',
    titleSelector: 'span[class*=title-text]',
    imgSelector: 'img[class*=tile-img]',
    linkSelector: 'a[class*=tile-a]',
  },
  {
    url: 'https://www.wp.pl/',
    articleSelector: 'div[class*=sc-njuxue-2]',
    titleSelector: 'div[class*=sc-1qdlbrk-0]',
    imgSelector: 'img[class*=w-full]',
    linkSelector: 'a[class*=sc-1xdae4w-0]',
  },
];

export default scrapSettings;
