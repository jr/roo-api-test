/**
 * A simple script that adds two numbers and prints the result
 */

/**
 * Adds two numbers together
 * @param a First number
 * @param b Second number
 * @returns The sum of a and b
 */
function addNumbers(a: number, b: number): number {
    return a + b;
}

// Example usage
const num1 = 5;
const num2 = 10;
const result = addNumbers(num1, num2);

console.log(`Adding ${num1} + ${num2} = ${result}`);

// Export for potential use in other modules
export { addNumbers };
