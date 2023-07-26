import React from "react";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import TextField from "@mui/material/TextField";

import { all, create } from "mathjs";

import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import { Typography } from "@mui/material";
import { PageBox, CalculatorBox, ButtonRow, HistoryBox } from "../Styles";
import {
  Operand,
  resultFormating,
  inputLimiter,
  operandMap,
} from "../functions";
import BackSpaceButton from "./BackSpaceButton";
import ClearButton from "./ClearButton";
import DecimalButton from "./DecimalButton";
import EqualButton from "./EqualButton";
import FakeOperandButton from "./FakeOperandButton";
import NumberButton from "./NumberButton";
import OperandButton from "./OperandButton";

var math = create(all, { number: "BigNumber" });
interface OperationHistory {
  firstValue: number;
  secondValue: null | number;
  r: number | null;
  op: Operand;
}
interface Props {
  matches: boolean;
}
export default function Calculator({ matches }: Props) {
  const [userInput, setUserInput] = React.useState("");
  const [operand, setOperand] = React.useState<Operand>(Operand.Null);
  const [operation, setOperation] = React.useState("");
  const [firstInput, setFirstInput] = React.useState(0);
  const [secondInput, setSecondInput] = React.useState<null | number>(null);
  const [result, setResult] = React.useState<null | number>(null);
  // disable operations
  const disableOperations = React.useMemo(
    () => false,
    //isNaN(result) || !isFinite(result)
    [result]
  );
  const representedResult = React.useMemo(
    () => resultFormating(firstInput),
    [firstInput]
  );

  // clear handler
  const handleClear = React.useCallback((newInput: string) => {
    setUserInput(newInput);
    setFirstInput(0);
    setOperand(Operand.Null);
    setOperation("");
    setSecondInput(null);
    setResult(null);
  }, []);

  // changeInput
  // handleFirst input
  const handleFirstInput = React.useCallback(
    (n: string, input: string, o: Operand, res: number | null) => {
      const { newInput, newNumber } = inputLimiter(input, n);
      setUserInput(newInput);
      setFirstInput(newNumber);
      if (o !== Operand.Null) {
        setOperation("");
      }
    },
    []
  );

  const handleSecondInput = React.useCallback((n: string, input: string) => {
    const { newInput, newNumber } = inputLimiter(input, n);
    setUserInput(newInput);
    setSecondInput(newNumber);
  }, []);

  // input change handler
  const handleInputChange = React.useCallback(
    (n: string) => {
      operand !== Operand.Null && result === null
        ? handleSecondInput(n, userInput)
        : handleFirstInput(n, userInput, operand, result);
    },
    [userInput, operand, result]
  );

  // handleDecimal
  const handleNewInputIsDecimal = React.useCallback(() => {
    !userInput.includes(".") && setUserInput((userInput || "0") + ".");
  }, [userInput]);

  // result handler
  const firstEqualClick = React.useCallback(
    (o: Operand, first: number, second: number | null) => {
      const mathOperand = operandMap.get(o) || "";
      let calculation = first.toString();
      let newOperation = `${resultFormating(first)} =`;
      // let newResult = first
      if (second !== null) {
        calculation += mathOperand + second;
        newOperation = `${resultFormating(first)} ${o} ${resultFormating(
          second
        )} =`;
      }
      const newResult: number = math.evaluate(calculation);
      second !== null && setResult(newResult);

      setOperation(newOperation);
      setUserInput("");
      setFirstInput(newResult);
    },
    []
  );

  const handleResult = React.useCallback(() => {
    firstEqualClick(operand, firstInput, secondInput);
  }, [operand, firstInput, secondInput]);

  // press operand first time

  const handleFirstOperandPress = React.useCallback(
    (input: string, o: Operand) => {
      setOperand(o);
      setUserInput("");
      setOperation(`${resultFormating(math.evaluate(input))} ${o}`);
      setSecondInput(math.evaluate(input));
      setResult(null);
    },
    []
  );

  //result by operand
  const handleResultByOperand = React.useCallback(
    (o: Operand, first: number, second: number, currentOperand: Operand) => {
      const mathOperand = operandMap.get(currentOperand) || "";
      let calculation = first + mathOperand + second;
      const newResult: number = math.evaluate(calculation);
      let newOperation = `${resultFormating(newResult)} ${o}`;
      setFirstInput(newResult);
      setSecondInput(newResult);
      setOperand(o);
      setOperation(newOperation);
      setUserInput("");
    },
    []
  );
  // operand change Handler
  const handleOperandChange = React.useCallback(
    (o: Operand) => {
      userInput && secondInput !== null && operation
        ? handleResultByOperand(o, firstInput, secondInput, operand)
        : handleFirstOperandPress(userInput || firstInput.toString(), o);
    },
    [userInput, firstInput, secondInput, operand]
  );

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
          value={userInput || representedResult}
          InputProps={{
            readOnly: true,
          }}
          inputProps={{ style: { textAlign: "end" } }}
        />
      </ButtonRow>

      <ButtonRow>
        <FakeOperandButton operand="%" />
        <FakeOperandButton operand="CE" />
        <ClearButton handleClear={handleClear} />
        <BackSpaceButton />
      </ButtonRow>
      <ButtonRow>
        <FakeOperandButton operand="¹/x" />
        <FakeOperandButton operand="x²" />
        <FakeOperandButton operand="²√" />
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
        <FakeOperandButton operand="+/-" />
        <NumberButton num="0" handleInputChange={handleInputChange} />

        <DecimalButton
          userInput={userInput}
          handleNewInputIsDecimal={handleNewInputIsDecimal}
        />

        <EqualButton
          handleResult={handleResult}
          handleClear={handleClear}
          userInput={userInput}
        />
      </ButtonRow>
    </CalculatorBox>
  );
}
