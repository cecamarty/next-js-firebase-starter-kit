/*
import { test, expect } from '@playwright/test';

// Generate a random email to ensure isolation between test runs
const randomId = () => Math.random().toString(36).substring(7);

test.describe('Authentication Flow', () => {
  
  test('Protected Route Guard: Redirects unauthenticated user to login', async ({ page }) => {
    await page.goto('/dashboard');
    await expect(page).toHaveURL(/\/login/);
    await expect(page.getByRole('heading', { name: /Welcome back/i })).toBeVisible();
  });

  test('Sign Up Flow: Creates account and redirects to dashboard', async ({ page }) => {
    const signupUser = {
        email: `signup-${randomId()}@example.com`,
        password: 'password123'
    };

    await page.goto('/signup');
    await page.getByLabel('Email').fill(signupUser.email);
    await page.locator('input[name="password"]').fill(signupUser.password);
    await page.locator('input[name="confirmPassword"]').fill(signupUser.password);

    await page.getByRole('button', { name: /Create Account/i }).click();

    // Redirection to dashboard
    await expect(page).toHaveURL(/\/dashboard/, { timeout: 20000 });
    
    // Verify dashboard elements (SiteHeader usually has a certain class or role)
    await expect(page.locator('header')).toBeVisible(); 
  });

  test('Login Flow: Happy path with valid credentials', async ({ page }) => {
    const loginUser = {
        email: `login-${randomId()}@example.com`,
        password: 'password123'
    };

    // Pre-step: Signup
    await page.goto('/signup');
    await page.getByLabel('Email').fill(loginUser.email);
    await page.locator('input[name="password"]').fill(loginUser.password);
    await page.locator('input[name="confirmPassword"]').fill(loginUser.password);
    await page.getByRole('button', { name: /Create Account/i }).click();
    await expect(page).toHaveURL(/\/dashboard/);
    
    // Logout to test login
    await page.context().clearCookies();
    await page.goto('/login');

    await page.getByLabel('Email').fill(loginUser.email);
    await page.getByLabel('Password').fill(loginUser.password);
    await page.getByRole('button', { name: /Login/i }).click();

    await expect(page).toHaveURL(/\/dashboard/);
  });

  test('Invalid Credentials: Shows error message', async ({ page }) => {
    await page.goto('/login');
    await page.getByLabel('Email').fill('non-existent@example.com');
    await page.getByLabel('Password').fill('wrong-password');
    await page.getByRole('button', { name: /Login/i }).click();

    // Sonner toasts are often in a list or have specific roles
    await expect(page.locator('text=Invalid email or password')).toBeVisible();
  });

  test('Logout Flow: Clears session and redirects', async ({ page }) => {
    const logoutUser = {
        email: `logout-${randomId()}@example.com`,
        password: 'password123'
    };
    await page.goto('/signup');
    await page.getByLabel('Email').fill(logoutUser.email);
    await page.locator('input[name="password"]').fill(logoutUser.password);
    await page.locator('input[name="confirmPassword"]').fill(logoutUser.password);
    await page.getByRole('button', { name: /Create Account/i }).click();
    await expect(page).toHaveURL(/\/dashboard/);

    // Click user menu button (the one with the email)
    // We use a looser selector in case of formatting
    await page.locator('button').filter({ hasText: logoutUser.email }).click();
    await page.getByRole('menuitem', { name: /Log out/i }).click();

    await expect(page).toHaveURL(/\/login/);
  });

});
*/
