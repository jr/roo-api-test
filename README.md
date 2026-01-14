# roo-api-test

Very simple extension for doing basic testing of the roo code extension api.

## Add Script

A command-line utility to add two numbers.

### Usage

```bash
npm run add <number1> <number2>
```

### Examples

```bash
# Add two positive integers
npm run add 5 3
# Output: 5 + 3 = 8

# Add decimal numbers
npm run add 3.14 2.86
# Output: 3.14 + 2.86 = 6

# Add negative numbers
npm run add -10 15
# Output: -10 + 15 = 5
```

### Prerequisites

Before running the script, compile the TypeScript files:

```bash
npm run compile
```