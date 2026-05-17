const { test, expect } = require('@playwright/test');

const BASE_URL = 'https://www.saucedemo.com/';

async function login(page, username, password='secret_sauce') {
  await page.goto(BASE_URL);
  await page.locator('[data-test="username"]').fill(username);
  await page.locator('[data-test="password"]').fill(password);
  await page.locator('[data-test="login-button"]').click();
}

async function resetAppState(page) {
  await page.locator('#react-burger-menu-btn').click();
  await page.locator('#reset_sidebar_link').click();
  await page.locator('#react-burger-cross-btn').click();
}

test('Q1 locked user', async ({ page }) => {
  await login(page, 'locked_out_user');
  await expect(page.locator('[data-test="error"]'))
    .toContainText('locked out');
});

test('Q2 standard checkout', async ({ page }) => {
  await login(page, 'standard_user');
  await resetAppState(page);

  const items = [
    'Sauce Labs Backpack',
    'Sauce Labs Bike Light',
    'Sauce Labs Bolt T-Shirt'
  ];

  for (const item of items) {
    await page.locator('.inventory_item')
      .filter({ hasText: item })
      .getByRole('button', { name: 'Add to cart' })
      .click();
  }

  await page.locator('.shopping_cart_link').click();

  await page.locator('[data-test="checkout"]').click();
  await page.locator('[data-test="firstName"]').fill('A');
  await page.locator('[data-test="lastName"]').fill('B');
  await page.locator('[data-test="postalCode"]').fill('1234');

  await page.locator('[data-test="continue"]').click();
  await page.locator('[data-test="finish"]').click();

  await expect(page.locator('.complete-header'))
    .toContainText('Thank you');

  await resetAppState(page);
});

test('Q3 performance user', async ({ page }) => {
  await login(page, 'performance_glitch_user');
  await resetAppState(page);

  await page.locator('[data-test="product-sort-container"]').selectOption('za');

  const first = page.locator('.inventory_item_name').first();
  const name = await first.textContent();

  await page.locator('.inventory_item').first()
    .getByRole('button', { name: 'Add to cart' }).click();

  await page.locator('.shopping_cart_link').click();

  await expect(page.locator('.cart_item')).toContainText(name);

  await page.locator('[data-test="checkout"]').click();
  await page.locator('[data-test="firstName"]').fill('A');
  await page.locator('[data-test="lastName"]').fill('B');
  await page.locator('[data-test="postalCode"]').fill('1234');

  await page.locator('[data-test="continue"]').click();
  await page.locator('[data-test="finish"]').click();

  await expect(page.locator('.complete-header'))
    .toContainText('Thank you');

  await resetAppState(page);
});
