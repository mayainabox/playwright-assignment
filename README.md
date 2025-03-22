# 🎯 QA Interview Mission – Playwright Test for Demo Web Shop

This project automates a full user flow using [Playwright](https://playwright.dev/) and [Faker.js](https://github.com/faker-js/faker), including user registration and cart validation on [Demo Web Shop](https://demowebshop.tricentis.com).

---

## 🔹 Test Purpose

Validate that a user can:

- Sign up on the site
- Add a random digital product to the cart
- Verify the product and quantity in both the **mini cart** and the **full shopping cart**

---

## 🔹 Preconditions

- The website [Demo Web Shop](https://demowebshop.tricentis.com) is accessible
- The **Digital Downloads** section has at least one product
- [Playwright](https://playwright.dev/) and [Faker.js](https://github.com/faker-js/faker) are installed
- The browser context must be fresh (no cookies/session data)

> A fresh browser ensures no leftover data affects the test (e.g. previous logins or cart items).

---

## 🔹 Steps to Execute

### 1. Open the Website
- Navigate to `https://demowebshop.tricentis.com`
- Verify the title contains **"Demo Web Shop"**

### 2. Register a New User
- Generate random data using Faker (name, email, password, etc.)
- Fill and submit the registration form
- Check success message: **"Your registration completed"**
- Click **Continue**
- Confirm the email appears in the header

### 3. Navigate to Digital Downloads
- Click **"Digital downloads"**
- Verify the URL contains `/digital-downloads`

### 4. Add Random Product to Cart
- Wait for product list to load
- Pick a random product and save its name
- Click **Add to cart**
- Confirm spinner shows and disappears
- Confirm success message appears

### 5. Verify in Mini Cart
- Hover over the cart icon
- Check that the product name is shown

### 6. Verify in Full Cart
- Go to the **shopping cart** page
- Check:
  - Title is **"Shopping cart"**
  - Product name matches
  - Quantity is **1**

---

## 🔹 Post-Conditions

- No cleanup required unless test data needs to be removed
- Test user and cart items will persist until cleared manually
- Browser session can be cleared between runs

---

## 🔹 Validation Criteria

| What to Check     | Expected Result                           |
|-------------------|-------------------------------------------|
| Page title        | Contains "Demo Web Shop"                  |
| Registration      | Shows confirmation message                |
| Header            | Displays user’s email                     |
| Add to cart       | Shows success message                     |
| Mini-cart         | Displays correct product name             |
| Cart page         | Product matches and quantity is "1"       |

✅ **Test passes** if all validations succeed  
❌ **Test fails** if any validation does not match the expected result

---

## 🚀 How to Run the Tests

### 📦 1. Install dependencies

```bash
npm install
npx playwright install
```

### ▶️ 2. Run all tests

```bash
npx playwright test
```

### 🔍 3. Run a specific test file

```bash
npx playwright test tests/your-test-file.spec.ts
```

### 🧪 4. View the HTML report

```bash
npx playwright show-report
```

### 🔧 Project Setup (Optional)

```bash
git clone https://github.com/YOUR_USERNAME/playwright-assignment.git
cd playwright-assignment
npm install
npx playwright install
```


Automated with 💙 using Playwright and Faker