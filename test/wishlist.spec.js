const chai = require("chai");
const assert = chai.assert;
const expect = chai.expect;
const argv = require('minimist')(process.argv.slice(2));

const DriverSingleton = require('../driver/DriverSingleton');
const ItemPage = require('../pages/ItemPage');
const WishlistPage = require('../pages/WishlistPage');
const Item = require('../models/Item');

describe("Wishlist test.", () => {
  const parsed = require("dotenv").config({path: `./resources/${argv.env}.wishlist.properties`}).parsed;

  before(async function() {
    this.driver = await DriverSingleton.getDriver();
  });

  it('Should add item to Wishlist.', async function () {
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

  it('Should remove item from Wishlist.', async function () {
    const expectedTextFromEmptyWishlist = 'Your wishlist is empty, shop now to add something to your wishlist.';
    const item = new Item(parsed.itemUrl, null, parsed.itemName);
    const wishlistPage = new WishlistPage(this.driver, item);

    await wishlistPage.removeItemFromWishlist();
    const textFromEmptyWishlist = await wishlistPage.getTitleFromEmptyWishlist();

    expect(textFromEmptyWishlist).to.equal(expectedTextFromEmptyWishlist);
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
  });

  after(async function () {
    await DriverSingleton.closeDriver();
  });
});
