import { all, create } from "mathjs";
export var math = create(all, { number: "BigNumber" });

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

export interface State {
  input: string;
  firstValue: math.BigNumber;
  secondValue: math.BigNumber | null;
  step: 0 | 1 | 2 | 3 | 4 | 5;
  operation: Operation;
  history: Operation[];
}

export interface Action {
  type: string;
  newInput?: "0" | "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9";
  operand?: "" | "+" | "-" | "÷" | "×";
  func?: "percent" | "sqr" | "sqrt" | "1/x" | "sign";
}
export function handleChangeInput(
  state: State,
  newInput: "0" | "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9"
): State {
  switch (state.step) {
    case 0: {
      const isNegative = math.number(math.isNegative(state.firstValue));
      const integerIsZero = math.number(
        math.isZero(math.round(state.firstValue))
      );
      const hasDecimal = math.number(state.input.includes("."));
      const isZero =
        math.number(
          math.isZero(state.firstValue) &&
            math.isZero(math.number(newInput)) &&
            !hasDecimal
        ) * 16;
      const len =
        state.input.length -
        isNegative -
        hasDecimal -
        integerIsZero * hasDecimal +
        isZero;
      const s = len < 16 ? state.input + newInput : state.input;
      const n = math.bignumber(s);
      return {
        ...state,
        step: 0,
        input: s,
        firstValue: n,
        operation: { ...state.operation },
      };
    }
    case 2: {
      return {
        ...state,
        step: 3,
        input: newInput,
        secondValue: math.bignumber(newInput),
        operation: { ...state.operation, secondFunction: "" },
      };
    }
    case 3: {
      const isNegative = math.number(math.isNegative(state.secondValue || 0));
      const integerIsZero = math.number(
        math.isZero(math.round(state.secondValue || 0))
      );
      const hasDecimal = math.number(state.input.includes("."));
      const isZero =
        math.number(
          math.isZero(state.secondValue || 0) &&
            math.isZero(math.number(newInput)) &&
            !hasDecimal
        ) * 16;
      const len =
        state.input.length -
        isNegative -
        hasDecimal -
        integerIsZero * hasDecimal +
        isZero;
      const s = len < 16 ? state.input + newInput : state.input;
      const n = math.bignumber(s);
      return {
        ...state,
        step: 3,
        input: s,
        secondValue: n,
        operation: { ...state.operation, secondFunction: s },
      };
    }
    case 4:
      return {
        ...state,
        step: 3,
        input: newInput,
        secondValue: math.bignumber(newInput),
        operation: { ...state.operation, secondFunction: "" },
      };

    case 1:
    case 5:
      return {
        ...state,
        step: 0,
        input: newInput,
        firstValue: math.bignumber(newInput),
        operation: { ...state.operation, firstFunction: "" },
      };
  }
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
        secondValue: state.firstValue,
        operation: {
          ...state.operation,
          operand: operand,
          firstFunction: format(state.firstValue),
        },
      };
    case 1:
      return {
        ...state,
        step: 2,
        secondValue: state.firstValue,
        operation: {
          ...state.operation,
          operand: operand,
        },
      };
    case 2:
      return {
        ...state,
        operation: {
          ...state.operation,
          operand: operand,
        },
      };
    case 4:
    case 3: {
      const result = operate(
        state.firstValue,
        state.secondValue,
        state.operation.operand
      );
      const resultString = format(result);
      return {
        ...state,
        step: 2,
        firstValue: result,
        input: resultString,
        secondValue: null,
        operation: {
          ...state.operation,
          secondFunction: "",
          operand: operand,
          firstFunction: resultString,
        },
      };
    }

    case 5:
      return {
        ...state,
        step: 2,
        operation: {
          ...state.operation,
          operand: operand,
          firstFunction: format(state.firstValue),
        },
      };
  }
}
function handleAddDecimal(state: State): State {
  switch (state.step) {
    case 0: {
      const newInput = state.input.includes(".")
        ? state.input
        : state.input + ".";
      return { ...state, input: newInput };
    }
    case 4:
    case 2:
      return {
        ...state,
        step: 3,
        input: "0.",
        operation: { ...state.operation, secondFunction: "" },
      };
    case 3: {
      const newInput = state.input.includes(".")
        ? state.input
        : state.input + ".";
      return { ...state, input: newInput };
    }
    case 1:
    case 5:
      return {
        ...state,
        step: 0,
        input: "0.",
        operation: { ...state.operation, firstFunction: "" },
      };
  }
}

