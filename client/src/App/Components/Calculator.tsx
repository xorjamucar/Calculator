import React from "react";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

import { CalculatorBox, ButtonRow } from "../Styles";
import { State, Action } from "../functions/reducer";

import EqualButton from "./Buttons/EqualButton";
import NumberButton from "./Buttons/NumberButton";
import OperandButton from "./Buttons/OperandButton";

import ResultText from "./ResultText";
import FormulaText from "./FormulaText";
import {
  BackSpaceIcon,
  Negate,
  RootIcon,
  SquareIcon,
  UnderOne,
} from "../Icons";
import FunctionButtom from "./Buttons/FunctionButton";

interface Props {
  state: State;
  dispatch: React.Dispatch<Action>;
  matches: boolean;
}

export default function Calculator({ state, dispatch, matches }: Props) {
  // disable operations
  const disableOperations = React.useMemo(
    () => false,
    //isNaN(result) || !isFinite(result)
    []
  );

  const input = React.useMemo(() => {
    return state.input || "0";
  }, [state.input]);
  const operation = React.useMemo(() => {
    switch (state.step) {
      case 0:
      case 1:
        return state.operation.firstFunction;
      case 2:
      case 3:
        return state.operation.firstFunction + state.operation.operand;
      case 4:
        return (
          state.operation.firstFunction +
          state.operation.operand +
          state.operation.secondFunction
        );

      case 5:
        if (state.operation.eq)
          return (
            state.operation.firstFunction +
            state.operation.operand +
            state.operation.secondFunction +
            state.operation.eq
          );
        else return "";
      case "error":
        return (
          state.operation.firstFunction +
          state.operation.operand +
          state.operation.secondFunction
        );
    }
  }, [
    state.step,
    state.operation.firstFunction,
    state.operation.secondFunction,
    state.operation.eq,
    state.operation.operand,
  ]);
  // clear handler
  const handleClear = React.useCallback((newInput: string) => {
    dispatch({ type: "c" });
  }, []);

  const handleInputChange = React.useCallback(
    (n: "0" | "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9") => {
      dispatch({ type: "change_input", newInput: n });
    },
    []
  );

  const handleDecimal = React.useCallback(() => {
    dispatch({ type: "decimal" });
  }, []);

  const handleResult = React.useCallback(() => {
    dispatch({ type: "result" });
  }, []);

  const handleOperandChange = React.useCallback((o: "+" | "-" | "÷" | "×") => {
    dispatch({ type: "change_operand", operand: o });
  }, []);
  //CE
  const handleCE = React.useCallback(() => {
    dispatch({ type: "ce" });
  }, []);

  // backspace
  const handleBackSpace = React.useCallback(() => {
    dispatch({ type: "backspace" });
  }, []);

  const handlePercent = React.useCallback(() => {
    dispatch({ type: "addFunction", func: "percent" });
  }, []);

  const handleUnderOne = React.useCallback(() => {
    dispatch({ type: "addFunction", func: "1/x" });
  }, []);

  const handlePow = React.useCallback(() => {
    dispatch({ type: "addFunction", func: "sqr" });
  }, []);

  const handleRoot = React.useCallback(() => {
    dispatch({ type: "addFunction", func: "sqrt" });
  }, []);

  const handleSign = React.useCallback(() => {
    dispatch({ type: "addFunction", func: "sign" });
  }, []);
  return (
    <CalculatorBox matches={matches}>
      <ButtonRow>
        <FormulaText input={operation} />
      </ButtonRow>
      <ButtonRow>
        <ResultText input={input} />
      </ButtonRow>

      <ButtonRow>
        <FunctionButtom
          handleClick={handlePercent}
          symbol="%"
          disabled={disableOperations}
          id={"q"}
        />
        <FunctionButtom
          handleClick={handleCE}
          symbol="CE"
          disabled={false}
          id="e"
        />
        <FunctionButtom
          handleClick={() => handleClear("0")}
          symbol="C"
          disabled={false}
          id={"c"}
        />
        <FunctionButtom
          handleClick={handleBackSpace}
          symbol={<BackSpaceIcon />}
          disabled={false}
          id={"Backspace"}
        />
      </ButtonRow>
      <ButtonRow>
        <FunctionButtom
          handleClick={handleUnderOne}
          symbol={<UnderOne />}
          disabled={disableOperations}
          id="u"
        />
        <FunctionButtom
          handleClick={handlePow}
          symbol={<SquareIcon />}
          disabled={disableOperations}
          id="p"
        />
        <FunctionButtom
          handleClick={handleRoot}
          symbol={<RootIcon />}
          disabled={disableOperations}
          id="r"
        />
        <OperandButton
          operand={"÷"}
          handleOperandChange={handleOperandChange}
          disabled={disableOperations}
          id="/"
        />
      </ButtonRow>
      <ButtonRow>
        <NumberButton num="7" handleInputChange={handleInputChange} id="7" />
        <NumberButton num="8" handleInputChange={handleInputChange} id="8" />
        <NumberButton num="9" handleInputChange={handleInputChange} id="9" />

        <OperandButton
          operand={"×"}
          handleOperandChange={handleOperandChange}
          disabled={disableOperations}
          id="x"
        />
      </ButtonRow>
      <ButtonRow>
        <NumberButton num="4" handleInputChange={handleInputChange} id="4" />
        <NumberButton num="5" handleInputChange={handleInputChange} id="5" />
        <NumberButton num="6" handleInputChange={handleInputChange} id="6" />
        <OperandButton
          operand={"-"}
          handleOperandChange={handleOperandChange}
          disabled={disableOperations}
          id="-"
        />
      </ButtonRow>
      <ButtonRow>
        <NumberButton num="1" handleInputChange={handleInputChange} id="1" />
        <NumberButton num="2" handleInputChange={handleInputChange} id="2" />
        <NumberButton num="3" handleInputChange={handleInputChange} id="3" />

        <OperandButton
          operand={"+"}
          handleOperandChange={handleOperandChange}
          disabled={disableOperations}
          id="t"
        />
      </ButtonRow>
      <ButtonRow>
        <FunctionButtom
          handleClick={handleSign}
          symbol={<Negate />}
          disabled={disableOperations}
          id="n"
        />

        <NumberButton num="0" handleInputChange={handleInputChange} id="0" />

        <FunctionButtom
          handleClick={handleDecimal}
          symbol="."
          disabled={disableOperations}
          id="."
        />

        <EqualButton handleResult={handleResult} />
      </ButtonRow>
    </CalculatorBox>
  );
}
