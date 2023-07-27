import { all, create } from "mathjs";

export enum Operand {
  Sum = "+",
  Sub = "-",
  Div = "÷",
  Mult = "×",
  Null = "",
}
var math = create(all, { number: "BigNumber" });
export var operandMap = new Map([
  [Operand.Sum, "+"],
  [Operand.Sub, "-"],
  [Operand.Div, "/"],
  [Operand.Mult, "*"],
]);

// formating functions
export function addCommas(x: number) {
  return x.toLocaleString("en-US", {
    maximumFractionDigits: 15,
  });
}

export function format(x: math.MathType) {
  return math.format(x, {
    lowerExp: -16,
    upperExp: 16,
    precision: 16,
  });
}
export function resultFormating(result: number) {
  // formatExponential(result.toExponential(15));
  // return result.toExponential(15);
  return parseFloat(result.toFixed(16));
}

interface Operation {
  firstFunction: string;
  secondFunction: string;
  result: string;
  eq: "=" | "";
  operand: "" | "+" | "-" | "÷" | "×";
}

interface RunningOperation extends Operation {
  firstInput: string;
  secondInput: string;
  // show: boolean;
}

export interface State {
  firstValue: math.BigNumber;
  secondValue: math.BigNumber | null;
  step: 0 | 1 | 2 | 3 | 4 | 5;
  operation: RunningOperation;
  history: Operation[];
}

export interface Action {
  type: string;
  newInput?: "0" | "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9";
  operand?: "" | "+" | "-" | "÷" | "×";
}

function operate(
  firstValue: math.BigNumber,
  secondValue: math.BigNumber | null,
  operand: "" | "+" | "-" | "÷" | "×"
): math.BigNumber {
  const second = secondValue === null ? firstValue : secondValue;
  switch (operand) {
    case "+":
      return math.add(firstValue, second);
    case "-":
      return math.subtract(firstValue, second);
    case "÷":
      return math.bignumber(math.format(math.divide(firstValue, second)));
    case "×":
      return math.bignumber(math.format(math.multiply(firstValue, second)));
    default:
      return second;
  }
}

function handleChangeOperand(
  state: State,
  operand: "" | "+" | "-" | "÷" | "×"
): State {
  switch (state.step) {
    case 0:
      return {
        ...state,
        step: 2,
        operation: {
          ...state.operation,
          operand: operand,
          firstFunction: "",
        },
      };
    case 1:
      return {
        ...state,
        step: 2,
        operation: {
          ...state.operation,
          operand: operand,
          firstInput: format(state.firstValue),
        },
      };
    case 2:
      return {
        ...state,
        operation: { ...state.operation, operand: operand },
      };
    case 3:
    case 4: {
      const result: math.MathType = operate(
        state.firstValue,
        state.secondValue,
        state.operation.operand
      );
      const resultString = format(result);
      console.log(resultString);
      return {
        ...state,
        firstValue: result,
        secondValue: result,
        step: 2,
        operation: {
          ...state.operation,
          result: resultString,
          firstInput: resultString,
          secondInput: "",
          firstFunction: "",
          secondFunction: "",
        },
      };
    }
  }
  return state;
}
function handleAddDecimal(state: State): State {
  switch (state.step) {
    case 0:
    case 1: {
      let num = state.operation.firstInput || "0";
      !num.includes(".") && (num += ".");
      return { ...state, operation: { ...state.operation, firstInput: num } };
    }
    case 2:
    case 3: {
      let num = state.operation.secondInput || "0";
      !num.includes(".") && (num += ".");
      return { ...state, operation: { ...state.operation, secondInput: num } };
    }
    default:
      return state;
  }
}
function handleChangeInput(
  state: State,
  newInput?: "0" | "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9"
): State {
  switch (state.step) {
    case 0:
    case 1: {
      const isNegative = math.number(state.firstValue.s === -1);
      const integerIsZero = math.number(state.firstValue.d[0] === 0);
      const hasDecimal = math.number(state.operation.firstInput.includes("."));
      const len =
        state.operation.firstInput.length -
        isNegative -
        hasDecimal -
        integerIsZero * hasDecimal;
      const s =
        len < 16
          ? state.operation.firstInput + newInput
          : state.operation.firstInput;
      const n = math.bignumber(s);
      return {
        ...state,
        step: 0,
        firstValue: n,
        operation: { ...state.operation, firstInput: s },
      };
    }
    case 2: {
      const s = newInput || "0";
      const n = math.bignumber(s);
      return {
        ...state,
        secondValue: n,
        step: 3,
        operation: { ...state.operation, secondInput: s },
      };
    }
    case 3: {
      const isNegative = math.number(state.secondValue?.s === -1);
      const integerIsZero = math.number(state.secondValue?.d[0] === 0);
      const hasDecimal = math.number(state.operation.secondInput.includes("."));
      const len =
        state.operation.secondInput.length -
        isNegative -
        hasDecimal -
        integerIsZero * hasDecimal;
      const s =
        len < 16
          ? state.operation.secondInput + newInput
          : state.operation.secondInput;
      const n = math.bignumber(s);

      return {
        ...state,
        secondValue: n,
        operation: { ...state.operation, secondInput: s },
      };
    }
  }
  return state;
}

function handleClear(
  state: State,
  newInput?: "0" | "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9"
): State {
  return {
    ...state,
    firstValue: math.bignumber(newInput || "0"),
    secondValue: null,
    step: 0,
    operation: {
      firstInput: newInput || "",
      secondInput: "",
      firstFunction: "",
      secondFunction: "",
      result: "",
      eq: "",
      operand: "",
    },
  };
}
function pow(state: State): State {
  switch (state.step) {
    case 0:
    case 1: {
      const result = format(math.pow(state.firstValue, 2));
      return {
        ...state,
        operation: {
          ...state.operation,
          firstFunction: state.operation.firstFunction
            ? `sqr(${state.operation.firstFunction})`
            : `sqr(${format(state.firstValue)})`,
          firstInput: "",
          result: result,
        },
        step: 1,
        firstValue: math.bignumber(result),
      };
    }
    case 2:
    case 3: {
      const value =
        state.secondValue === null ? state.firstValue : state.secondValue;
      const result = format(math.pow(value, 2));
      return {
        ...state,
        operation: {
          ...state.operation,
          secondFunction: state.operation.secondFunction
            ? `sqr(${state.operation.secondFunction})`
            : `sqr(${format(value)})`,
          secondInput: "",
          result: result,
        },
        step: 4,
        secondValue: math.bignumber(result),
      };
    }
  }
  return state;
}
export function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "change_input":
      return handleChangeInput(state, action.newInput);
    case "change_operand":
      return handleChangeOperand(state, action.operand || "");
    case "c":
      return handleClear(state, action.newInput);
    case "decimal":
      return handleAddDecimal(state);
    case "pow":
      return pow(state);
    default:
      return state;
  }
}
