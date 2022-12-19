const webdriver = require('selenium-webdriver');
const { By, until } = webdriver;
const AbstractPage = require('./AbstractPage');

class WishlistPage extends AbstractPage {
  static listOfElementsInWishlistCssSelector = 'div.wishlist-grid__grid > a';
  static wishlistGridCssSelector = 'div.wishlist-grid__grid';

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

  async _waitForWishlistLocated() {
    await this.driver.wait(until.elementLocated(By.css(WishlistPage.wishlistGridCssSelector)), 10000);
  }
}

module.exports = WishlistPage;