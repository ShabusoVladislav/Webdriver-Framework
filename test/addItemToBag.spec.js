const chai = require("chai");
const expect = chai.expect;
const argv = require('minimist')(process.argv.slice(2));

describe("Add item to the Bag test", () => {
  const ItemPage = require('../pages/itemPage');
  const DriverSingleton = require('../driver/DriverSingleton');
  const SizeUtils = require('../utils/SizeUtils.json');
  const Item = require('../models/Item');

  const parsed = require("dotenv").config({path: `./resources/${argv.env}.item.properties`}).parsed;

  beforeEach(async function() {
    this.driver = await DriverSingleton.getDriver();
  });

  it('Should add item to the Bag', async function () {
    const itemAddedToBagText = 'Item added to bag';
    const item = new Item(parsed.itemUrl, parsed.itemSize);

    const itemPage = new ItemPage(this.driver, item);
    await itemPage.openPage();
    await itemPage.closeCookiesPopup();

    item.setPrice(await itemPage.getPrice());
    item.setName(await itemPage.getTitle());

    await itemPage.selectSize(SizeUtils[item.getSize()]);
    await itemPage.addToBag();

    const textFromAddedToBagPopup = await itemPage.getTextFromAddedToBagPopup();

    const bagPage = await itemPage.viewBag();

    const numberOfItemsInBagFromList = await bagPage.getNumberOfItemsInBagFromList();
    const itemTitleOnBagPage = await bagPage.getTitle();
    const numberOfItemsInBagFromTotal = await bagPage.getNumberOfItemsInBagFromTotal();
    const totalPriceInTheBag = await bagPage.getTotalPrice();

    expect(item.getPrice()).to.equal(totalPriceInTheBag);
    expect(item.getName()).to.equal(itemTitleOnBagPage);
    expect(numberOfItemsInBagFromList).to.equal(numberOfItemsInBagFromTotal);
    expect(textFromAddedToBagPopup).to.equal(itemAddedToBagText);
  }).timeout(60000);

  afterEach(async function () {
    if(this.currentTest.state !== "passed") {
      const image = await this.driver.takeScreenshot();
      await require('fs').writeFile(
        './screenshots/AddToBagFail.png',
        image,
        'base64',
        (err) => {});
    }
    await DriverSingleton.closeDriver();
  });
});
