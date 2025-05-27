const { Builder } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');
let Homepage = require('../pageobjects/homePage');
require('chromedriver');

let driver;
const TIMEOUT = 10000;

describe('Search products by keywords', () => {

  beforeAll(async () => {
    driver = await new Builder()
      .forBrowser('chrome')
      .setChromeOptions(new chrome.Options().addArguments('--headless'))
      .build();

    await driver.manage().window().maximize();
    await driver.manage().setTimeouts({ implicit: TIMEOUT });

    Homepage = new Homepage(driver);
    await Homepage.openUrl();
    await Homepage.acceptCookies();
  });

  afterAll(async () => {
    await driver.quit();
  });

  test('Search for "harry potter" returns results', async () => {
    await Homepage.searchFor('harry potter');
    const results = await Homepage.getSearchResults();
    expect(results.length).toBeGreaterThan(1);
  });

  test('All items contain keyword in title or description', async () => {
    const keyword = 'harry';
    const results = await Homepage.getSearchResultsText();
    const allMatch = results.every(text => text.toLowerCase().includes(keyword));
    expect(allMatch).toBe(true);
  });

  test('Sort results by price ascending', async () => {
    await Homepage.sortByPriceAscending();
    const prices = await Homepage.getProductPrices();
    const sorted = [...prices].sort((a, b) => a - b);
    expect(prices).toEqual(sorted);
  });

  test('Filter results by language "English"', async () => {
    await Homepage.filterByLanguage('English');
    const langs = await Homepage.getProductLanguages();
    const allEnglish = langs.every(lang => lang.toLowerCase().includes('english'));
    expect(allEnglish).toBe(true);
  });

  test('Filter results by format "Kõvakaaneline"', async () => {
    await Homepage.filterByFormat('Kõvakaaneline');
    const formats = await Homepage.getProductFormats();
    const allMatch = formats.every(f => f.toLowerCase().includes('kõvakaaneline'));
    expect(allMatch).toBe(true);
  });

});
