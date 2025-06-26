class DashboardPage {
  constructor(page) {
    this.page = page;
    this.cardEntryButton = page.getByRole("button", { name: "Card Entry" });
  }
}
module.exports = { DashboardPage };
