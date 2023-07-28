import React from "react";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import TextField from "@mui/material/TextField";

import { all, create } from "mathjs";

import { CalculatorBox, ButtonRow } from "../Styles";
import { State, Action } from "../functions/reducer";
import BackSpaceButton from "./Buttons/BackSpaceButton";
import ClearButton from "./Buttons/ClearButton";
import DecimalButton from "./Buttons/DecimalButton";
import EqualButton from "./Buttons/EqualButton";
import NumberButton from "./Buttons/NumberButton";
import OperandButton from "./Buttons/OperandButton";
import UnderOneButton from "./Buttons/UnderOneButton";
import ExtraOperationButton from "./Buttons/ExtraOperationButton";
import ResultText from "./ResultText";
import FormulaText from "./FormulaText";

var math = create(all, { number: "BigNumber" });

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
      case "error":
      case 5:
        return (
          state.operation.firstFunction +
          state.operation.operand +
          state.operation.secondFunction +
          state.operation.eq
        );
    }
  }, [state.operation, state.step]);
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
  const handleCE = React.useCallback(() => {}, []);

  // backspace
  const handleBackSpace = React.useCallback(() => {}, []);

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
        <ExtraOperationButton handleClick={handlePercent} symbol="%" />
        <ExtraOperationButton handleClick={handleCE} symbol="CE" />
        <ClearButton handleClear={handleClear} />
        <BackSpaceButton handleBackSpace={handleBackSpace} />
      </ButtonRow>
      <ButtonRow>
        <UnderOneButton handleClick={handleUnderOne} />
        <ExtraOperationButton handleClick={handlePow} symbol="x²" />
        <ExtraOperationButton handleClick={handleRoot} symbol="²√" />
        <OperandButton
          operand={"÷"}
          handleOperandChange={handleOperandChange}
          disabled={disableOperations}
        />
      </ButtonRow>
      <ButtonRow>
        <NumberButton num="7" handleInputChange={handleInputChange} />
        <NumberButton num="8" handleInputChange={handleInputChange} />
        <NumberButton num="9" handleInputChange={handleInputChange} />

        <OperandButton
          operand={"×"}
          handleOperandChange={handleOperandChange}
          disabled={disableOperations}
        />
      </ButtonRow>
      <ButtonRow>
        <NumberButton num="4" handleInputChange={handleInputChange} />
        <NumberButton num="5" handleInputChange={handleInputChange} />
        <NumberButton num="6" handleInputChange={handleInputChange} />
        <OperandButton
          operand={"-"}
          handleOperandChange={handleOperandChange}
          disabled={disableOperations}
        />
      </ButtonRow>
      <ButtonRow>
        <NumberButton num="1" handleInputChange={handleInputChange} />
        <NumberButton num="2" handleInputChange={handleInputChange} />
        <NumberButton num="3" handleInputChange={handleInputChange} />

        <OperandButton
          operand={"+"}
          handleOperandChange={handleOperandChange}
          disabled={disableOperations}
        />
      </ButtonRow>
      <ButtonRow>
        <ExtraOperationButton handleClick={handleSign} symbol="+/-" />

        <NumberButton num="0" handleInputChange={handleInputChange} />

        <DecimalButton userInput={""} handleNewInputIsDecimal={handleDecimal} />

        <EqualButton
          handleResult={handleResult}
          handleClear={handleClear}
          userInput={""}
        />
      </ButtonRow>
    </CalculatorBox>
  );
}
