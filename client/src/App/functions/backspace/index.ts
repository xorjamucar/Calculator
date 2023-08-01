import { clear } from "../clear";
import { State, math } from "../reducer";
function eraseOne(currentInput: string) {
  let input = currentInput;
  input = input.substring(0, input.length - 1);
  input === "-" && (input = "");
  const newNumber = math.bignumber(input || 0);
  return { input, newNumber };
}
export default function backspace(state: State): State {
  let s = { ...state };
  switch (state.step) {
    case 0: {
      const { input, newNumber } = eraseOne(state.input);
      s = { ...s, input: input, firstValue: newNumber };
      break;
    }
    case 3: {
      const { input, newNumber } = eraseOne(state.input);
      s = { ...s, input: input, secondValue: newNumber };
      break;
    }
    case 5:
      s.operation.eq = "";
    case "error":
      return clear(state, "0");
  }
  return s;
}
