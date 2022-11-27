const webdriver = require("selenium-webdriver");
const chai = require("chai");
const assert = chai.assert;

const capabilities = require('../capabilities.json');

describe("Search tests.", () => {
  const HomePage = require('../pages/homePage');

  const homePageUrl = 'https://row.lyleandscott.com/';
  const serverUrl = 'http://bsuser_ZvQmut:TGaiaS6ezp6ikhQT3TWD@hub-cloud.browserstack.com/wd/hub';

  beforeEach(async function() {
    this.driver = new webdriver.Builder()
      .usingServer(serverUrl)
      .withCapabilities({
        ...capabilities,
        ...capabilities['browser'] && { browserName: capabilities['browser']}
      })
      .build();

    await this.driver.manage().window().maximize();
  });

  it('Should find 0 items for invalid search query.', async function () {
    const invalidSearchQuery = 'Reporerd Bagg';
    //Home page
    const homePage = new HomePage(this.driver);
    await homePage.openPage(homePageUrl);
    await homePage.closeCookiesPopup();
    await homePage.closeDeliveryLocationPopup();

    await homePage.openSearchLine();

    const searchResultsPage = await homePage.inputSearchValue(invalidSearchQuery);

    const numberOfSearchedElementsFromTitle = await searchResultsPage.getNumberOfSearchedItemsFromTitle();
    const numberOfSearchedElementsFromList = await searchResultsPage.getNumberOfSearchedItemsFromList();

    assert.equal(numberOfSearchedElementsFromTitle, 0);
    assert.equal(numberOfSearchedElementsFromList, 0);
  }).timeout(60000);

  it('Should find items for valid search query.', async function () {
    const validSearchQuery = 'Reporter Bag';

    const homePage = new HomePage(this.driver);
    await homePage.openPage(homePageUrl);
    await homePage.closeCookiesPopup();
    await homePage.closeDeliveryLocationPopup();

    await homePage.openSearchLine();

    const searchResultsPage = await homePage.inputSearchValue(validSearchQuery);

    const numberOfSearchedElementsFromTitle = await searchResultsPage.getNumberOfSearchedItemsFromTitle();
    const numberOfSearchedElementsFromList = await searchResultsPage.getNumberOfSearchedItemsFromList();
    const numberOfSearchedElementsContainsSearchQuery = await searchResultsPage.numberOfSearchedElementsContainsSearchQuery(validSearchQuery);

    assert.equal(numberOfSearchedElementsFromTitle, numberOfSearchedElementsFromList);
    assert.isAbove(numberOfSearchedElementsFromTitle, 0);
    assert.isAbove(numberOfSearchedElementsContainsSearchQuery, 0);
  }).timeout(60000);

  afterEach(async function () {
    await this.driver.quit();
  });
});