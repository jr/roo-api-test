#!/usr/bin/env node

/**
 * Script to add two numbers provided as command line arguments
 * Usage: node add.js <number1> <number2>
 */

function addNumbers(num1, num2) {
    return num1 + num2;
}

function main() {
    // Get command line arguments (skip first two: node and script path)
    const args = process.argv.slice(2);

    // Check if we have exactly two arguments
    if (args.length !== 2) {
        console.error('Error: Please provide exactly two numbers as arguments');
        console.error('Usage: node add.js <number1> <number2>');
        process.exit(1);
    }

    // Parse the arguments to numbers
    const num1 = parseFloat(args[0]);
    const num2 = parseFloat(args[1]);

    // Validate that both are valid numbers
    if (isNaN(num1)) {
        console.error(`Error: First argument "${args[0]}" is not a valid number`);
        process.exit(1);
    }

    if (isNaN(num2)) {
        console.error(`Error: Second argument "${args[1]}" is not a valid number`);
        process.exit(1);
    }

    // Calculate and print the result
    const result = addNumbers(num1, num2);
    console.log(result);
}

// Run the main function
main();
