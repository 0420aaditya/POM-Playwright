const { test } = require('@playwright/test');

test('Store session for Initiator', async ({ page }) => {
  await page.goto('https://your-app-url.com');
  await page.fill('#username', 'muktinathi');
  await page.fill('#password', 'Imark@123');
  await page.click('button[type="submit"]');
  await page.context().storageState({ path: 'storage/initiator.json' });
});

test('Store session for Reviewer', async ({ page }) => {
  await page.goto('https://your-app-url.com');
  await page.fill('#username', 'muktinathc');
  await page.fill('#password', 'Imark@123');
  await page.click('button[type="submit"]');
  await page.context().storageState({ path: 'storage/reviewer.json' });
});

test('Store session for Admin', async ({ page }) => {
  await page.goto('https://your-app-url.com');
  await page.fill('#username', 'sbladmin');
  await page.fill('#password', 'Imark@123');
  await page.click('button[type="submit"]');
  await page.context().storageState({ path: 'storage/admin.json' });
});
