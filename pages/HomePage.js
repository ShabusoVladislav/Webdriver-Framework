const webdriver = require('selenium-webdriver');
const { By, Key } = webdriver;
const AbstractPage = require('./AbstractPage');
const SearchResultsPage = require('./SearchResultsPage');
const mlog = require('mocha-logger');

class HomePage extends AbstractPage {
  static homePageUrl = 'https://row.lyleandscott.com/';
  static searchIconCssSelector = 'a[aria-label=\'Open search icon button\']';
  static searchLineCssSelector = 'input[type=\'text\'][placeholder=\'Search\']';

  async openPage() {
    mlog.log('Open home page');
    return super.openPage(HomePage.homePageUrl);
  }

  async openSearchLine() {
    mlog.log('Open search line');
    const searchIcon = await this.findElementByCss(HomePage.searchIconCssSelector);
    this.clickOnElement(searchIcon);

    return this;
  }

  async inputSearchValue(value) {
    await this.findElementByCss(HomePage.searchLineCssSelector);
    await this.driver.findElement(By.css(HomePage.searchLineCssSelector)).sendKeys(value, Key.ENTER);
    mlog.log('Input and searching value');

    return new SearchResultsPage(this.driver);
  }
}

module.exports = HomePage;