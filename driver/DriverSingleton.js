const webdriver = require("selenium-webdriver");
const capabilities = require('../config/capabilities.json');
const Browser = webdriver.Browser;
const argv = require('minimist')(process.argv.slice(2));
const mlog = require('mocha-logger');

class DriverSingleton {
  static async getDriver() {
    mlog.log('Creating driver');
    switch (argv.browserName) {
      case "firefox":
        this.driver = await this.createWebdriver(Browser.FIREFOX);
        break;
      default:
        this.driver = await this.createWebdriver(Browser.CHROME);
        break;
    }
    await this.driver.manage().window().maximize();

    return this.driver;
  }

  static async createWebdriver(browser) {
    this.capabilities = {...capabilities};
    this.capabilities['browserName'] = browser;
    return new webdriver.Builder()
      .usingServer(this.capabilities.serverURL)
      .withCapabilities({...this.capabilities})
      .build();
  }

  static async closeDriver() {
    mlog.log('Closing driver');
    await this.driver.quit();
  }
}

module.exports = DriverSingleton;