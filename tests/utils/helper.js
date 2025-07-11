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

  //   async selectOptionByIndex(formcontrolname, index = 0) {
  //   const dropdown = this.page.locator(`[formcontrolname="${formcontrolname}"]`);
  //   await dropdown.waitFor({ state: 'visible' });
  //   await dropdown.click();
  //   const options = this.page.locator('.p-dropdown-items .p-dropdown-item');

  //   const optionCount = await options.count();
  //   if (optionCount === 0) throw new Error('No dropdown options found');
  //   if (index >= optionCount) throw new Error(`Index ${index} out of range`);

  //   await options.nth(index).waitFor({ state: 'visible' });
  //   await options.nth(index).click();
  // }

  async selectOptionByIndex(formcontrolname, index = 0) {
    const dropdown = this.page.locator(
      `[formcontrolname="${formcontrolname}"]`
    );
    await dropdown.waitFor({ state: "visible" });
    await dropdown.click();

    // Wait for the overlay panel to appear
    const overlayPanel = this.page.locator(".p-dropdown-panel");
    await overlayPanel.waitFor({ state: "visible", timeout: 3000 });

    const options = overlayPanel.locator(".p-dropdown-items .p-dropdown-item");
    const optionCount = await options.count();

    if (optionCount === 0) {
      throw new Error("No dropdown options found");
    }

    if (index >= optionCount) {
      throw new Error(`Index ${index} out of range (max: ${optionCount - 1})`);
    }

    await options.nth(index).click();
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

  async getRowData() {
    // Get all rows
    const rows = await this.page.getByRole("row");

    // Get the first row (index 0 is usually the header row, so index 1 is data)
    const firstDataRow = rows.nth(1);

    // Get all cells inside the first data row
    const cellsInFirstRow = await firstDataRow.getByRole("cell");

    // Loop through the cells and print their text
    const cellCount = await cellsInFirstRow.count();

    for (let i = 0; i < cellCount; i++) {
      const cell = cellsInFirstRow.nth(i);
      const text = await cell.textContent();
      console.log(`Cell ${i + 1}:`, text?.trim());
    }
  }

  async storeSession(role = "initiator") {
    const fs = require("fs");
    const path = require("path");

    const sessionPath = path.resolve(__dirname, `./LoginSessions/${role}.json`);

    // 💥 Delete the empty JSON file if it exists
    if (fs.existsSync(sessionPath)) {
      fs.unlinkSync(sessionPath);
    }

    // ✅ Make sure directory exists
    const dir = path.dirname(sessionPath);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }

    // ✅ Use page.context() to save session
    await this.page.context().storageState({ path: sessionPath });

    console.log(`✅ Session saved to ${sessionPath}`);
  }
}
module.exports = { Helper };
