import { test, expect } from '@playwright/test';
import { faker } from '@faker-js/faker';

test('homepage has correct title', async ({ page }) => {
  await page.goto('https://demowebshop.tricentis.com');
  await expect(page).toHaveTitle(/Demo Web Shop/);
});

test('user can register, add a random product to cart, and verify it', async ({ page }) => {
  // === 🔹 Generate User Data ===
  const firstName = faker.person.firstName();
  const lastName = faker.person.lastName();
  const gender = faker.person.sexType();
  const email = faker.internet.email({ firstName, lastName });
  const password = faker.internet.password({ length: 10 });

  // === 🔹 Navigate & Register ===
  await page
    .goto('https://demowebshop.tricentis.com')
    .then(() => page.click('text=Register'))
    .then(() => page.click(gender === 'female' ? '#gender-female' : '#gender-male'))
    .then(() => page.fill('#FirstName', firstName))
    .then(() => page.fill('#LastName', lastName))
    .then(() => page.fill('#Email', email))
    .then(() => page.fill('#Password', password))
    .then(() => page.fill('#ConfirmPassword', password))
    .then(() => page.click('#register-button'));

  // === 🔹 Verify Registration Success ===
  await expect(page.locator('.result')).toHaveText('Your registration completed');
  await page.click('input.button-1.register-continue-button');
  await expect(page.getByRole('link', { name: email })).toBeVisible();

  // === 🔹 Navigate to Digital Downloads ===
  await page.click('a[href="/digital-downloads"]');
  await expect(page).toHaveURL(/.*\/digital-downloads/);
  await page.waitForSelector('.item-box');

  // === 🔹 Select & Add Random Product ===
  const productBoxes = await page.locator('.item-box').all();
  const randomIndex = Math.floor(Math.random() * productBoxes.length);
  const randomProduct = productBoxes[randomIndex];

  const productName = await randomProduct.locator('.product-title a').innerText();
  await randomProduct.locator('input.button-2.product-box-add-to-cart-button').click();

  await expect(page.locator('.loading-image')).toBeVisible();
  await expect(page.locator('.loading-image')).toBeHidden();

  // === 🔹 Verify Success Message ===
  await expect(page.locator('p.content')).toContainText('The product has been added to your');

  // === 🔹 Hover Mini-Cart & Verify Product ===
  await page.hover('a.ico-cart');
  await expect(page.locator('.mini-shopping-cart')).toBeVisible();
  await expect(page.locator('.mini-shopping-cart .name')).toContainText(productName);

  // === 🔹 Go to Full Cart & Verify Product + Quantity ===
  await page.click('a[href="/cart"]');
  await expect(page.locator('h1')).toHaveText('Shopping cart');
  await expect(page.locator('.cart-item-row .product-name')).toHaveText(productName);

  const actualQuantity = await page.locator('.cart-item-row input.qty-input').inputValue();
  expect(actualQuantity).toBe("1");
});
