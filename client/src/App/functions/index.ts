import { evaluate } from "mathjs";

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
  const result: number = evaluate(`${previousNumber}  ${mathOperand} ${input}`);
  var parsedResult = addCommas(result);
  const op = `${previousNumber} ${o} ${input} =`;
  return {
    result: parsedResult,
    op: op,
  };
}

export function addCommas(x: number) {
  return x.toLocaleString("en-US", {
    maximumFractionDigits: 15,
  });
}
export function removeCommas(x: string) {
  let r = Number(x.replace(/,/g, ""));
  return r;
}
