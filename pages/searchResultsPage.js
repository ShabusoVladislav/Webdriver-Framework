const webdriver = require('selenium-webdriver');
const { By, until, Key } = webdriver;
const AbstractPage = require('./abstractPage');

class SearchResultsPage extends AbstractPage {
  async getNumberOfSearchedItemsFromTitle() {
    const titleCssSelector = 'h2.main-search__title';
    let numberOfSearchedItemsFromTitle = await this.driver.findElement(By.css(titleCssSelector)).getText();
    numberOfSearchedItemsFromTitle = parseInt(numberOfSearchedItemsFromTitle.match(/\d+/));

    return numberOfSearchedItemsFromTitle;
  }

  async getNumberOfSearchedItemsFromList() {
    const listOfSearchedItemsCssSelector = 'div.main-search__grid > a';
    const searchedItems = await this.driver.findElements(By.css(listOfSearchedItemsCssSelector));

    return searchedItems.length;
  }

  async numberOfSearchedElementsContainsSearchQuery(query) {
    const searchedElementsXpathSelector = `//div[@class=\'main-search__grid grid container\']/a//p[contains(text(), '${query}')]`;
    const searchedElements = await this.driver.wait(until.elementsLocated(By.xpath(searchedElementsXpathSelector)), 8000);

    return searchedElements.length;
  }
}

module.exports = SearchResultsPage;