function handleClear(
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
function pow(state: State): State {
  switch (state.step) {
    case 0:
    case 1: {
      const result = format(math.pow(state.firstValue, 2));
      return state;
    }
    case 2:
    case 3:
      return state;
  }
  return state;
}

function useFunction(
  num: math.BigNumber,
  input: string,
  func?: "percent" | "sqr" | "sqrt" | "1/x" | "sign"
) {
  switch (func) {
    case "percent": {
      const result = operate(num, math.bignumber(100), "÷");
      const newInput = `(${input}%)`;
      return { result, newInput };
    }
    case "sqr": {
      const result = math.bignumber(format(math.pow(num, 2)));
      const newInput = `sqr(${input})`;
      return { result, newInput };
    }
    case "sqrt": {
      const result = math.sqrt(num);
      const newInput = `sqrt(${input})`;
      return { result, newInput };
    }
    case "1/x": {
      const result = operate(math.bignumber(1), num, "÷");
      const newInput = `1/(${input})`;
      return { result, newInput };
    }
    case "sign": {
      const result = operate(math.bignumber(-1), num, "×");
      const newInput = `negate(${input})`;
      return { result, newInput };
    }
    default: {
      const result = num;
      const newInput = input;
      return { result, newInput };
    }
  }
}

function hadleAddFunction(
  state: State,
  func?: "percent" | "sqr" | "sqrt" | "1/x" | "sign"
): State {
  switch (state.step) {
    case 0: {
      const { result, newInput } = useFunction(
        state.firstValue,
        state.operation.firstFunction || format(state.firstValue),
        func
      );
      return {
        ...state,
        step: 1,
        input: format(result),
        firstValue: result,
        operation: { ...state.operation, firstFunction: newInput },
      };
    }
    case 1: {
      const { result, newInput } = useFunction(
        state.firstValue,
        state.operation.firstFunction || format(state.firstValue),
        func
      );
      return {
        ...state,
        step: 1,
        firstValue: result,
        input: format(result),
        operation: { ...state.operation, firstFunction: newInput },
      };
    }
    case 2: {
      const { result, newInput } = useFunction(
        state.firstValue,
        format(state.firstValue),
        func
      );
      return {
        ...state,
        step: 4,
        secondValue: result,
        input: format(result),
        operation: { ...state.operation, secondFunction: newInput },
      };
    }
    case 3: {
      const { result, newInput } = useFunction(
        state.secondValue === null ? state.firstValue : state.secondValue,
        format(
          state.secondValue === null ? state.firstValue : state.secondValue
        ),
        func
      );
      return {
        ...state,
        step: 4,
        secondValue: result,
        input: format(result),
        operation: { ...state.operation, secondFunction: newInput },
      };
    }
    case 4:
      const { result, newInput } = useFunction(
        state.secondValue === null ? state.firstValue : state.secondValue,
        state.operation.secondFunction,
        func
      );
      return {
        ...state,
        step: 1,
        secondValue: result,
        input: format(result),
        operation: { ...state.operation, secondFunction: newInput },
      };
    case 5:
      return state;
  }
}
function handleResult(state: State): State {
  const result = operate(
    state.firstValue,
    state.secondValue,
    state.operation.operand
  );
  const resultString = format(result);
  switch (state.step) {
    case 1:
      return {
        ...state,
        step: 5,
        operation: {
          ...state.operation,
          eq: "=",
        },
        input: resultString,
        firstValue: result,
      };
    case 2:
      return {
        ...state,
        step: 5,
        operation: {
          ...state.operation,
          eq: "=",
          secondFunction: format(
            state.secondValue === null ? state.firstValue : state.secondValue
          ),
        },
        input: resultString,
        firstValue: result,
      };
    case 3:
      return {
        ...state,
        step: 5,
        operation: {
          ...state.operation,
          eq: "=",
          secondFunction: format(
            state.secondValue === null ? state.firstValue : state.secondValue
          ),
        },
        input: resultString,
        firstValue: result,
      };
    case 4:
      return {
        ...state,
        step: 5,
        operation: {
          ...state.operation,
          eq: "=",
        },
        input: resultString,
        firstValue: result,
      };
    case 0:
    case 5:
      return {
        ...state,
        step: 5,
        operation: {
          ...state.operation,
          eq: "=",
          firstFunction: format(state.firstValue),
          secondFunction:
            state.secondValue === null ? "" : format(state.secondValue),
        },
        input: resultString,
        firstValue: result,
      };
  }
}
export function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "change_input":
      return handleChangeInput(state, action.newInput || "0");
    case "change_operand":
      return handleChangeOperand(state, action.operand || "");
    case "c":
      return handleClear(state, action.newInput);
    case "decimal":
      return handleAddDecimal(state);
    case "result":
      return handleResult(state);
    case "addFunction":
      return hadleAddFunction(state, action.func);
    default:
      return state;
  }
}
