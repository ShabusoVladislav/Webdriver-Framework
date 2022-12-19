const chai = require("chai");
const assert = chai.assert;
const argv = require('minimist')(process.argv.slice(2));

describe("Search tests.", () => {
  const HomePage = require('../pages/HomePage');
  const DriverSingleton = require('../driver/DriverSingleton');

  const parsed = require("dotenv").config({path: `./resources/${argv.env}.search.properties`}).parsed;

  beforeEach(async function() {
    this.driver = await DriverSingleton.getDriver();
  });

  it('Should find 0 items for invalid search query.', async function () {
    //Home page
    const homePage = new HomePage(this.driver);
    await homePage.openPage();
    await homePage.closeCookiesPopup();

    await homePage.openSearchLine();

    const searchResultsPage = await homePage.inputSearchValue(parsed.invalidSearchQuery);

    const numberOfSearchedElementsFromTitle = await searchResultsPage.getNumberOfSearchedItemsFromTitle();
    const numberOfSearchedElementsFromList = await searchResultsPage.getNumberOfSearchedItemsFromList();

    assert.equal(numberOfSearchedElementsFromTitle, 0);
    assert.equal(numberOfSearchedElementsFromList, 0);
  }).timeout(60000);

  it('Should find items for valid search query.', async function () {
    const homePage = new HomePage(this.driver);
    await homePage.openPage();
    await homePage.closeCookiesPopup();

    await homePage.openSearchLine();

    const searchResultsPage = await homePage.inputSearchValue(parsed.validSearchQuery);

    const numberOfSearchedElementsFromTitle = await searchResultsPage.getNumberOfSearchedItemsFromTitle();
    const numberOfSearchedElementsFromList = await searchResultsPage.getNumberOfSearchedItemsFromList();
    const numberOfSearchedElementsContainsSearchQuery = await searchResultsPage.numberOfSearchedElementsContainsSearchQuery(parsed.validSearchQuery);

    assert.equal(numberOfSearchedElementsFromTitle, numberOfSearchedElementsFromList);
    assert.isAbove(numberOfSearchedElementsFromTitle, 0);
    assert.isAbove(numberOfSearchedElementsContainsSearchQuery, 0);
  }).timeout(60000);

  afterEach(async function () {
    if(this.currentTest.state !== "passed") {
      const image = await this.driver.takeScreenshot();
      await require('fs').writeFile(
        './screenshots/SearchFail.png',
        image,
        'base64',
        (err) => {});
    }
    await DriverSingleton.closeDriver();
  });
});