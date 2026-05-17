Creating a perfectly formatted markdown file for the user to download.
markdown_content = """# Automation Testing Assignment (Module 15)
Overview
This project contains UI Automation Testing (Playwright) and API Automation Testing (Postman + Newman) for:
UI Target: SauceDemo
API Target: ReqRes API
The project is built using Node.js and supports both individual and combined test execution.
---
Tech Stack
Playwright (UI Automation)
Postman (API Collection)
Newman (CLI Runner for Postman)
Node.js
---
Project Structure
project-root/
├── tests/
│ ├── ui/
│ │ └── saucedemo.spec.js
│ └── api/
│ └── reqres.spec.js
├── postman/
│ └── reqres_collection.json
├── package.json
└── playwright.config.js

---
Installation
Install Dependencies
```bash
npm install
```
Install Playwright Browsers
```bash
npx playwright install
```

UI Automation Tests (SauceDemo)
Test Scenarios
Q1: Locked Out User
** Login with locked_out_user
** Verify that the appropriate error message is displayed
Q2: Standard User Checkout Flow
** Login with standard_user
** Reset App State
** Add 3 products to the cart
** Complete the checkout process
** Verify the order success message
** Reset App State and log out
Q3: Performance Glitch User Flow
** Login with performance_glitch_user
** Reset App State
** Sort products by name (Z → A)
** Add the first product to the cart
** Complete the checkout process
** Verify the order success message
** Reset App State and log out
