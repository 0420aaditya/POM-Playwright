FEWA CCMS Playwright Testing Framework 🚀
   
Welcome to the FEWA CCMS Testing Framework, a robust and modular Playwright-based test suite for automating end-to-end testing of the FEWA Card Content Management System (CCMS). Built with the Page Object Model (POM) architecture, this framework ensures reusability, maintainability, and scalability for testing complex workflows like card requests, approvals, dispatch, and dispute management. 🌟

📋 Table of Contents

Features
Project Structure
Prerequisites
Installation
Configuration
Running Tests
Test Data
Contributing
License


✨ Features

Page Object Model (POM): Modular classes for pages (e.g., LoginPage, CardRequestPage) to reduce code duplication. 📚
Session Management: Role-based sessions (branch user, reviewer, bank admin) using Playwright's storageState. 🔒
Reusable UI Actions: Centralized methods for form filling, dropdowns, and button clicks via BasePage. 🛠️
CSV Data-Driven Testing: Dynamic test data loading from CSV files for card entries. 📊
Error Handling: Robust try-catch blocks for reliable test execution. ⚠️
Single Worker Execution: Prevents conflicts for unique data (e.g., client code C12358). 🚀
Configurable Iterations: Control test runs via command-line arguments (e.g., npx playwright test -- 2). ⚙️


📂 Project Structure
tests/
├── pages/                    # Page Object Model classes
│   ├── basePage.js           # Common navigation and UI methods
│   ├── loginPage.js          # Login page actions
│   ├── cardRequestPage.js    # Card request and approval actions
│   ├── dashboardPage.js      # Dashboard validations
│   ├── cardDispatchPage.js   # Card dispatch and activation
│   ├── disputeManagementPage.js # Dispute management actions
├── data/                     # Test data files
│   ├── testData.csv          # CSV for card entry data
│   ├── users.json            # Role-based credentials
├── utils/                    # Utility modules
│   ├── csvReader.js          # CSV parsing with validation
│   ├── sessionManager.js     # Role-based session management
├── tests/                    # Test suites
│   ├── cardWorkflow.spec.js  # Card request to approval tests
│   ├── dashboard.spec.js     # Dashboard validation tests
├── playwright.config.js      # Playwright configuration
├── README.md                 # Project documentation


🛠 Prerequisites

Node.js v18.x or higher (Download) 🟢
Playwright v1.44.0 (Installation Guide) 🎭
Git for cloning the repository (Download) 🌐
A modern IDE (e.g., VS Code) for editing and running tests 📝


⚙ Installation

Clone the Repository:
git clone https://github.com/your-repo/fewa-ccms-tests.git
cd fewa-ccms-tests


Install Dependencies:
npm install


Install Playwright Browsers:
npx playwright install




🔧 Configuration

Update User Credentials:Edit data/users.json with role-based credentials:
{
  "branchUser": { "username": "sbimaker", "password": "password123" },
  "reviewer": { "username": "sbiadmin", "password": "password456" },
  "bankAdmin": { "username": "bankadmin", "password": "password789" }
}


Prepare Test Data:Update data/testData.csv with card entry data:
ClientCode,Name,Phone,CardType,PaymentType
C12376,Ram Bahadur,9841234567,VISA Classic,Normal Payment
C12377,Sita Kumari,9852345678,VISA Classic,Normal Payment


Playwright Configuration:The playwright.config.js is pre-configured for single-worker execution to avoid conflicts:
module.exports = {
  projects: [{ name: 'chromium', use: { browserName: 'chromium' } }],
  workers: 1,
  timeout: 60000
};




🚀 Running Tests

Generate Sessions:Create session files for each role:
node utils/sessionManager.js

This uses LoginPage to authenticate and save session states to data/<role>_session.json.

Run Tests:Execute the card workflow tests with configurable iterations (e.g., 2 iterations):
npx playwright test tests/cardWorkflow.spec.js --project=chromium --workers=1 -- 2


View Test Reports:After execution, view the HTML report:
npx playwright show-report




📊 Test Data
The framework supports data-driven testing via data/testData.csv. Example format:
ClientCode,Name,Phone,CardType,PaymentType
C12376,Ram Bahadur,9841234567,VISA Classic,Normal Payment
C12377,Sita Kumari,9852345678,VISA Classic,Normal Payment

To add more test data:

Edit data/testData.csv with new rows.
Ensure the CSV matches the expected fields in utils/csvReader.js.


🤝 Contributing
Contributions are welcome! 🎉 Follow these steps:

Fork the Repository:Click the "Fork" button on GitHub.

Create a Branch:
git checkout -b feature/your-feature


Make Changes:Add new page classes, tests, or utilities in the respective directories.

Run Tests:Ensure all tests pass before submitting.

Submit a Pull Request:Push your changes and create a PR with a clear description.


Please adhere to the Code of Conduct and include tests for new features. 🛠️

📜 License
This project is licensed under the MIT License. See the LICENSE file for details.

Built with 💙 by the FEWA CCMS Testing Team
For issues or questions, open a ticket on GitHub or contact the team at support@your-org.com. 🌟
