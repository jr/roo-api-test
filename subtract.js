// Simple script to subtract two numbers from command line arguments
// Usage: node subtract.js <num1> <num2>

// Get command line arguments (skip first 2 which are 'node' and script path)
const args = process.argv.slice(2);

// Check if we have exactly 2 arguments
if (args.length !== 2) {
  console.error('Usage: node subtract.js <num1> <num2>');
  process.exit(1);
}

// Parse arguments as numbers
const num1 = parseFloat(args[0]);
const num2 = parseFloat(args[1]);

// Check if both are valid numbers
if (isNaN(num1) || isNaN(num2)) {
  console.error('Error: Both arguments must be valid numbers');
  process.exit(1);
}

// Subtract the numbers and print the result
const result = num1 - num2;
console.log(result);
