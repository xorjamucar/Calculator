import { all, create } from "mathjs";

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
export function resultFormating(result: number, input: string) {
  const splitNumber = input.split(".");
  const integerPart = splitNumber.shift() || "";
  const represent = Number(integerPart || result);
  let n = integerPart || result.toString();
  represent > 10 ** 2 && (n = addCommas(represent));
  represent > 10 ** 16 && (n = represent.toExponential());
  splitNumber.length > 0 && (n += "." + splitNumber[0]);

  return n;
}
