import { State } from "../reducer";

export default function decimal(state: State): State {
  let s = { ...state };
  switch (state.step) {
    case 0:
    case 3:
      s.input = state.input.includes(".") ? state.input : state.input + ".";
      break;

    case 4:
    case 2:
      s.step = 3;
      s.input = "0.";
      state.operation.secondFunction = "";
      break;

    case 1:
    case 5:
      s.step = 0;
      s.input = "0.";
      s.operation.firstFunction = "";
      break;
  }
  return s;
}
