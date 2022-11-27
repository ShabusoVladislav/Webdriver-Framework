const webdriver = require('selenium-webdriver');
const { By, until } = webdriver;

class AbstractPage {
  constructor(driver) {
    this.driver = driver;
  }

  async openPage(url) {
    await this.driver.get(url);

    return this;
  }

  async findElementByXpath(xpath) {
    return this.driver.wait(until.elementLocated(By.xpath(xpath)), 8000);
  }

  async findElementByCss(css) {
    return this.driver.wait(until.elementLocated(By.css(css)), 8000);
  }

  async closeCookiesPopup() {
    const acceptCookiesButtonCssSelector = 'button#onetrust-accept-btn-handler';
    const acceptCookiesButton = await this.findElementByCss(acceptCookiesButtonCssSelector);
    this.clickOnElement(acceptCookiesButton);

    return this;
  }

  async closeDeliveryLocationPopup() {
    const deliveryLocationROTWButtonXpathSelector = '//span[text()=\'Rest of the World\']';
    const deliveryLocationROTWButton = await this.findElementByXpath(deliveryLocationROTWButtonXpathSelector);
    this.clickOnElement(deliveryLocationROTWButton);

    return this;
  }

  clickOnElement(element) {
    this.driver.executeScript("arguments[0].click();", element);
  }
}

module.exports = AbstractPage;