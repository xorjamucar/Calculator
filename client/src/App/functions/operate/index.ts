import { math } from "../reducer";
export function operate(
  firstValue: math.BigNumber,
  secondValue: math.BigNumber | null,
  operand: "" | "+" | "-" | "÷" | "×"
): math.BigNumber {
  const second = secondValue === null ? firstValue : secondValue;
  let result = second;
  switch (operand) {
    case "+":
      result = math.add(firstValue, second);
      break;
    case "-":
      result = math.subtract(firstValue, second);
      break;
    case "÷":
      if (math.isZero(second) && math.isZero(firstValue))
        throw "Result is undefined";
      else if (math.isZero(second)) throw "Cannot divide by zero";
      result = math.bignumber(math.format(math.divide(firstValue, second)));
      break;
    case "×":
      result = math.bignumber(math.format(math.multiply(firstValue, second)));
      break;
  }
  if (math.equal(result, Infinity)) throw "Overflow";
  return result;
}
