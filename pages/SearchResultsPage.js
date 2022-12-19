const webdriver = require('selenium-webdriver');
const { By, until } = webdriver;
const AbstractPage = require('./AbstractPage');

class SearchResultsPage extends AbstractPage {
  static titleCssSelector = 'h2.main-search__title';
  static listOfSearchedItemsCssSelector = 'div.main-search__grid > a';

  async getNumberOfSearchedItemsFromTitle() {
    await this.findElementByCss(SearchResultsPage.titleCssSelector);
    let numberOfSearchedItemsFromTitle = await this.driver.findElement(By.css(SearchResultsPage.titleCssSelector)).getText();
    numberOfSearchedItemsFromTitle = parseInt(numberOfSearchedItemsFromTitle.match(/\d+/));

    return numberOfSearchedItemsFromTitle;
  }

  async getNumberOfSearchedItemsFromList() {
    const searchedItems = await this.driver.findElements(By.css(SearchResultsPage.listOfSearchedItemsCssSelector));

    return searchedItems.length;
  }

  async numberOfSearchedElementsContainsSearchQuery(query) {
    const searchedElementsXpathSelector = `//div[@class=\'main-search__grid grid container\']/a//p[contains(text(), '${query}')]`;
    const searchedElements = await this.driver.wait(until.elementsLocated(By.xpath(searchedElementsXpathSelector)), 8000);

    return searchedElements.length;
  }
}

module.exports = SearchResultsPage;