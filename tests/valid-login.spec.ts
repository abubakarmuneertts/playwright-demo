import { test, expect } from '@playwright/test';

test('valid login with standard_user should succeed', async ({ page }) => {
  // Step 1: Go to the URL (baseURL = https://www.saucedemo.com)
  await page.goto('/');

  // Step 2: Fill username
  await page.locator('[data-test="username"]').fill('standard_user');

  // Step 3: Fill password
  await page.locator('[data-test="password"]').fill('secret_sauce');

  // Step 4: Click the Login button
  await page.locator('[data-test="login-button"]').click();

  // Step 5: Verify login succeeded — user must land on the Products page.
  // If this assertion holds, the test is PASSED; otherwise it FAILS as failed login.
  await expect(page, 'Failed login: user was not redirected to inventory page')
    .toHaveURL(/.*inventory.html/);
  await expect(page.locator('.title'), 'Failed login: Products page not shown')
    .toHaveText('Products');
});
