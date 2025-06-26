// const { BasePage } = require('./base');
// const fs = require('fs');
// const path = require('path');

// class CardRequestPage extends BasePage {
//   constructor(page) {
//     super(page);
//     this.clientCodeInput = '#clientCode';
//     this.nameInput = '#name';
//     this.phoneInput = '#phone';
//     this.cardTypeDropdown = '#cardTypeDropdown';
//     this.paymentTypeDropdown = '#paymentTypeDropdown';
//     this.saveButton = 'button:has-text("Save")';
//     this.newCardButton = 'button:has-text("New Card")';
//     this.approveButton = 'button:has-text("Approve")';
//   }

//   async submitCardRequest(entry) {
//     await this.fillFormField(this.clientCodeInput, entry.clientCode);
//     await this.fillFormField(this.nameInput, entry.name);
//     await this.fillFormField(this.phoneInput, entry.phone);
//     await this.selectDropdown(this.cardTypeDropdown, entry.cardType);
//     await this.selectDropdown(this.paymentTypeDropdown, entry.paymentType);
//     await this.clickButton('Save');
//     await this.verifyElementVisible('.success-message');
//     await this.clickButton('New Card');
//     await this.page.waitForTimeout(4000);
//   }

//   async approveCard(clientCode) {
//     await this.page.click(`tr:has-text("${clientCode}") >> button:has-text("Approve")`);
//     await this.verifyElementVisible('.approval-success');
//   }

//   async loadCsvData(csvPath) {
//     const csvData = fs.readFileSync(path.resolve(__dirname, csvPath), 'utf-8').split('\n').slice(1);
//     return csvData.map(row => {
//       const [clientCode, name, phone, cardType, paymentType] = row.split(',');
//       return { clientCode, name, phone, cardType, paymentType };
//     });
//   }
// }

// module.exports = { CardRequestPage };
