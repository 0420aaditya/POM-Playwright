//npx playwright test tests/tests/cardWorkFlow.spec.js --project=Chromium --workers=1 --headed --debug

//use  await page.pause();  for inspector

const { test, expect } = require("../pages/basePage");
const { Helper } = require("../utils/helper");
const { generateTestData } = require("../utils/generateTestData");

test("User can login and submit multiple card entries", async ({
  page,
  loginPage,
}) => {
  test.setTimeout(200000);
  await loginPage.goto();
  await loginPage.login("muktinathi", "Imark@123");
  const helper = new Helper(page);
  //store sessions
  //await helper.storeSession("initiator");

  // Number of entries to submit
  const numberOfEntries = 1;

  // Navigate to Card Entry page once
  await helper.menuSelection("Card Entry");
  await helper.subMenuSelection("New Card");

  for (let i = 0; i < numberOfEntries; i++) {
    console.log(`📝 Submitting card entry: ${i + 1}`);

    const testData = generateTestData();

    await helper.search("Search By Client Code", "C12364");
    await helper.fillText("firstName", testData.firstName);
    await helper.selectOptionByIndex("salutation", 1);
    await helper.fillText("customerCode", testData.customerCode);
    await helper.fillText("middleName", "");
    await helper.fillText("lastName", testData.lastName);
    await helper.fillText("phoneNumber", testData.phoneNumber);
    await helper.fillText("identityNumber", testData.identityNumber);

    const checkbox = await page.locator('[formcontrolname="sameAsPermanent"]');
    await checkbox.waitFor({ state: "visible" });
    await checkbox.click();

    await helper.clickButton("Next");
    await helper.selectOptionByIndex("productType", 1);
    await helper.selectOptionByIndex("paymentMethodId", 0);
    await helper.fillText("embossedName", testData.embossedName);
    await helper.clickButton("Next");

    await page.waitForTimeout(1000);

    await helper.smartFill("creditLimit", `${testData.creditLimit}`);
    await helper.fillText("referenceId", "ref345");
    await helper.selectOptionByIndex("clientType", 0);

    await page.waitForTimeout(2000);
    await helper.search("Search By NomineeAccNo.", "12345678901234567890");
    await page.waitForTimeout(2000);

    //await page.getByRole("radio", { name: "No" }).check();

    //********** */
    await page
      .getByRole("textbox", { name: "Document Type *" })
      .fill("TestFile");
    await page.waitForTimeout(1000);

    //file upload
    const path = require("path");
    const filePath = path.resolve(__dirname, "../utils/uploadFiles/1.jpg");
    await page.setInputFiles('input[type="file"]', filePath);

    await page.getByRole("button", { name: " Preview" }).click();
    //wait for some time to preview file
    await page.waitForTimeout(1000);
    await page.getByRole("button", { name: "Close" }).click();

    await page.waitForTimeout(1000);
    await helper.clickButton("Save Changes");

    // ✅ Print Success Message with Name
    console.log(
      `✅ Card requested successfully for: ${testData.firstName} ${testData.lastName}`
    );

    // Wait and go back to 'New Card' form for next entry
    await page.waitForTimeout(2000);
    await helper.subMenuSelection("New Card");
  }
});

test("Approve By Approver", async ({ page, loginPage }) => {
  test.setTimeout(120000);
  await loginPage.goto();
  await loginPage.login("muktinathc", "Imark@123");

  const helper = new Helper(page);
  //store sessions
  // await helper.storeSession("reviewer");

  // Navigate to Card Approval page once
  await helper.menuSelection("Card Request");
  await helper.subMenuSelection("Pending Card(s) Approval");

  // Wait for the page to fully load
  await page.waitForLoadState("networkidle");

  await page.getByRole("row", { name: "1" }).getByRole("button").nth(1).click();
  await page.getByRole("button", { name: "Yes" }).click();
  await page.waitForTimeout(5000);
});

test("Approve By Admin", async ({ page, loginPage }) => {
  test.setTimeout(120000);
  await loginPage.goto();
  await loginPage.login("sbladmin", "Imark@123");
  const helper = new Helper(page);

  await page.waitForTimeout(200);
  // //store sessions
  // await helper.storeSession("admin");

  // Navigate to Card Approval page once
  await helper.menuSelection("Card Request");
  await helper.subMenuSelection("Pending Card(s) Approval");

  // Wait for the page to fully load
  await page.waitForLoadState("networkidle");

  await page.getByRole("row", { name: "1" }).getByRole("button").nth(1).click();
  await page.getByRole("button", { name: "Approve" }).click();
  await page.waitForTimeout(5000);

  //to get Data of 1st Row
  //await helper.getRowData();
});
