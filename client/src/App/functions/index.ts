import { all, create } from "mathjs";

export enum Operand {
  Sum = "+",
  Sub = "-",
  Div = "÷",
  Mult = "×",
  Null = "",
}

export var operandMap = new Map([
  [Operand.Sum, "+"],
  [Operand.Sub, "-"],
  [Operand.Div, "/"],
  [Operand.Mult, "*"],
]);

interface OperationHandlerReturn {
  result: string;
  op: string;
}
var math = create(all, { number: "BigNumber", precision: 16 });
// math.config({ number: "BigNumber", precision: 16 });
export function handleOperation(
  input: number,
  previousNumber: number,
  o: Operand
): OperationHandlerReturn {
  var mathOperand = operandMap.get(o);
  if (previousNumber === 0 && input === 0 && o === Operand.Div) {
    return {
      result: "Result is Undefined",
      op: `${previousNumber} ${o}`,
    };
  } else if (input === 0 && o === Operand.Div)
    return { result: "Cannot devide by zero", op: `${previousNumber} ${o}` };
  else if (!mathOperand) return { result: "" + input, op: input + "=" };
  const result: number = math.evaluate(
    `${previousNumber}  ${mathOperand} ${input}`
  );
  let parsedResult = result.toFixed(16);
  result >= 10 ** 16 && (parsedResult = result.toExponential());
  let prev = previousNumber.toString();
  previousNumber >= 10 ** 16 && (prev = previousNumber.toExponential());
  const op = `${prev} ${o} ${input} =`;
  return {
    result: parsedResult,
    op: op,
  };
}

export function removeCommas(x: string) {
  let r = Number(x.replace(/,/g, ""));
  return r;
}
export function integerLengthLimiter(x: string, newNumber: string) {
  let currentNumber = Number(x);
  x.length < 16 && (currentNumber = currentNumber * 10 + Number(newNumber));
  return currentNumber.toString();
}

export function decimalLengthLimiter(
  integerPart: string,
  decimalPart: string,
  newNumber: string
) {
  const currentLength =
    integerPart.length * Number(integerPart !== "0") + decimalPart.length;
  let newValue = integerPart + "." + decimalPart;
  currentLength < 16 && (newValue += newNumber);
  return newValue;
}
