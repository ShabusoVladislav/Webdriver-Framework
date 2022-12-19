const webdriver = require('selenium-webdriver');
const { By, Key } = webdriver;
const AbstractPage = require('./AbstractPage');
const AccountPage = require('./AccountPage');
const mlog = require('mocha-logger');

class LoginPage extends AbstractPage {
  static loginPageUrl = 'https://row.lyleandscott.com/account/login?return_url=%2Faccount';
  static emailFieldXpathSelector = '//div[contains (@class, \'customers-login__form--group\')]//input[@type=\'email\']';
  static passwordFieldXpathSelector = '//div[contains (@class, \'customers-login__form--group\')]//input[@type=\'password\']';

  constructor(driver, user) {
    super(driver);
    this.user = user;
  }

  async openPage(url) {
    mlog.log('Open Login page');
    return super.openPage(LoginPage.loginPageUrl);
  }

  async login() {
    const emailField = await this.findElementByXpath(LoginPage.emailFieldXpathSelector);
    await this.clickOnElement(emailField);
    mlog.log('Inputing user email');
    await this.driver.findElement(By.xpath(LoginPage.emailFieldXpathSelector)).sendKeys(this.user.getEmail());
    const passwordField = await this.findElementByXpath(LoginPage.passwordFieldXpathSelector);
    await this.clickOnElement(passwordField);
    mlog.log('Inputing user password');
    await this.driver.findElement(By.xpath(LoginPage.passwordFieldXpathSelector)).sendKeys(this.user.getPassword(), Key.ENTER);

    return new AccountPage(this.driver);
  }
}

module.exports = LoginPage;