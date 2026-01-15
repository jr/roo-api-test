import * as assert from 'assert';
import { reverseString } from '../utils/reverseString';

suite('reverseString Test Suite', () => {
	test('should reverse a simple string', () => {
		assert.strictEqual(reverseString('hello'), 'olleh');
	});

	test('should reverse a string with spaces', () => {
		assert.strictEqual(reverseString('hello world'), 'dlrow olleh');
	});

	test('should reverse numbers', () => {
		assert.strictEqual(reverseString('12345'), '54321');
	});

	test('should handle empty string', () => {
		assert.strictEqual(reverseString(''), '');
	});

	test('should handle single character', () => {
		assert.strictEqual(reverseString('a'), 'a');
	});

	test('should reverse string with special characters', () => {
		assert.strictEqual(reverseString('hello!@#'), '#@!olleh');
	});

	test('should reverse string with mixed case', () => {
		assert.strictEqual(reverseString('HeLLo'), 'oLLeH');
	});

	test('should reverse string with punctuation', () => {
		assert.strictEqual(reverseString('hello, world!'), '!dlrow ,olleh');
	});

	test('should reverse palindrome', () => {
		assert.strictEqual(reverseString('racecar'), 'racecar');
	});

	test('should handle string with tabs and newlines', () => {
		assert.strictEqual(reverseString('hello\tworld\n'), '\ndlrow\tolleh');
	});

	test('should reverse Unicode characters', () => {
		assert.strictEqual(reverseString('😀🎉'), '🎉😀');
	});
});
