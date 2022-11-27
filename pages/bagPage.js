const webdriver = require('selenium-webdriver');
const { By, until } = webdriver;
const AbstractPage = require('./abstractPage');

class BagPage extends AbstractPage {
  async getNumberOfItemsInBagFromList() {
    const itemsInBagXpathSelector = '//div[@class=\'main-cart__line-items\']/child::div';
    const itemsInBag = await this.driver.wait(until.elementsLocated(By.xpath(itemsInBagXpathSelector)), 5000);

    return itemsInBag.length;
  }

  async getTitle() {
    const hatTitleInTHeBagCssSelector = 'a.main-cart__line-item-title';
    const title = await this.findElementByCss(hatTitleInTHeBagCssSelector);

    return title.getText();
  }

  async getNumberOfItemsInBagFromTotal() {
    const numberOfItemsInBagCssSelector = 'p.cart-summary__count';
    let numberOfItemsInBagFromTotal = await this.driver.findElement(By.css(numberOfItemsInBagCssSelector)).getText();
    numberOfItemsInBagFromTotal = parseInt(numberOfItemsInBagFromTotal.match(/\d+/));

    return numberOfItemsInBagFromTotal;
  }

  async getTotalPrice() {
    const totalPriceInTheBagCssSelector = 'h2.cart-summary__title';
    const totalPrice = await this.findElementByCss(totalPriceInTheBagCssSelector);

    return totalPrice.getText();
  }
}

module.exports = BagPage;