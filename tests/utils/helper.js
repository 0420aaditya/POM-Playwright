class Helper {
  constructor(page) {
    this.page = page;
  }

  async menuSelection(menuName) {
    await this.page
      .locator(`span.p-menuitem-text:has-text("${menuName}")`)
      .click();
  }

  async subMenuSelection(subMenuName) {
    const menuItem = this.page
      .getByRole("treeitem", { name: subMenuName })
      .locator("a");
    await menuItem.waitFor({ state: "visible" });
    await menuItem.click();
  }

  async fillText(formcontrolname, value) {
    const input = this.page.locator(`[formcontrolname="${formcontrolname}"]`);
    await input.waitFor({ state: "visible" });
    await input.clear();
    await input.fill(value);
  }
  async fillTextForEmpty(formcontrolname, value) {
    const input = this.page
      .locator(`[formcontrolname="${formcontrolname}"]`)
      .click();
    //await input.waitFor({ state: "visible" });
    await input.fill(value);
  }

  async selectOptionByIndex(formcontrolname, index = 0) {
    // Click the dropdown to open it
    const dropdown = this.page.locator(
      `[formcontrolname="${formcontrolname}"]`
    );
    await dropdown.waitFor({ state: "visible" });
    await dropdown.click();

    // Select the options list
    const options = this.page.locator('li[role="option"]');
    await options.first().waitFor({ state: "visible" }); // Ensure at least the first option is visible

    // Ensure the desired option is visible and clickable
    const targetOption = options.nth(index);
    await targetOption.waitFor({ state: "visible" });
    await targetOption.click();
  }
  async search(searchName, value) {
    await this.page.getByRole("textbox", { name: searchName }).fill(value);
    await this.page.getByRole("button", { name: "Search" }).click();
  }

  // async clickNextButton(page) {
  //   await page
  //     .locator('p-button[label="Next"] >> span[data-pc-section="label"]')
  //     .click();
  // }
  async clickButton(buttonName) {
    const button = this.page.getByRole("button", { name: buttonName });
    await button.waitFor({ state: "visible" });
    await button.click();
  }
  async smartFill(formcontrolname, value) {
    const wrapper = this.page.locator(`[formcontrolname="${formcontrolname}"]`);

    // Try to find a native input inside the wrapper
    const input = wrapper.locator("input");

    if ((await input.count()) > 0) {
      await input.waitFor({ state: "visible" });
      // Ensure the value is a string
      await input.fill(String(value));
    } else {
      throw new Error(`No native input found for ${formcontrolname}`);
    }
  }
}
module.exports = { Helper };
