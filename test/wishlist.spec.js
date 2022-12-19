const chai = require("chai");
const assert = chai.assert;
const argv = require('minimist')(process.argv.slice(2));

describe("Wishlist test.", () => {
  const DriverSingleton = require('../driver/DriverSingleton');
  const ItemPage = require('../pages/ItemPage');
  const Item = require('../models/Item');

  const parsed = require("dotenv").config({path: `./resources/${argv.env}.wishlist.properties`}).parsed;

  beforeEach(async function() {
    this.driver = await DriverSingleton.getDriver();
  });

  it('Should add item to Wishlist.', async function () {
    //Home page
    const item = new Item(parsed.itemUrl, null, parsed.itemName);

    const itemPage = new ItemPage(this.driver, item);
    await itemPage.openPage();
    await itemPage.closeCookiesPopup();

    await itemPage.addToWishlist();

    const wishlistPage = await itemPage.openWishlistPage();

    const numberOfElementsInWishlist = await wishlistPage.numberOfElements();
    const numberOfCurrentItemsInWishlist = await wishlistPage.numberOfCurrentItems();

    assert.isAbove(numberOfElementsInWishlist, 0);
    assert.isAbove(numberOfCurrentItemsInWishlist, 0);
  }).timeout(60000);

  afterEach(async function () {
    if(this.currentTest.state !== "passed") {
      const image = await this.driver.takeScreenshot();
      await require('fs').writeFile(
        './screenshots/WishlistFail.png',
        image,
        'base64',
        (err) => {});
    }
    await DriverSingleton.closeDriver();
  });
});
