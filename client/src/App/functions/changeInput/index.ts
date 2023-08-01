import { clear } from "../clear";
import { State, math } from "../reducer";
function inputLimiter(value: math.BigNumber, input: string, newInput: string) {
  if (input === "0") return newInput;
  const isNegative = math.number(math.isNegative(value));
  const integerIsZero = math.number(math.isZero(math.round(value)));
  const hasDecimal = math.number(input.includes("."));
  const isZero =
    math.number(
      math.isZero(value) && math.isZero(math.number(newInput)) && !hasDecimal
    ) * 16;
  const len =
    input.length -
    isNegative -
    hasDecimal -
    integerIsZero * hasDecimal +
    isZero;
  const s = len < 16 ? input + newInput : input;
  return s;
}
export function changeInput(
  state: State,
  newInput: "0" | "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9"
): State {
  let s = { ...state };
  switch (state.step) {
    case 0: {
      const str = inputLimiter(state.firstValue, state.input, newInput);
      const n = math.bignumber(str);
      s.input = str;
      s.firstValue = n;
      break;
    }
    case 2: {
      s.step = 3;
      s.input = newInput;
      s.secondValue = math.bignumber(newInput);
      s.operation.secondFunction = "";
      break;
    }
    case 3: {
      const str = inputLimiter(
        state.secondValue || math.bignumber(0),
        state.input,
        newInput
      );
      const n = math.bignumber(str);
      s.input = str;
      s.secondValue = n;
      s.operation.secondFunction = str;
      break;
    }
    case 4:
      s.step = 3;
      s.input = newInput;
      s.secondValue = math.bignumber(newInput);
      s.operation.secondFunction = "";
      break;
    case 1:
    case 5:
      s.step = 0;
      s.input = newInput;
      s.firstValue = math.bignumber(newInput);
      s.operation.firstFunction = "";
      break;
    case "error":
      return clear(state, newInput);
  }
  return s;
}
