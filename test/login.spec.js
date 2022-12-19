const chai = require("chai");
const expect = chai.expect;
const argv = require('minimist')(process.argv.slice(2));

describe("Login test", () => {
  const DriverSingleton = require("../driver/DriverSingleton");
  const User = require("../models/User");
  const LoginPage = require('../pages/LoginPage');

  const parsed = require("dotenv").config({path: `./resources/${argv.env}.login.properties`}).parsed;

  beforeEach(async function() {
    this.driver = await DriverSingleton.getDriver();
  });

  it('Should login user to account', async function () {
    const expectedTextFromAccountTitle = 'My Account';
    const user = new User(parsed.userEmail, parsed.userPassword);
    const loginPage = new LoginPage(this.driver, user);
    await loginPage.openPage();
    await loginPage.closeCookiesPopup();

    const accountPage = await loginPage.login();

    const textFromAccountTitle = await accountPage.getAccountTitle();

    expect(textFromAccountTitle).to.equal(expectedTextFromAccountTitle);
  }).timeout(60000);

  afterEach(async function () {
    if(this.currentTest.state !== "passed") {
      const image = await this.driver.takeScreenshot();
      await require('fs').writeFile(
        './screenshots/LoginFail.png',
        image,
        'base64',
        (err) => {});
    }
    await DriverSingleton.closeDriver();
  });
});
