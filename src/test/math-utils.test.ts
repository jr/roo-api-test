import * as assert from 'assert';
import { add, subtract, multiply, divide } from '../math-utils';

suite('Math Utils Test Suite', () => {
	test('add: should correctly add two positive numbers', () => {
		assert.strictEqual(add(2, 3), 5);
	});

	test('add: should correctly add negative numbers', () => {
		assert.strictEqual(add(-2, -3), -5);
	});

	test('add: should correctly add positive and negative numbers', () => {
		assert.strictEqual(add(5, -3), 2);
	});

	test('add: should handle zero', () => {
		assert.strictEqual(add(0, 5), 5);
		assert.strictEqual(add(5, 0), 5);
	});

	test('subtract: should correctly subtract two positive numbers', () => {
		assert.strictEqual(subtract(5, 3), 2);
	});

	test('subtract: should correctly subtract negative numbers', () => {
		assert.strictEqual(subtract(-2, -3), 1);
	});

	test('subtract: should correctly subtract positive and negative numbers', () => {
		assert.strictEqual(subtract(5, -3), 8);
	});

	test('subtract: should handle zero', () => {
		assert.strictEqual(subtract(5, 0), 5);
		assert.strictEqual(subtract(0, 5), -5);
	});

	test('multiply: should correctly multiply two positive numbers', () => {
		assert.strictEqual(multiply(2, 3), 6);
	});

	test('multiply: should correctly multiply negative numbers', () => {
		assert.strictEqual(multiply(-2, -3), 6);
		assert.strictEqual(multiply(-2, 3), -6);
	});

	test('multiply: should handle zero', () => {
		assert.strictEqual(multiply(0, 5), 0);
		assert.strictEqual(multiply(5, 0), 0);
	});

	test('divide: should correctly divide two positive numbers', () => {
		assert.strictEqual(divide(6, 3), 2);
	});

	test('divide: should correctly divide negative numbers', () => {
		assert.strictEqual(divide(-6, -3), 2);
		assert.strictEqual(divide(-6, 3), -2);
	});

	test('divide: should handle decimal results', () => {
		assert.strictEqual(divide(5, 2), 2.5);
	});

	test('divide: should throw error when dividing by zero', () => {
		assert.throws(
			() => divide(5, 0),
			{
				name: 'Error',
				message: 'Division by zero is not allowed'
			}
		);
	});
});
