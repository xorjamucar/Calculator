import React from "react";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import TextField from "@mui/material/TextField";

import { all, create } from "mathjs";

import { CalculatorBox, ButtonRow } from "../Styles";
import { Operand, State, Action } from "../functions";
import BackSpaceButton from "./Buttons/BackSpaceButton";
import ClearButton from "./Buttons/ClearButton";
import DecimalButton from "./Buttons/DecimalButton";
import EqualButton from "./Buttons/EqualButton";
import NumberButton from "./Buttons/NumberButton";
import OperandButton from "./Buttons/OperandButton";
import UnderOneButton from "./Buttons/UnderOneButton";
import ExtraOperationButton from "./Buttons/ExtraOperationButton";

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
    if (state.step === 3 || state.step === 4)
      return (
        state.operation.secondInput ||
        state.operation.result ||
        state.operation.firstInput ||
        "0"
      );
    return state.operation.firstInput || state.operation.result || "0";
  }, [state.step, state.operation.secondInput, state.operation.firstInput]);

  const operation = React.useMemo(() => {
    switch (state.step) {
      case 0:
      case 1:
        return state.operation.firstFunction;
      case 2:
        return (
          (state.operation.firstFunction || state.operation.firstInput) +
          state.operation.operand
        );
      case 3:
        return (
          (state.operation.firstFunction || state.operation.firstInput) +
          state.operation.operand
        );
      case 4:
        return (
          (state.operation.firstFunction || state.operation.firstInput) +
          state.operation.operand +
          state.operation.secondFunction
        );
      case 5:
        return (
          (state.operation.firstFunction || state.operation.firstInput) +
          state.operation.operand +
          (state.operation.secondFunction || state.operation.secondInput) +
          state.operation.eq
        );
      default:
        return "";
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

  const handleResult = React.useCallback(() => {}, []);

  const handleOperandChange = React.useCallback((o: "+" | "-" | "÷" | "×") => {
    dispatch({ type: "change_operand", operand: o });
  }, []);
  //CE
  const handleCE = React.useCallback(() => {}, []);

  // backspace
  const handleBackSpace = React.useCallback(() => {}, []);

  const handlePercent = React.useCallback(() => {}, []);

  const handleUnderOne = React.useCallback(() => {}, []);

  const handlePow = React.useCallback(() => {
    dispatch({ type: "pow" });
  }, []);

  const handleRoot = React.useCallback(() => {}, []);

  const handleSign = React.useCallback(() => {}, []);
  return (
    <CalculatorBox matches={matches}>
      <ButtonRow>
        <TextField
          value={operation}
          fullWidth
          InputProps={{
            readOnly: true,
          }}
          inputProps={{ style: { textAlign: "end" } }}
        />
      </ButtonRow>
      <ButtonRow>
        <TextField
          fullWidth
          value={input}
          InputProps={{
            readOnly: true,
          }}
          inputProps={{ style: { textAlign: "end" } }}
        />
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
          operand={Operand.Div}
          handleOperandChange={handleOperandChange}
          disabled={disableOperations}
        />
      </ButtonRow>
      <ButtonRow>
        <NumberButton num="7" handleInputChange={handleInputChange} />
        <NumberButton num="8" handleInputChange={handleInputChange} />
        <NumberButton num="9" handleInputChange={handleInputChange} />

        <OperandButton
          operand={Operand.Mult}
          handleOperandChange={handleOperandChange}
          disabled={disableOperations}
        />
      </ButtonRow>
      <ButtonRow>
        <NumberButton num="4" handleInputChange={handleInputChange} />
        <NumberButton num="5" handleInputChange={handleInputChange} />
        <NumberButton num="6" handleInputChange={handleInputChange} />
        <OperandButton
          operand={Operand.Sub}
          handleOperandChange={handleOperandChange}
          disabled={disableOperations}
        />
      </ButtonRow>
      <ButtonRow>
        <NumberButton num="1" handleInputChange={handleInputChange} />
        <NumberButton num="2" handleInputChange={handleInputChange} />
        <NumberButton num="3" handleInputChange={handleInputChange} />

        <OperandButton
          operand={Operand.Sum}
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
