import { test, expect } from '@playwright/test';
import { faker } from '@faker-js/faker';

/**
 * 🔹 Test Purpose
The purpose of this test is to validate that a new user can successfully register on Demo Web Shop, add a randomly selected digital product to their shopping cart, and confirm the correct product name and quantity are present in both the mini cart and the full shopping cart page.

🔹 Preconditions
No prior registration required (user will be generated dynamically)
Demo Web Shop (https://demowebshop.tricentis.com) must be online and accessible
The Digital Downloads section must contain at least one product
Playwright and Faker libraries are properly installed and configured
Browser context is fresh (no cookies or session data)
🔹 Steps to Execute
Go to the homepage

Navigate to https://demowebshop.tricentis.com
Verify the page title contains “Demo Web Shop”
Register a new user

Generate a random first name, last name, gender, email, and password
Navigate to the registration page
Fill out and submit the registration form
Verify the success message: “Your registration completed”
Click “Continue” to proceed to the homepage
Verify that the user’s email appears in the header
Navigate to the Digital Downloads section

Click on the "Digital downloads" link
Verify the URL contains /digital-downloads
Select and add a random product to the cart

Wait for all product items to load
Pick a random product and store its name
Click “Add to cart”
Verify the loading spinner appears and disappears
Verify the success message confirms the product was added
Verify product in the mini shopping cart

Hover over the cart icon
Verify that the mini-cart appears and contains the correct product name
Verify product in the full cart

Click the shopping cart link
Confirm the cart page title is “Shopping cart”
Verify the product name in the cart matches the one added
Verify the quantity is “1”
🔹 Post-Conditions
No cleanup is required unless the environment needs to be reset between tests
Test data (user account, cart item) will persist unless manually removed
Browser context can be cleared if needed to start fresh for subsequent tests
🔹 Validation Criteria
Page title includes “Demo Web Shop” on landing
Registration completes and shows confirmation message
Email appears in header after registration
Product is successfully added to cart with confirmation message
Product name appears in both mini-cart and full cart
Quantity shown in cart is exactly "1"
✅ Test Passes if all of the above validation points succeed
❌ Test Fails if any of the expectations (title, text, quantity, etc.) do not match the expected outcome
 */

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
