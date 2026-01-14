import * as assert from 'assert';
import { getFizzBuzzValue, fizzBuzz } from '../fizzbuzz';

suite('FizzBuzz Test Suite', () => {
	test('getFizzBuzzValue returns "Fizz" for multiples of 3', () => {
		assert.strictEqual(getFizzBuzzValue(3), 'Fizz');
		assert.strictEqual(getFizzBuzzValue(6), 'Fizz');
		assert.strictEqual(getFizzBuzzValue(9), 'Fizz');
		assert.strictEqual(getFizzBuzzValue(12), 'Fizz');
	});

	test('getFizzBuzzValue returns "Buzz" for multiples of 5', () => {
		assert.strictEqual(getFizzBuzzValue(5), 'Buzz');
		assert.strictEqual(getFizzBuzzValue(10), 'Buzz');
		assert.strictEqual(getFizzBuzzValue(20), 'Buzz');
		assert.strictEqual(getFizzBuzzValue(25), 'Buzz');
	});

	test('getFizzBuzzValue returns "FizzBuzz" for multiples of 15', () => {
		assert.strictEqual(getFizzBuzzValue(15), 'FizzBuzz');
		assert.strictEqual(getFizzBuzzValue(30), 'FizzBuzz');
		assert.strictEqual(getFizzBuzzValue(45), 'FizzBuzz');
		assert.strictEqual(getFizzBuzzValue(60), 'FizzBuzz');
	});

	test('getFizzBuzzValue returns the number as string for non-multiples', () => {
		assert.strictEqual(getFizzBuzzValue(1), '1');
		assert.strictEqual(getFizzBuzzValue(2), '2');
		assert.strictEqual(getFizzBuzzValue(4), '4');
		assert.strictEqual(getFizzBuzzValue(7), '7');
		assert.strictEqual(getFizzBuzzValue(11), '11');
	});

	test('fizzBuzz generates correct sequence', () => {
		const result = fizzBuzz(15);
		const expected = [
			'1', '2', 'Fizz', '4', 'Buzz',
			'Fizz', '7', '8', 'Fizz', 'Buzz',
			'11', 'Fizz', '13', '14', 'FizzBuzz'
		];
		assert.deepStrictEqual(result, expected);
	});

	test('fizzBuzz handles edge cases', () => {
		assert.deepStrictEqual(fizzBuzz(0), []);
		assert.deepStrictEqual(fizzBuzz(1), ['1']);
		assert.deepStrictEqual(fizzBuzz(3), ['1', '2', 'Fizz']);
	});
});
