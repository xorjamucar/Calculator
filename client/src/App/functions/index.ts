import { all, create, exp, number } from "mathjs";

export enum Operand {
  Sum = "+",
  Sub = "-",
  Div = "÷",
  Mult = "×",
  Null = "",
}
var math = create(all, { number: "BigNumber" });
export var operandMap = new Map([
  [Operand.Sum, "+"],
  [Operand.Sub, "-"],
  [Operand.Div, "/"],
  [Operand.Mult, "*"],
]);

// input limiting functions
export function integerLengthLimiter(currentNumber: number, newNumber: number) {
  if (currentNumber >= 10 ** 16) return currentNumber;
  return currentNumber * 10 + newNumber;
}

export function decimalLengthLimiter(
  integerPart: string,
  decimalPart: string,
  newNumber: string
) {
  const length =
    16 - integerPart.length * Number(integerPart !== "0") - decimalPart.length;
  if (length === 0) return decimalPart;
  return decimalPart + newNumber;
}

export function inputLimiter(input: string, n: string) {
  let numberSplit = input.split(".");
  const integerPart = numberSplit.shift() || "";
  let newNumber = Number(integerPart);
  numberSplit.length === 0 &&
    (newNumber = integerLengthLimiter(newNumber, Number(n)));
  let decimalPart = "";
  if (numberSplit.length === 1)
    decimalPart = "." + decimalLengthLimiter(integerPart, numberSplit[0], n);
  const newInput = newNumber + decimalPart;
  newNumber = math.evaluate(`${newNumber}${decimalPart}`);
  return { newInput, newNumber };
}

// formating functions
export function addCommas(x: number) {
  return x.toLocaleString("en-US", {
    maximumFractionDigits: 15,
  });
}

export function formatDecimal(result: string) {
  let reversedString = result.split("").reverse();
  for (let index = 0; index < reversedString.length; index++) {
    const element = reversedString[index];
    if (element !== "0") break;
    reversedString.shift();
  }
  return reversedString.reverse().join("");
}
export function formatExponential(result: string) {
  const expoSplit = result.split("e");
  const expoNumber = Number(expoSplit[1]);
  const numberSplit = expoSplit[0].split(".");
  let integerPart = numberSplit.shift() || "";
  let decimalPart = numberSplit[0].substring(0, 15);
  const numberIsInt = Number(expoNumber >= 0);
  const numberIsDec = Number(expoNumber < 0);
  const integerPartIsZero = Number(integerPart === "0");
  const belongsToInteger = decimalPart.substring(0, expoNumber * numberIsInt);
  integerPart += belongsToInteger;
  const belongsToDecimal = new Array(
    math.abs(expoNumber) * numberIsDec + 1
  ).join("0");
  decimalPart += belongsToDecimal;
  console.log(decimalPart);
}

export function resultFormating(result: number) {
  // formatExponential(result.toExponential(15));
  // return result.toExponential(15);
  return parseFloat(result.toFixed(16));
}
