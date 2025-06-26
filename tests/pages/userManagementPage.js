const { BasePage } = require('./base');

class LoginPage extends BasePage {
  constructor(page) {
    super(page);
    this.usernameInput = '#username';
    this.passwordInput = '#password';
    this.loginButton = 'button:has-text("Login")';
    this.errorMessage = '.error-message';
    this.dashboard = '.dashboard';
  }

  async login(username, password) {
    await this.fillFormField(this.usernameInput, username);
    await this.fillFormField(this.passwordInput, password);
    await this.clickButton('Login');
    await this.verifyElementVisible(this.dashboard);
  }

  async verifyLoginError() {
    await this.verifyElementVisible(this.errorMessage);
    return await this.page.locator(this.errorMessage).textContent();
  }
}

module.exports = { LoginPage };