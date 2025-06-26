const { test: base } = require("@playwright/test");
const { LoginPage } = require("./loginPage");
const { DashboardPage } = require("./dashboardPage");

const test = base.extend({
  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },

  dashboardPage: async ({ page }, use) => {
    await use(new DashboardPage(page));
  },
});

module.exports = { test, expect: base.expect };
