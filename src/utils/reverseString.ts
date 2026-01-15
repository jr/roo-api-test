/**
 * Reverses a string character by character.
 * Properly handles Unicode characters including emojis.
 *
 * @param input - The string to reverse
 * @returns A new string with characters in reversed order
 *
 * @example
 * reverseString("hello") // returns "olleh"
 * reverseString("hello world") // returns "dlrow olleh"
 * reverseString("12345") // returns "54321"
 * reverseString("") // returns ""
 * reverseString("😀🎉") // returns "🎉😀"
 */
export function reverseString(input: string): string {
    if (!input) {
        return "";
    }

    // Use Array.from to properly handle multi-byte Unicode characters
    return Array.from(input).reverse().join("");
}
