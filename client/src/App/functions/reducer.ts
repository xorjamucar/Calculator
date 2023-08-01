import { all, bignumber, create } from "mathjs";
import backspace from "./backspace";
import ce from "./CE";
import { changeInput } from "./changeInput";
import { operate } from "./operate";
import decimal from "./decimal";
import addFunction from "./addFunction";
import { clear } from "./clear";
import changeOperand from "./changeOperand";
import getResult from "./getResult";
export var math = create(all, { number: "BigNumber" });

export function format(x: math.MathType) {
  return math.format(x, {
    lowerExp: -16,
    upperExp: 16,
    precision: 16,
  });
}

interface Operation {
  firstFunction: string;
  secondFunction: string;
  result: string;
  eq: "=" | "";
  operand: "" | "+" | "-" | "÷" | "×";
}

export interface State {
  input: string;
  firstValue: math.BigNumber;
  secondValue: math.BigNumber | null;
  step: 0 | 1 | 2 | 3 | 4 | 5 | "error";
  operation: Operation;
  history: Operation[];
}

export interface Action {
  type: string;
  newInput?: "0" | "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9";
  operand?: "" | "+" | "-" | "÷" | "×";
  func?: "percent" | "sqr" | "sqrt" | "1/x" | "sign";
}

export function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "change_input":
      return changeInput(state, action.newInput || "0");
    case "change_operand":
      return changeOperand(state, action.operand || "");
    case "c":
      return clear(state, action.newInput);
    case "decimal":
      return decimal(state);
    case "result":
      return getResult(state);
    case "addFunction":
      return addFunction(state, action.func);
    case "backspace":
      return backspace(state);
    case "ce":
      return ce(state);
    case "eraseHist":
      return { ...state, history: [] };
    default:
      return state;
  }
}
