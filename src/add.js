/**
 * Adds two numbers together
 * @param {number} a - The first number
 * @param {number} b - The second number
 * @returns {number} The sum of a and b
 */
function add(a, b) {
  return a + b;
}

/**
 * Multiplies two numbers together
 * @param {number} a - The first number
 * @param {number} b - The second number
 * @returns {number} The product of a and b
 */
function multiply(a, b) {
  return a * b;
}

// Export for use in other modules
module.exports = { add, multiply };

// Example usage
if (require.main === module) {
  const num1 = 5;
  const num2 = 10;
  
  console.log('=== Addition Examples ===');
  const addResult = add(num1, num2);
  console.log(`${num1} + ${num2} = ${addResult}`);
  console.log(`100 + 250 = ${add(100, 250)}`);
  console.log(`-15 + 30 = ${add(-15, 30)}`);
  console.log(`3.14 + 2.86 = ${add(3.14, 2.86)}`);
  
  console.log('\n=== Multiplication Examples ===');
  const multiplyResult = multiply(num1, num2);
  console.log(`${num1} * ${num2} = ${multiplyResult}`);
  console.log(`100 * 250 = ${multiply(100, 250)}`);
  console.log(`-15 * 30 = ${multiply(-15, 30)}`);
  console.log(`3.14 * 2.86 = ${multiply(3.14, 2.86)}`);
}
