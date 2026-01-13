const args: string[] = process.argv.slice(2);

const numbers: number[] = args
  .map((arg: string) => parseFloat(arg))
  .filter((num: number) => !isNaN(num));

if (numbers.length === 0) {
  console.log(0);
} else {
  const result: number = numbers.slice(1).reduce((acc: number, num: number) => acc - num, numbers[0]);
  console.log(result);
}
