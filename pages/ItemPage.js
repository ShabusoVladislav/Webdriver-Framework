const webdriver = require('selenium-webdriver');
const { By, until } = webdriver;
const AbstractPage = require('./AbstractPage');
const BagPage = require('./BagPage');
const WishlistPage = require('./WishlistPage');
const mlog = require('mocha-logger');

class ItemPage extends AbstractPage {
  static itemPriceOnItemPageCssSelector = 'span.main-product__price';
  static itemTitleOnHatPageCssSelector = 'h1.main-product__title';
  static divWithItemAddedToBagTextCssSelector = 'div.cart-upsell__notification p';
  static addToBagButtonCssSelector = 'button.product-form__add-to-cart';
  static viewBagButtonXpathSelector = '//div[@class=\'cart-upsell__header\']//child::a[@class=\'button cart-upsell__button\']';
  static addedToBagPopupCssSelector = 'div.cart-upsell-overlay';
  static addToWishlistButtonCssSelector = 'button.wishlist-plus';
  static openWishlistButtonXpathSelector = '//a[@aria-label=\'Open wishlist icon button\']';
  static itemSavedMessageCssSelector = 'span.wishlist-plus__saved-text';

  constructor(driver, item) {
    super(driver);
    this.item = item;
  }

  async openPage() {
    mlog.log(`Open item page (url: ${this.item.getUrl()})`);
    return super.openPage(this.item.getUrl());
  }

  async getPrice() {
    const price = await this.findElementByCss(ItemPage.itemPriceOnItemPageCssSelector);

    return price.getText();
  }

  async getTitle() {
    const itemTitle = await this.findElementByCss(ItemPage.itemTitleOnHatPageCssSelector);

    return itemTitle.getText();
  }

  async getTextFromAddedToBagPopup() {
    await this._waitForAddedToBagPopupIsVisible();
    const textFromPopup = await this.findElementByCss(ItemPage.divWithItemAddedToBagTextCssSelector);

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
    const addToBagButton = await this.findElementByCss(ItemPage.addToBagButtonCssSelector);
    this.clickOnElement(addToBagButton);
    mlog.log('Adding item to bag');

    return this;
  }

  async viewBag() {
    await this._waitForAddedToBagPopupIsVisible();
    const viewBagButton = this.findElementByXpath(ItemPage.viewBagButtonXpathSelector);
    this.clickOnElement(viewBagButton);
    mlog.log('Going to Bag page');

    return new BagPage(this.driver);
  }

  async addToWishlist() {
    const addToWishlistButton = this.findElementByCss(ItemPage.addToWishlistButtonCssSelector);
    this.clickOnElement(addToWishlistButton);
    mlog.log('Adding to Wishlist');
    await this._waitUntilItemIsSaved();

    return this;
  }

  async openWishlistPage() {
    const openWishlistButton = this.findElementByXpath(ItemPage.openWishlistButtonXpathSelector);
    this.clickOnElement(openWishlistButton);
    mlog.log('Opening Wishlist page');

    return new WishlistPage(this.driver, this.item);
  }

  async _waitForAddedToBagPopupIsVisible() {
    const addedToBagPopup = await this.driver.findElement(By.css(ItemPage.addedToBagPopupCssSelector));
    await this.driver.wait(until.elementIsVisible(addedToBagPopup), 5000);
  }

  async _waitUntilItemIsSaved() {
    await this.driver.wait(until.elementLocated(By.css(ItemPage.itemSavedMessageCssSelector)), 5000);
  }
}

module.exports = ItemPage;