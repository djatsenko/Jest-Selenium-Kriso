const { Builder, By, until } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');
require('chromedriver');

let driver;
const TIMEOUT = 10000;

describe('Search products by filter menu', () => {

  beforeAll(async () => {
    const chromeOptions = new chrome.Options();
    chromeOptions.addArguments('--headless=new'); // включаем headless-режим
    chromeOptions.addArguments('--no-sandbox');
    chromeOptions.addArguments('--disable-dev-shm-usage');

    driver = await new Builder()
      .forBrowser('chrome')
      .setChromeOptions(chromeOptions)
      .build();

    await driver.manage().setTimeouts({ implicit: TIMEOUT });
    await driver.get('https://www.kriso.ee');
  }, 30000); // увеличим таймаут на инициализацию

  afterAll(async () => {
    if (driver) {
      await driver.quit();
    }
  });

  test('Filter books by category and subcategory', async () => {
    // Прокрутка до раздела "Muusikaraamatud ja noodid"
    const section = await driver.findElement(By.xpath("//*[contains(text(),'Muusikaraamatud ja noodid')]"));
    await driver.executeScript("arguments[0].scrollIntoView(true);", section);

    // Клик по категории "Õppematerjalid"
    const category = await driver.findElement(By.linkText('Õppematerjalid'));
    await category.click();

    // Проверка URL
    await driver.wait(until.urlContains('oppematerjalid'), TIMEOUT);

    // Клик по подкатегории "Bänd ja ansambel"
    const subCategory = await driver.findElement(By.linkText('Bänd ja ansambel'));
    await subCategory.click();

    // Проверка фильтра
    const activeFilter = await driver.findElement(By.css('.filter-selected'));
    const text = await activeFilter.getText();
    expect(text.toLowerCase()).toContain('bänd');

    // Клик по формату "CD"
    const formatCD = await driver.findElement(By.xpath("//label[contains(text(),'CD')]"));
    await formatCD.click();

    // Проверка, что товары остались
    const items = await driver.findElements(By.css('.product-list-item'));
    expect(items.length).toBeGreaterThan(0);
  }, 30000); // увеличим таймаут на выполнение теста

});
