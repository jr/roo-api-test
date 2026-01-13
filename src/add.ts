const args: string[] = process.argv.slice(2);

const sum: number = args
  .map((arg: string) => parseFloat(arg))
  .filter((num: number) => !isNaN(num))
  .reduce((acc: number, num: number) => acc + num, 0);

console.log(sum);
