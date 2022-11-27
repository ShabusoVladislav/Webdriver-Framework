const webdriver = require("selenium-webdriver");
const chai = require("chai");
const expect = chai.expect;

const capabilities = require('../capabilities.json');

describe("Add a Hat to the Bag test", () => {
  const HatPage = require('../pages/hatPage');

  const hatPageUrl = 'https://row.lyleandscott.com/products/racked-rib-beanie-true-black';
  const serverUrl = 'http://bsuser_ZvQmut:TGaiaS6ezp6ikhQT3TWD@hub-cloud.browserstack.com/wd/hub';

  beforeEach(async function() {
    this.driver = new webdriver.Builder()
      .usingServer(serverUrl)
      .withCapabilities({
        ...capabilities,
        ...capabilities['browser'] && { browserName: capabilities['browser']}  // Because NodeJS language binding requires browserName to be defined
      })
      .build();

    await this.driver.manage().window().maximize();
  });

  it('Should add a Hat to the Bag', async function () {
    const itemAddedToBagText = 'Item added to bag';

    const hatPage = new HatPage(this.driver);
    await hatPage.openPage(hatPageUrl);
    await hatPage.closeCookiesPopup();

    const hatPriceOnHatPage = await hatPage.getPrice();
    const hatTitleOnHatPage = await hatPage.getTitle();

    await hatPage.selectSize();
    await hatPage.addToBag();

    const textFromAddedToBagPopup = await hatPage.getTextFromAddedToBagPopup();

    const bagPage = await hatPage.viewBag();

    const numberOfItemsInBagFromList = await bagPage.getNumberOfItemsInBagFromList();
    const hatTitleOnBagPage = await bagPage.getTitle();
    const numberOfItemsInBagFromTotal = await bagPage.getNumberOfItemsInBagFromTotal();
    const totalPriceInTheBag = await bagPage.getTotalPrice();

    expect(hatPriceOnHatPage).to.equal(totalPriceInTheBag);
    expect(hatTitleOnHatPage).to.equal(hatTitleOnBagPage);
    expect(numberOfItemsInBagFromList).to.equal(numberOfItemsInBagFromTotal);
    expect(textFromAddedToBagPopup).to.equal(itemAddedToBagText);
  }).timeout(60000);

  afterEach(async function () {
    await this.driver.quit();
  });
});