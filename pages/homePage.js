const webdriver = require('selenium-webdriver');
const { By, Key } = webdriver;
const AbstractPage = require('./abstractPage');
const SearchResultsPage = require('./searchResultsPage');
const mlog = require('mocha-logger');

class HomePage extends AbstractPage {
  async openPage() {
    mlog.log('Open home page');
    return super.openPage('https://row.lyleandscott.com/');
  }

  async openSearchLine() {
    mlog.log('Open search line');
    const searchIconCssSelector = 'a[aria-label=\'Open search icon button\']';
    const searchIcon = await this.findElementByCss(searchIconCssSelector);
    this.clickOnElement(searchIcon);

    return this;
  }

  async inputSearchValue(value) {
    const searchLineCssSelector = 'input[type=\'text\'][placeholder=\'Search\']';
    await this.findElementByCss(searchLineCssSelector);
    await this.driver.findElement(By.css(searchLineCssSelector)).sendKeys(value, Key.ENTER);
    mlog.log('Input and searching value');

    return new SearchResultsPage(this.driver);
  }
}

module.exports = HomePage;