const webdriver = require('selenium-webdriver');
const { By, Key } = webdriver;
const AbstractPage = require('./abstractPage');
const SearchResultsPage = require('./searchResultsPage');

class HomePage extends AbstractPage {
  async openSearchLine() {
    const searchIconCssSelector = 'a[aria-label=\'Open search icon button\']';
    const searchIcon = await this.findElementByCss(searchIconCssSelector);
    this.clickOnElement(searchIcon);

    return this;
  }

  async inputSearchValue(value) {
    const searchLineCssSelector = 'input[type=\'text\'][placeholder=\'Search\']';
    await this.findElementByCss(searchLineCssSelector);
    await this.driver.findElement(By.css(searchLineCssSelector)).sendKeys(value, Key.ENTER);

    return new SearchResultsPage(this.driver);
  }
}

module.exports = HomePage;