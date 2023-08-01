import { clear } from "../clear";
import { operate } from "../operate";
import { State, format } from "../reducer";

export default function getResult(state: State): State {
  if (state.step === "error") return clear(state, "0");
  try {
    const result = operate(
      state.firstValue,
      state.secondValue,
      state.operation.operand
    );
    const resultString = format(result);
    let s = { ...state };
    s.step = 5;
    s.operation.eq = "=";
    s.input = resultString;
    s.firstValue = result;
    switch (state.step) {
      case 1:
        s.history = [
          {
            firstFunction: state.operation.firstFunction,
            secondFunction: state.operation.secondFunction,
            result: resultString,
            eq: "=",
            operand: state.operation.operand,
          },
          ...s.history,
        ];
        break;
      case 2:
      case 3:
        s.history = [
          {
            firstFunction: state.operation.firstFunction,
            secondFunction: state.operation.secondFunction
              ? state.operation.secondFunction
              : format(state.firstValue),
            result: resultString,
            eq: "=",
            operand: state.operation.operand,
          },
          ...s.history,
        ];
        s.operation.secondFunction = format(
          state.secondValue === null ? state.firstValue : state.secondValue
        );
        break;
      case 4:
        s.history = [
          {
            firstFunction: state.operation.firstFunction,
            secondFunction: state.operation.secondFunction,
            result: resultString,
            eq: "=",
            operand: state.operation.operand,
          },
          ...s.history,
        ];
        break;
      case 0:
      case 5:
        s.history = [
          {
            firstFunction: format(state.firstValue),
            secondFunction: state.operation.secondFunction,
            result: format(result),
            eq: "=",
            operand: state.operation.operand,
          },
          ...s.history,
        ];
        s.operation.firstFunction = format(state.firstValue);
        s.operation.secondFunction =
          state.secondValue === null ? "" : format(state.secondValue);
        break;
    }
    return s;
  } catch (e) {
    return { ...state, step: "error", input: e as string };
  }
}
