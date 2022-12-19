const webdriver = require('selenium-webdriver');
const { By, until } = webdriver;
const AbstractPage = require('./AbstractPage');
const mlog = require("mocha-logger");

class WishlistPage extends AbstractPage {
  static listOfElementsInWishlistCssSelector = 'div.wishlist-grid__grid > a';
  static wishlistGridCssSelector = 'div.wishlist-grid__grid';
  static removeButtonCssSelector = 'button.product-card__wishlist-remove';
  static titleFromEmptyWishlistCssSelector = 'span.wishlist-grid__grid--empty-text';

  constructor(driver, item) {
    super(driver);
    this.item = item
  }

  async numberOfElements() {
    await this._waitForWishlistLocated();
    const itemsInWishlist = await this.driver.findElements(By.css(WishlistPage.listOfElementsInWishlistCssSelector));

    return itemsInWishlist.length;
  }

  async numberOfCurrentItems() {
    await this._waitForWishlistLocated();
    const addedToWishlistItemsXpathSelector = `//div[contains(@class, 'wishlist-grid__grid')]/a/div/p[contains(text(), '${this.item.getName()}')]`;
    const addedToWishlistItems = await this.driver.wait(until.elementsLocated(By.xpath(addedToWishlistItemsXpathSelector)), 8000);

    return addedToWishlistItems.length;
  }

  async removeItemFromWishlist() {
    const addedToWishlistItemXpathSelector = `//img[@alt='${this.item.getName()}']`;
    const addedToWishlistItem = await this.driver.wait(until.elementLocated(By.xpath(addedToWishlistItemXpathSelector)), 8000);

    const actions = this.driver.actions({ async: true });
    await actions.move({ origin: addedToWishlistItem }).perform();
    const removeButton = this.findElementByCss(WishlistPage.removeButtonCssSelector);
    this.clickOnElement(removeButton);
    mlog.log(`Removing item from wishlist`);

    return this;
  }

  async getTitleFromEmptyWishlist() {
    await this.driver.wait(until.elementLocated(By.css(WishlistPage.titleFromEmptyWishlistCssSelector)), 5000);
    const textFromTitle = await this.findElementByCss(WishlistPage.titleFromEmptyWishlistCssSelector);

    return textFromTitle.getText();
  }

  async _waitForWishlistLocated() {
    await this.driver.wait(until.elementLocated(By.css(WishlistPage.wishlistGridCssSelector)), 10000);
  }
}

module.exports = WishlistPage;