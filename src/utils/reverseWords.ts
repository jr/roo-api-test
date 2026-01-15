/**
 * Reverses the order of words in a string.
 * Words are separated by whitespace characters.
 * 
 * @param input - The string containing words to reverse
 * @returns A new string with words in reversed order
 * 
 * @example
 * reverseWords("hello world") // returns "world hello"
 * reverseWords("  one  two  three  ") // returns "three two one"
 * reverseWords("single") // returns "single"
 * reverseWords("") // returns ""
 */
export function reverseWords(input: string): string {
    if (!input || input.trim().length === 0) {
        return "";
    }

    // Split by whitespace, filter out empty strings, reverse, and join with space
    return input
        .trim()
        .split(/\s+/)
        .reverse()
        .join(" ");
}
