const webdriver = require('selenium-webdriver');
const { By, until } = webdriver;
const AbstractPage = require('./abstractPage');
const BagPage = require('./bagPage');

class HatPage extends AbstractPage {
  async getPrice() {
    const hatPriceOnHatPageCssSelector = 'span.main-product__price';
    const price = await this.findElementByCss(hatPriceOnHatPageCssSelector);

    return price.getText();
  }

  async getTitle() {
    const hatTitleOnHatPageCssSelector = 'h1.main-product__title';
    const hatTitle = await this.findElementByCss(hatTitleOnHatPageCssSelector);

    return hatTitle.getText();
  }

  async getTextFromAddedToBagPopup() {
    const divWithItemAddedToBagTextCssSelector = 'div.cart-upsell__notification p';
    await this._waitForAddedToBagPopupIsVisible();
    const textFromPopup = await this.findElementByCss(divWithItemAddedToBagTextCssSelector);

    return textFromPopup.getText();
  }

  async selectSize() {
    const hatSizeXpathSelector = '//div[@class="size-selector__content"]/div[text()=\'1SZ\']';
    const hatSize = await this.findElementByXpath(hatSizeXpathSelector);
    this.clickOnElement(hatSize);

    return this;
  }

  async addToBag() {
    const addToBagButtonCssSelector = 'button.product-form__add-to-cart';
    const addToBagButton = await this.findElementByCss(addToBagButtonCssSelector);
    this.clickOnElement(addToBagButton);

    return this;
  }

  async viewBag() {
    const viewBagButtonXpathSelector = '//div[@class=\'cart-upsell__header\']//child::a[@class=\'button cart-upsell__button\']';
    await this._waitForAddedToBagPopupIsVisible();
    const viewBagButton = this.findElementByXpath(viewBagButtonXpathSelector);
    this.clickOnElement(viewBagButton);

    return new BagPage(this.driver);
  }

  async _waitForAddedToBagPopupIsVisible() {
    const addedToBagPopupCssSelector = 'div.cart-upsell-overlay';
    const addedToBagPopup = await this.driver.findElement(By.css(addedToBagPopupCssSelector));
    await this.driver.wait(until.elementIsVisible(addedToBagPopup), 5000);
  }
}

module.exports = HatPage;