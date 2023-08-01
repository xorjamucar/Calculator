import { clear } from "../clear";
import { State, math } from "../reducer";

export default function ce(state: State): State {
  let s = { ...state };
  s.input = "";
  switch (state.step) {
    case 0:
    case 1:
      s.step = 0;
      s.firstValue = math.bignumber(0);
      s.operation.firstFunction = "";
      break;
    case 2:
    case 3:
    case 4:
      s.step = 2;
      s.secondValue = math.bignumber(0);
      s.operation.secondFunction = "";
      break;
    case 5:
      s.firstValue = math.bignumber(0);
      s.operation.eq = "";
    case "error":
      return clear(state, "0");
  }
  return s;
}
