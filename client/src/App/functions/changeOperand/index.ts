import { operate } from "../operate";
import { State, format } from "../reducer";

export default function changeOperand(
  state: State,
  operand: "" | "+" | "-" | "÷" | "×"
): State {
  let s = { ...state };
  s.step = 2;
  try {
    switch (state.step) {
      case 0:
        s.operation.firstFunction = format(state.firstValue);
      case 1:
        s.secondValue = state.firstValue;
        s.operation.operand = operand;
        break;
      case 2:
        s.operation.operand = operand;
        break;
      case 4:
      case 3:
        const result = operate(
          state.firstValue,
          state.secondValue,
          state.operation.operand
        );
        const resultString = format(result);
        s.history = [
          {
            firstFunction: state.operation.firstFunction,
            secondFunction: state.operation.secondFunction,
            result: format(result),
            eq: "=",
            operand: state.operation.operand,
          },
          ...s.history,
        ];
        s.firstValue = result;
        s.input = resultString;
        s.secondValue = result;
        s.operation.secondFunction = "";
        s.operation.operand = operand;
        s.operation.firstFunction = resultString;
        break;

      case 5:
        s.operation = {
          ...s.operation,
          operand: operand,
          firstFunction: format(s.firstValue),
        };
        break;
    }
    return s;
  } catch (e) {
    return { ...state, step: "error", input: e as string };
  }
}
