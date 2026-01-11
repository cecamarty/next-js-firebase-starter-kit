import { test, expect } from '@playwright/test';

// Generate a random email to ensure isolation between test runs if data persists (though emulators usually reset)
const randomId = Math.random().toString(36).substring(7);
const testUser = {
  email: `test-${randomId}@example.com`,
  password: 'password123',
};

test.describe('Authentication Flow', () => {
  
  test('Protected Route Guard: Redirects unauthenticated user to login', async ({ page }) => {
    // 1. Try to visit dashboard directly
    await page.goto('/dashboard');
    
    // 2. Should be redirected to login
    await expect(page).toHaveURL(/\/login/);
    await expect(page.getByRole('heading', { name: /Welcome back/i })).toBeVisible();
  });

  test('Sign Up Flow: Creates account and redirects to dashboard', async ({ page }) => {
    await page.goto('/signup');

    // 1. Fill out the signup form
    await page.getByLabel('Email').fill(testUser.email);
    await page.getByLabel('Password', { exact: true }).fill(testUser.password);
    await page.getByLabel('Confirm').fill(testUser.password);

    // 2. Submit
    await page.getByRole('button', { name: /Create Account/i }).click();

    // 3. Verify redirection to dashboard
    // Note: The first load might take a moment due to cold starts
    await expect(page).toHaveURL(/\/dashboard/, { timeout: 15000 });
    
    // 4. Verify dashboard content (e.g. checking for a sidebar or header)
    // Adjust this selector based on your actual dashboard UI
    await expect(page.locator('aside')).toBeVisible(); 
  });

  test('Login Flow: Happy path with valid credentials', async ({ page }) => {
    // We assume the user exists from the previous test or we could create a new one. 
    // For simplicity in this file, let's reuse the user created above or create a fresh one if tests run in parallel.
    // *If tests run in parallel, order isn't guaranteed, so we should really sign up AGAIN or use a unique user per test.*
    // Let's use a unique user for this test to be safe and independent.
    const loginUser = {
        email: `login-${Math.random().toString(36).substring(7)}@example.com`,
        password: 'password123'
    };

    // --- Pre-step: Create the user first via UI (or API if we had one) ---
    await page.goto('/signup');
    await page.getByLabel('Email').fill(loginUser.email);
    await page.getByLabel('Password', { exact: true }).fill(loginUser.password);
    await page.getByLabel('Confirm').fill(loginUser.password);
    await page.getByRole('button', { name: /Create Account/i }).click();
    await expect(page).toHaveURL(/\/dashboard/);
    
    // --- Now perform the actual Login Test ---
    // 1. Logout first (or clear cookies) to start clean
    await page.context().clearCookies();
    await page.goto('/login');

    // 2. Fill Login Form
    await page.getByLabel('Email').fill(loginUser.email);
    await page.getByLabel('Password').fill(loginUser.password);
    
    // 3. Submit
    await page.getByRole('button', { name: /Login/i }).click();

    // 4. Verify Dashboard access
    await expect(page).toHaveURL(/\/dashboard/);
  });

  test('Invalid Credentials: Shows error message', async ({ page }) => {
    await page.goto('/login');

    // 1. Enter wrong password
    await page.getByLabel('Email').fill(testUser.email); // User exists but password wrong
    await page.getByLabel('Password').fill('wrong-password');
    
    // 2. Submit
    await page.getByRole('button', { name: /Login/i }).click();

    // 3. Verify Error Toast or Message
    // Expecting "Invalid email or password" or similar from your toast/UI
    await expect(page.getByText(/Invalid email or password/i)).toBeVisible();
    
    // 4. Ensure we are still on login
    await expect(page).toHaveURL(/\/login/);
  });

  test('Logout Flow: Clears session and redirects', async ({ page }) => {
    // 1. Setup: Register and Login
    const logoutUser = {
        email: `logout-${Math.random().toString(36).substring(7)}@example.com`,
        password: 'password123'
    };
    await page.goto('/signup');
    await page.getByLabel('Email').fill(logoutUser.email);
    await page.getByLabel('Password', { exact: true }).fill(logoutUser.password);
    await page.getByLabel('Confirm').fill(logoutUser.password);
    await page.getByRole('button', { name: /Create Account/i }).click();
    await expect(page).toHaveURL(/\/dashboard/);

    // 2. Perform Logout
    // The user menu button contains the user's email
    await page.getByRole('button', { name: logoutUser.email }).click();
    // Wait for dropdown and click Log out
    await page.getByRole('menuitem', { name: /Log out/i }).click();

    // 3. Verify Redirection to Login
    await expect(page).toHaveURL(/\/login/);

    // 4. Verify Access Denied (Double Check)
    await page.goto('/dashboard');
    await expect(page).toHaveURL(/\/login/);
  });

});
