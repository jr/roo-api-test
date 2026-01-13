# Plan: Create Addition Script

## Overview

Create a TypeScript script (`src/add.ts`) that accepts numeric arguments from the command line, adds them together, and prints the result.

## Context

This project already has:
- An existing `src/subtract.ts` script that serves as the reference pattern
- npm scripts configured in `package.json` for both `add` and `subtract` commands
- TypeScript compilation configured to output to `out/` directory

## Implementation Details

### File to Create

**`src/add.ts`**

```typescript
const args: string[] = process.argv.slice(2);

const numbers: number[] = args
  .map((arg: string) => parseFloat(arg))
  .filter((num: number) => !isNaN(num));

if (numbers.length === 0) {
  console.log(0);
} else {
  const result: number = numbers.reduce((acc: number, num: number) => acc + num, 0);
  console.log(result);
}
```

### Logic Breakdown

1. **Parse arguments**: Extract command line arguments using `process.argv.slice(2)` to skip node executable and script path
2. **Convert to numbers**: Map each string argument to a float using `parseFloat`
3. **Filter invalid values**: Remove any NaN values from non-numeric inputs
4. **Calculate result**:
   - If no valid numbers provided, output `0`
   - Otherwise, sum all numbers using `reduce` with initial value of `0`
5. **Output**: Print the result to stdout

### Key Differences from subtract.ts

| Aspect | subtract.ts | add.ts |
|--------|-------------|--------|
| Initial value | First number | `0` |
| Operation | Subtraction (`acc - num`) | Addition (`acc + num`) |
| Reduce input | `numbers.slice(1)` | All `numbers` |

The addition script is simpler because addition is commutative and associative, so we can start with 0 and add all numbers without special handling.

## Usage

After compilation (`npm run compile`):

```bash
# Using npm script
npm run add -- 1 2 3 4 5
# Output: 15

# Direct execution
node out/add.js 10 20 30
# Output: 60

# With decimals
node out/add.js 1.5 2.5 3.0
# Output: 7

# With invalid inputs (filtered out)
node out/add.js 1 foo 2 bar 3
# Output: 6

# No arguments
node out/add.js
# Output: 0
```

## Tasks

- [ ] Create `src/add.ts` following the pattern above
- [ ] Compile with `npm run compile`
- [ ] Test the script with various inputs
- [ ] Commit changes to a feature branch
- [ ] Create pull request

## Notes

- The npm script `"add": "node out/add.js"` is already configured in package.json
- No additional dependencies required
- Follows existing project patterns and TypeScript configuration
