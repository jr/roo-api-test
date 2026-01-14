/**
 * FizzBuzz implementation
 * 
 * Classic programming challenge that prints numbers from 1 to n, with the following rules:
 * - For multiples of 3, print "Fizz"
 * - For multiples of 5, print "Buzz"
 * - For multiples of both 3 and 5, print "FizzBuzz"
 * - Otherwise, print the number itself
 */

/**
 * Returns the FizzBuzz value for a given number
 * @param num The number to evaluate
 * @returns The FizzBuzz result (either "Fizz", "Buzz", "FizzBuzz", or the number as a string)
 */
export function getFizzBuzzValue(num: number): string {
	if (num % 15 === 0) {
		return "FizzBuzz";
	} else if (num % 3 === 0) {
		return "Fizz";
	} else if (num % 5 === 0) {
		return "Buzz";
	} else {
		return num.toString();
	}
}

/**
 * Generates FizzBuzz sequence from 1 to n
 * @param n The upper limit (inclusive)
 * @returns Array of FizzBuzz results
 */
export function fizzBuzz(n: number): string[] {
	const result: string[] = [];
	for (let i = 1; i <= n; i++) {
		result.push(getFizzBuzzValue(i));
	}
	return result;
}

/**
 * Prints FizzBuzz sequence from 1 to n to console
 * @param n The upper limit (inclusive)
 */
export function printFizzBuzz(n: number): void {
	for (let i = 1; i <= n; i++) {
		console.log(getFizzBuzzValue(i));
	}
}

// Run FizzBuzz for 1-100 if executed directly
if (require.main === module) {
	console.log("FizzBuzz from 1 to 100:");
	printFizzBuzz(100);
}
