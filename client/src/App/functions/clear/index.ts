import { State, math } from "../reducer";

export function clear(
  state: State,
  newInput?: "0" | "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9"
): State {
  return {
    ...state,
    firstValue: math.bignumber(newInput || "0"),
    secondValue: null,
    input: newInput || "",
    step: 5,
    operation: {
      firstFunction: "",
      secondFunction: "",
      result: "",
      eq: "",
      operand: "",
    },
  };
}
