# QA interview Mission

## 🔹 Test Purpose

validates that a user can:

- Sign up on [Demo Web Shop](https://demowebshop.tricentis.com)
- Add a random digital product to their cart
- Make sure the product name and quantity are right in both the mini cart and the full cart

---

## 🔹 Preconditions

- The website [Demo Web Shop](https://demowebshop.tricentis.com) needs to be online
- The **Digital Downloads** section should have at least one product
- You need to have [Playwright](https://playwright.dev/) and [Faker.js](https://github.com/faker-js/faker) installed
- The browser should start fresh (no cookies or saved sessions)

> A fresh browser makes sure there’s no old user info or cart data that could mess up the test.

---

## 🔹 Steps to Execute

### 1. Open the website
- Go to: `https://demowebshop.tricentis.com`
- Check that the page title includes **"Demo Web Shop"**

### 2. Register a new user
- Use Faker to make a random first name, last name, gender, email, and password
- Go to the **Register** page
- Fill in and send the form
- Make sure you see the success message: **"Your registration completed"**
- Click **Continue**
- Check that the email shows up in the top bar (means you're logged in)

### 3. Go to Digital Downloads
- Click on **"Digital downloads"**
- Make sure the URL contains `/digital-downloads`

### 4. Pick a random product and add it to the cart
- Wait until all products are loaded
- Pick one at random and save its name
- Click **Add to cart**
- Check that:
  - The loading spinner shows and then goes away
  - A success message says the product was added

### 5. Check mini cart
- Hover over the cart icon
- Make sure the product name is there

### 6. Check full cart
- Click the shopping cart link
- Make sure the title says **"Shopping cart"**
- Check that:
  - Product name matches
  - Quantity is **"1"**

---

## 🔹 Post-Conditions

- No cleanup needed unless you want to reset the site
- The test user and cart item will stay unless you remove them
- You can clear the browser context to start fresh next time

---

## 🔹 Validation Criteria

| What to check | What it should show |
|---------------|---------------------|
| Page title    | Should say "Demo Web Shop" |
| Registration  | Should show success message |
| Header        | Should show user’s email |
| Add to cart   | Should show success message |
| Mini-cart     | Should show the product name |
| Cart page     | Product name should match, and quantity is `1` |

✅ **Passes** if everything above works  
❌ **Fails** if something doesn’t match or is missing

---

> Test made with 💙 using **Playwright** and **Faker**
