const { chromium } = require('@playwright/test');
const { LoginPage } = require('../pages/loginPage');

class SessionManager {
  async createSession(role, username, password) {
    const browser = await chromium.launch();
    const context = await browser.newContext();
    const page = await context.newPage();
    const loginPage = new LoginPage(page);

    await loginPage.navigateTo('https://ccms.fewapay.com');
    await loginPage.login(username, password);

    // Save session state
    await context.storageState({ path: `data/${role}_session.json` });
    await browser.close();
  }

  async getContextForRole(role) {
    const browser = await chromium.launch();
    return await browser.newContext({
      storageState: `data/${role}_session.json`
    });
  }
}

module.exports = { SessionManager };