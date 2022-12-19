const webdriver = require('selenium-webdriver');
const { By, until } = webdriver;
const AbstractPage = require('./AbstractPage');
const mlog = require('mocha-logger');

class BagPage extends AbstractPage {
  static itemsInBagXpathSelector = '//div[@class=\'main-cart__line-items\']/child::div';
  static hatTitleInTHeBagCssSelector = 'a.main-cart__line-item-title';
  static numberOfItemsInBagCssSelector = 'p.cart-summary__count';
  static totalPriceInTheBagCssSelector = 'h2.cart-summary__title';
  static removeButtonCssSelector = 'p.line-item__remove-label';
  static titleCssSelector = 'span.main-cart__subtitle';

  async getNumberOfItemsInBagFromList() {
    const itemsInBag = await this.driver.wait(until.elementsLocated(By.xpath(BagPage.itemsInBagXpathSelector)), 5000);

    return itemsInBag.length;
  }

  async getTitle() {
    const title = await this.findElementByCss(BagPage.hatTitleInTHeBagCssSelector);

    return title.getText();
  }

  async getNumberOfItemsInBagFromTotal() {
    let numberOfItemsInBagFromTotal = await this.driver.findElement(By.css(BagPage.numberOfItemsInBagCssSelector)).getText();
    numberOfItemsInBagFromTotal = parseInt(numberOfItemsInBagFromTotal.match(/\d+/));

    return numberOfItemsInBagFromTotal;
  }

  async getTotalPrice() {
    const totalPrice = await this.findElementByCss(BagPage.totalPriceInTheBagCssSelector);

    return totalPrice.getText();
  }

  async removeItem() {
    const removeButton = await this.findElementByCss(BagPage.removeButtonCssSelector);
    this.clickOnElement(removeButton);
    mlog.log('Removing item from the bag');

    return this;
  }

  async getTextAfterRemoving() {
    const title = await this.findElementByCss(BagPage.titleCssSelector);

    return title.getText();
  }
}

module.exports = BagPage;