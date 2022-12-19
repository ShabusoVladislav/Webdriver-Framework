const AbstractPage = require('./AbstractPage');
const mlog = require('mocha-logger');

class AccountPage extends AbstractPage {
  static titleCssSelector = 'h2.customers-header__title';

  async getAccountTitle() {
    const textFromTitle = await this.findElementByCss(AccountPage.titleCssSelector);
    mlog.log('Reading text from title');

    return textFromTitle.getText();
  }
}

module.exports = AccountPage;