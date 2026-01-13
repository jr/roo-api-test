// Get arguments (skip node and script path)
const args = process.argv.slice(2);

// Convert to numbers and sum
const sum = args
  .map(arg => parseFloat(arg))
  .filter(num => !isNaN(num))
  .reduce((acc, num) => acc + num, 0);

console.log(sum);
