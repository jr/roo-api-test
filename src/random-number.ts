#!/usr/bin/env node

/**
 * Simple script that prints a random number
 */

function printRandomNumber(): void {
    const randomNumber = Math.random();
    console.log(`Random number: ${randomNumber}`);
}

// Run the script
printRandomNumber();
