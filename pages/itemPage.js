const webdriver = require('selenium-webdriver');
const { By, until } = webdriver;
const AbstractPage = require('./abstractPage');
const BagPage = require('./bagPage');
const mlog = require('mocha-logger');

class ItemPage extends AbstractPage {
  constructor(driver, item) {
    super(driver);
    this.item = item;
  }

  async openPage() {
    mlog.log(`Open item page (url: ${this.item.getUrl()})`);
    return super.openPage(this.item.getUrl());
  }

  async getPrice() {
    const itemPriceOnItemPageCssSelector = 'span.main-product__price';
    const price = await this.findElementByCss(itemPriceOnItemPageCssSelector);

    return price.getText();
  }

  async getTitle() {
    const itemTitleOnHatPageCssSelector = 'h1.main-product__title';
    const itemTitle = await this.findElementByCss(itemTitleOnHatPageCssSelector);

    return itemTitle.getText();
  }

  async getTextFromAddedToBagPopup() {
    const divWithItemAddedToBagTextCssSelector = 'div.cart-upsell__notification p';
    await this._waitForAddedToBagPopupIsVisible();
    const textFromPopup = await this.findElementByCss(divWithItemAddedToBagTextCssSelector);

    return textFromPopup.getText();
  }

  async selectSize(size) {
    const itemSizeXpathSelector = `//div[@class="size-selector__content"]/div[text()='${size}']`;
    const itemSize = await this.findElementByXpath(itemSizeXpathSelector);
    this.clickOnElement(itemSize);
    mlog.log(`Selecting ${size} size`);

    return this;
  }

  async addToBag() {
    const addToBagButtonCssSelector = 'button.product-form__add-to-cart';
    const addToBagButton = await this.findElementByCss(addToBagButtonCssSelector);
    this.clickOnElement(addToBagButton);
    mlog.log('Adding item to bag');

    return this;
  }

  async viewBag() {
    const viewBagButtonXpathSelector = '//div[@class=\'cart-upsell__header\']//child::a[@class=\'button cart-upsell__button\']';
    await this._waitForAddedToBagPopupIsVisible();
    const viewBagButton = this.findElementByXpath(viewBagButtonXpathSelector);
    this.clickOnElement(viewBagButton);
    mlog.log('Going to Bag page');

    return new BagPage(this.driver);
  }

  async _waitForAddedToBagPopupIsVisible() {
    const addedToBagPopupCssSelector = 'div.cart-upsell-overlay';
    const addedToBagPopup = await this.driver.findElement(By.css(addedToBagPopupCssSelector));
    await this.driver.wait(until.elementIsVisible(addedToBagPopup), 5000);
  }
}

module.exports = ItemPage;