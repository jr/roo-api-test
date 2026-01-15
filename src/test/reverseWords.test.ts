import * as assert from 'assert';
import { reverseWords } from '../utils/reverseWords';

suite('reverseWords Test Suite', () => {
	test('should reverse words in a simple string', () => {
		assert.strictEqual(reverseWords('hello world'), 'world hello');
	});

	test('should reverse words with multiple spaces', () => {
		assert.strictEqual(reverseWords('  one  two  three  '), 'three two one');
	});

	test('should handle single word', () => {
		assert.strictEqual(reverseWords('single'), 'single');
	});

	test('should handle empty string', () => {
		assert.strictEqual(reverseWords(''), '');
	});

	test('should handle string with only whitespace', () => {
		assert.strictEqual(reverseWords('   '), '');
	});

	test('should reverse multiple words', () => {
		assert.strictEqual(reverseWords('the quick brown fox'), 'fox brown quick the');
	});

	test('should handle tabs and newlines', () => {
		assert.strictEqual(reverseWords('hello\tworld\ntest'), 'test world hello');
	});

	test('should preserve word content but reverse order', () => {
		assert.strictEqual(reverseWords('first second third'), 'third second first');
	});

	test('should handle words with special characters', () => {
		assert.strictEqual(reverseWords('hello! world?'), 'world? hello!');
	});

	test('should handle numbers as words', () => {
		assert.strictEqual(reverseWords('1 2 3 4'), '4 3 2 1');
	});
});
