import { test, expect } from '@playwright/test';

test('login should fail with wrong password', async ({ page }) => {
  // Step 1: Go to the URL (baseURL = https://www.saucedemo.com)
  await page.goto('/');

  // Step 2: Fill username
  await page.locator('[data-test="username"]').fill('standard_user');

  // Step 3: Fill a WRONG password
  await page.locator('[data-test="password"]').fill('wrong_password');

  // Step 4: Click the Login button
  await page.locator('[data-test="login-button"]').click();

  // Step 5: Verify login FAILED — the error message must appear
  // and the user must stay on the login page (not reach inventory).
  await expect(page.locator('[data-test="error"]')).toContainText(
    'Username and password do not match any user in this service'
  );
  await expect(page).not.toHaveURL(/.*inventory.html/);
});
