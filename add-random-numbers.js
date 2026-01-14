// Simple script that adds two random numbers and prints the result

// Generate two random numbers between 1 and 100
const number1 = Math.floor(Math.random() * 100) + 1;
const number2 = Math.floor(Math.random() * 100) + 1;

// Add the numbers
const sum = number1 + number2;

// Print the result
console.log(`Number 1: ${number1}`);
console.log(`Number 2: ${number2}`);
console.log(`Sum: ${sum}`);
