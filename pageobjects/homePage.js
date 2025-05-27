// has everything related to home page
const Page = require('./basePage');
const Cartpage = require('./cartPage');
const { By } = require('selenium-webdriver');

// Locators
const homePageUrl = 'https://www.kriso.ee/';
const acceptCookiesBtn = By.className('cc-nb-okagree');
const logoItem = By.className('icon-kriso-logo');
const offerBookLink = By.className('book-img-link');
const addToCartBtn = By.id('btn_addtocart');
const cartMessage = By.css('.item-messagebox');
const cartBackBtn = By.className('cartbtn-event.back');
const cartForwardBtn = By.className('cartbtn-event.forward');

const searchInput = By.name('query');
const productItems = By.css('.product-list-item');
const productTitles = By.css('.product-title');
const sortSelect = By.id('sortSelect'); // уточни ID, если отличается
const languageFilterCheckbox = (lang) => By.xpath(`//label[contains(text(),"${lang}")]//input`);
const formatFilterCheckbox = (format) => By.xpath(`//label[contains(text(),"${format}")]//input`);
const productPrices = By.css('.product-price'); // уточни класс цены
const productLanguages = By.css('.product-language'); // уточни
const productFormats = By.css('.product-format'); // уточни

module.exports = class Homepage extends Page {
    async openUrl() {
        await super.openUrl(homePageUrl);
    }

    async acceptCookies() {
        await super.findAndClick(acceptCookiesBtn);
    }

    async verifyLogo() {
        const logo = await super.getElement(logoItem);
        expect(logo).toBeDefined();
    }

    async openBookPage(number) {
        const bookLinks = await super.getElements(offerBookLink);
        await super.click(bookLinks[number - 1]);
    }

    async addItemToShoppingCart() {
        await super.findAndClick(addToCartBtn);
    }

    async verifyItemAddedToCart() {
        await super.waitUntilElementText(cartMessage, 'Toode lisati ostukorvi');
    }

    async continueShopping() {
        await super.findAndClick(cartBackBtn);
        await super.findAndClick(logoItem);
    }

    async openShoppingCart() {
        await super.findAndClick(cartForwardBtn);
        return new Cartpage(super.getDriver());
    }

    // --------- ДОБАВЛЕНО ДЛЯ ПОИСКА ---------
    async searchFor(keyword) {
        const input = await super.getElement(searchInput);
        await input.clear();
        await input.sendKeys(keyword + '\n');
    }

    async getSearchResults() {
        return await super.getElements(productItems);
    }

    async getSearchResultsText() {
        const items = await super.getElements(productTitles);
        const texts = [];
        for (const item of items) {
            texts.push((await item.getText()).toLowerCase());
        }
        return texts;
    }

    async sortByPriceAscending() {
        const select = await super.getElement(sortSelect);
        await select.sendKeys('Hind: odavam ees'); // адаптируй, если текст отличается
    }

    async getProductPrices() {
        const priceElements = await super.getElements(productPrices);
        const prices = [];
        for (const el of priceElements) {
            const text = await el.getText();
            const num = parseFloat(text.replace(/[^\d,]/g, '').replace(',', '.'));
            if (!isNaN(num)) prices.push(num);
        }
        return prices;
    }

    async filterByLanguage(lang) {
        const checkbox = await super.getElement(languageFilterCheckbox(lang));
        await super.click(checkbox);
    }

    async getProductLanguages() {
        const langElements = await super.getElements(productLanguages);
        const langs = [];
        for (const el of langElements) {
            langs.push((await el.getText()).toLowerCase());
        }
        return langs;
    }

    async filterByFormat(format) {
        const checkbox = await super.getElement(formatFilterCheckbox(format));
        await super.click(checkbox);
    }

    async getProductFormats() {
        const formatElements = await super.getElements(productFormats);
        const formats = [];
        for (const el of formatElements) {
            formats.push((await el.getText()).toLowerCase());
        }
        return formats;
    }
};
