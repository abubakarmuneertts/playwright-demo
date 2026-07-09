import { test, expect } from '@playwright/test';

// Only the username comes from env — the password here is intentionally wrong,
// and a fake value is not a secret.
const USERNAME = process.env.SAUCE_USERNAME ?? '';

test('login should fail with wrong password', async ({ page }) => {
  // Step 1: Go to the URL (baseURL = https://www.saucedemo.com)
  await page.goto('/');

  // Step 2: Fill username
  await page.locator('[data-test="username"]').fill(USERNAME);

  // Step 3: Fill a WRONG password
  await page.locator('[data-test="password"]').fill('wrong_password');

  // Step 4: Click the Login button
  await page.locator('[data-test="login-button"]').click();

  // INTENTIONALLY BROKEN FOR DEMO: with a wrong password the user can never
  // reach the inventory page, so this assertion is guaranteed to fail.
  // Revert this to the error-message check after the demo.
  await expect(page).toHaveURL(/.*inventory.html/);
});
