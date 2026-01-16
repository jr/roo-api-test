#!/usr/bin/env node

/**
 * A simple script that adds two numbers and prints the result.
 * Usage: node out/add-numbers.js <number1> <number2>
 */

function addNumbers(a: number, b: number): number {
    return a + b;
}

function main() {
    const args = process.argv.slice(2);
    
    if (args.length !== 2) {
        console.error('Error: Please provide exactly two numbers');
        console.error('Usage: npm run add-numbers <number1> <number2>');
        process.exit(1);
    }
    
    const num1 = parseFloat(args[0]);
    const num2 = parseFloat(args[1]);
    
    if (isNaN(num1) || isNaN(num2)) {
        console.error('Error: Both arguments must be valid numbers');
        process.exit(1);
    }
    
    const result = addNumbers(num1, num2);
    console.log(`${num1} + ${num2} = ${result}`);
}

main();
