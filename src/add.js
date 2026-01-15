/**
 * Adds two numbers together
 * @param {number} a - The first number
 * @param {number} b - The second number
 * @returns {number} The sum of a and b
 */
function add(a, b) {
  return a + b;
}

// Export for use in other modules
module.exports = { add };

// Example usage
if (require.main === module) {
  const num1 = 5;
  const num2 = 10;
  const result = add(num1, num2);
  console.log(`${num1} + ${num2} = ${result}`);
}
