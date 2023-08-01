import { operate } from "../operate";
import { State, format, math } from "../reducer";

function useFunction(
  num: math.BigNumber,
  input: string,
  func?: "percent" | "sqr" | "sqrt" | "1/x" | "sign"
) {
  let result: math.BigNumber, newInput: string;
  switch (func) {
    case "percent":
      result = operate(num, math.bignumber(100), "÷");
      newInput = `(${input}%)`;
      break;
    case "sqr":
      result = math.bignumber(format(math.pow(num, 2)));
      if (math.equal(result, Infinity)) throw "Overflow";
      newInput = `sqr(${input})`;
      break;
    case "sqrt":
      result = math.sqrt(num);
      if (math.isComplex(result)) throw "Invalid input";
      newInput = `√(${input})`;
      break;
    case "1/x": {
      result = operate(math.bignumber(1), num, "÷");
      newInput = `1/(${input})`;
      break;
    }
    case "sign":
      result = operate(math.bignumber(-1), num, "×");
      newInput = `negate(${input})`;
      break;
    default:
      result = num;
      newInput = input;
      break;
  }
  return { result, newInput };
}

export default function addFunction(
  state: State,
  func?: "percent" | "sqr" | "sqrt" | "1/x" | "sign"
): State {
  let s = { ...state };
  try {
    switch (state.step) {
      case 0:
      case 1:
        {
          const { result, newInput } = useFunction(
            state.firstValue,
            state.operation.firstFunction || format(state.firstValue),
            func
          );
          s.input = format(result);
          s.step = 1;
          s.firstValue = result;
          s.operation.firstFunction = newInput;
        }
        break;
      case 2:
      case 3:
      case 4:
        {
          const { result, newInput } = useFunction(
            state.secondValue === null ? state.firstValue : state.secondValue,
            state.operation.secondFunction ||
              format(
                state.secondValue === null
                  ? state.firstValue
                  : state.secondValue
              ),
            func
          );
          s.step = 4;
          s.secondValue = result;
          s.input = format(result);
          s.operation.secondFunction = newInput;
        }
        break;
      case 5: {
        const { result, newInput } = useFunction(
          state.firstValue,
          format(state.firstValue),
          func
        );
        s.step = 1;
        s.firstValue = result;
        s.input = format(result);
        s.operation.firstFunction = newInput;
        s.operation.secondFunction =
          state.secondValue === null ? "" : format(state.secondValue);
        break;
      }
    }
    return s;
  } catch (e) {
    const message = e as string;
    return { ...state, step: "error", input: message };
  }
}
