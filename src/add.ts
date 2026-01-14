#!/usr/bin/env node

/**
 * Simple script that adds two numbers provided as command-line arguments
 */

function main(): void {
    const args = process.argv.slice(2);

    if (args.length < 2) {
        console.error('Error: Please provide two numbers to add');
        console.error('Usage: npm run add <number1> <number2>');
        process.exit(1);
    }

    const num1 = parseFloat(args[0]);
    const num2 = parseFloat(args[1]);

    if (isNaN(num1) || isNaN(num2)) {
        console.error('Error: Both arguments must be valid numbers');
        console.error(`Received: "${args[0]}" and "${args[1]}"`);
        process.exit(1);
    }

    const result = num1 + num2;
    console.log(`${num1} + ${num2} = ${result}`);
}

main();
