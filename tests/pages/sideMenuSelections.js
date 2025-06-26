class SideMenu {
  constructor(page) {
    this.page = page;
  }

  async menuSelection(menuName) {
    await page.locator(`span.p-menuitem-text:has-text("${menuName}")`).click();
  }

  async subMenuSelection(subMenuName) {
    const menuItem = page
      .getByRole("treeitem", { name: subMenuName })
      .locator("a");
    await menuItem.waitFor({ state: "visible" });
    await menuItem.click();
  }
}

module.exports = { SideMenu };
