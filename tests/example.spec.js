import { test, expect } from '@playwright/test';

test('has title', async ({ page }) => {
  await page.goto('/login');

  // Check that the title contains "Next App" (or your specific title)
  await expect(page).toHaveTitle(/Create Next App/);
});

test('login page loads', async ({ page }) => {
  await page.goto('/login');
  
  // Check for the "Welcome back" heading
  await expect(page.getByRole('heading', { name: /Welcome back/i })).toBeVisible();
});
