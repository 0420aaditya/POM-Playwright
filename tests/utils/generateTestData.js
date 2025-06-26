const { log } = require("console");

function generateTestData() {
  const firstNames = [
    "Zone",
    "John",
    "Lal",
    "Amit",
    "Hira",
    "Saurav",
    "Sneha",
    "Hitesh",
    "Himesh",
    "Ccr",
    "Elen",
    "Rohan",
    "Roshan",
    "Roman",
    "Bikisha",
    "Sarita",
    "Sumit",
    "Basanta",
    "Prem",
    "Suyash",
    "Ram",
    "Diamond",
    "Hira",
    "Binod",
    "Ati",
    "Atma",
    "Achal",
    "Shubham",
    "Sabina",
    "Ramesh",
    "Anita",
    "Suresh",
    "Pooja",
    "Hari",
    "Gita",
    "Bikash",
    "Sita",
    "Sanjay",
    "Pratik",
    "Siddhant",
    "Samyak",
  ];
  const lastNames = [
    "Thakuri",
    "Magar",
    "Shah",
    "Adhikari",
    "Gautam",
    "B.C",
    "Sunar",
    "Shrestha",
    "Thapa",
    "Rai",
    "Gurung",
    "Tamang",
    "Magar",
    "Lama",
    "Karki",
    "Bhandari",
    "Aryal",
    "Gaudel",
    "Poudel",
    "Chhetri",
    "Neupane",
    "Joshi",
    "Jha",
    "Chaudhary",
    "Sakya",
    "Pariyar",
    "Khadka",
    "Singh",
  ];

  const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
  const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];

  // Generate unique customer code (C + 9 digits, ensuring uniqueness with timestamp)
  const timestamp = Date.now().toString().slice(-4);
  const customerCode = `C${Math.floor(
    100000000 + Math.random() * 900000000
  )}${timestamp}`;

  // Generate valid Nepali phone number (starting with 98, followed by 8 digits)
  const phoneNumber = `98${Math.floor(10000000 + Math.random() * 90000000)}`;

  // Generate email in format firstname.lastname@gmail.com
  const email = `${firstName.toLowerCase()}.${lastName.toLowerCase()}@gmail.com`;

  // Generate embossed name in caps
  const embossedName = `${firstName.toUpperCase()} ${lastName.toUpperCase()}`;

  // Generate unique identity number (9 digits with timestamp for uniqueness)
  const identityNumber = `${Math.floor(
    100000000 + Math.random() * 900000000
  )}${timestamp.slice(-2)}`;

  // Generate random credit limit between 15,000 and 500,000
  const creditLimit = generateCreditLimit();

  return {
    customerCode,
    firstName,
    lastName,
    phoneNumber,
    email,
    embossedName,
    identityNumber,
    creditLimit,
  };
  // Reusable credit limit generator
}
function generateCreditLimit() {
  return Math.floor(Math.random() * (500000 - 15000 + 1)) + 15000;
}
module.exports = { generateTestData };
// const test = generateTestData();
// console.log(test);
