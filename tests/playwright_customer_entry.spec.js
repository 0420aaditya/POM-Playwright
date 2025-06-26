const { test, expect } = require("@playwright/test");
const fs = require("fs");
const { parse } = require("csv-parse/sync");

test("Automate customer entries from CSV", async ({ page }) => {
  // Read and parse the CSV file from the tests directory
  const csvData = fs.readFileSync("tests/customers.csv", "utf-8");
  const records = parse(csvData, { columns: true, skip_empty_lines: true });

  // Login to the system
  await page.goto("https://ccms.fewapay.com/login");
  await page
    .getByRole("textbox", { name: "Enter username" })
    .fill("muktinathi");
  await page.getByRole("textbox", { name: "Enter password" }).fill("Imark@123");
  await page.getByRole("button", { name: "Login" }).click();

  // Navigate to New Card page
  await page.getByRole("button", { name: "Card Entry" }).locator("a").click();

  // Loop through each record in the CSV
  for (const record of records) {
    console.log(`Processing entry for ${record.fn} ${record.ln}`);

    await page.getByRole("link", { name: "New Card" }).click();

    // Search by Client Code
    await page
      .getByRole("textbox", { name: "Search By Client Code" })
      .fill("C12358");
    await page.getByRole("button", { name: "Search" }).click();

    // Fill customer details
    await page
      .locator("form div")
      .filter({ hasText: "Customer Code*Salutation *" })
      .getByRole("combobox")
      .first()
      .click();

    await page.getByRole("option", { name: "Mr." }).click();

    await page.getByRole("textbox", { name: "First Name *" }).fill(record.fn);
    await page.getByRole("textbox", { name: "Middle Name" }).fill("");
    await page.getByRole("textbox", { name: "Last Name *" }).fill(record.ln);
    await page.getByRole("textbox", { name: "Phone Number *" }).fill(record.ph);

    // Select municipality (assuming consistent selection as in original script)
    await page.locator("#pn_id_54").getByRole("combobox").click();
    await page.locator(".p-dropdown-filter").fill("biren");
    await page.getByText("Birendranagar Municipality").click();

    // Select card type
    await page.locator("p-checkbox div").nth(2).click();
    await page.getByText("Create Card Credit Card").click();

    // Proceed to next step
    await page.getByRole("button", { name: " Next" }).click();

    // Fill additional fields
    await page
      .locator("div:nth-child(13) > .flex > .p-inputtext")
      .fill(record.cc + "x"); // Unique identifier
    await page
      .getByRole("textbox", { name: "Customer Code*" })
      .fill(record.cc + "eyt");
    await page.getByRole("button", { name: " Next" }).click();

    // Select card type and payment
    await page.locator("#pn_id_68").getByRole("combobox").click();
    await page.getByText("VISA Classic").click();
    await page.getByRole("combobox").nth(2).click();
    await page.getByRole("option", { name: "Normal Payment" }).click();
    await page.getByRole("button", { name: " Next" }).click();

    // Go back to fill embossed name
    await page.getByRole("button", { name: " Previous" }).click();
    await page
      .locator("div")
      .filter({ hasText: /^Embossed Name \*$/ })
      .nth(1)
      .click();
    await page
      .getByRole("textbox")
      .fill(`${record.fn} ${record.ln}`.toUpperCase());
    await page.getByRole("button", { name: " Next" }).click();

    // Fill credit limit and reference ID
    await page
      .getByRole("spinbutton", { name: "Credit Limit *" })
      .fill("65000");
    await page.getByRole("textbox", { name: "Reference ID" }).fill(record.id);

    // Select normal processing and nominee
    await page.getByRole("combobox").click();
    await page.getByText("normal").click();
    await page
      .getByRole("textbox", { name: "Search By NomineeAccNo." })
      .fill("12345678901234567890");
    await page.getByRole("button", { name: "Search" }).click();
    await page.getByRole("radio", { name: "No" }).check();

    // Save the entry
    await page.getByRole("button", { name: "Save Changes" }).click();

    // Optional: Add a small delay to ensure stability between entries
    await page.waitForTimeout(2000);
  }
});

//grok.generated workflow
// const { test, expect } = require('@playwright/test');
// const { LoginPage } = require('../pages/loginPage');
// const { CardRequestPage } = require('../pages/cardRequestPage');
// const { SessionManager } = require('../utils/sessionManager');

// // Setup sessions for roles
// test.beforeAll(async () => {
//   const sessionManager = new SessionManager();
//   await sessionManager.createSession('branchUser', 'sbimaker', 'password123');
//   await sessionManager.createSession('reviewer', 'sbiadmin', 'password456');
// });

// test.describe('Card Workflow', () => {
//   test('Request and Approve Card', async () => {
//     const sessionManager = new SessionManager();

//     // Branch user context
//     const branchContext = await sessionManager.getContextForRole('branchUser');
//     const branchPage = await branchContext.newPage();
//     const cardRequestPage = new CardRequestPage(branchPage);

//     // Load CSV data
//     const entries = await cardRequestPage.loadCsvData('../data/testData.csv');

//     // Submit card requests
//     for (const entry of entries.slice(0, process.argv[2] || 2)) {
//       await cardRequestPage.navigateTo('https://ccms.fewapay.com/card-request');
//       await cardRequestPage.submitCardRequest(entry);
//     }
//     await branchContext.close();

//     // Reviewer context
//     const reviewerContext = await sessionManager.getContextForRole('reviewer');
//     const reviewerPage = await reviewerContext.newPage();
//     const reviewerCardPage = new CardRequestPage(reviewerPage);

//     // Approve card
//     await reviewerCardPage.navigateTo('https://ccms.fewapay.com/pending-cards');
//     await reviewerCardPage.approveCard('C12376');
//     await reviewerContext.close();
//   });
// });
