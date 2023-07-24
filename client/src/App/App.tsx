import React from "react";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import EqualButton from "./Components/EqualButton";
import { Operand, inputLimiter, operandMap } from "./functions";
import NumberButton from "./Components/NumberButton";
import OperandButton from "./Components/OperandButton";
import DecimalButton from "./Components/DecimalButton";
import ClearButton from "./Components/ClearButton";
import { all, create } from "mathjs";
var math = create(all, { number: "BigNumber" });
interface OperationHistory {
  firstValue: number;
  secondValue: null | number;
  r: number;
  op: Operand;
}
export default function App() {
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
    () => userInput || firstInput,
    [userInput, result, firstInput]
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
      // o !== Operand.Null && setOperation("");
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
      let newOperation = `${first} =`;
      // let newResult = first
      if (second !== null) {
        calculation += mathOperand + second;
        newOperation = `${first} ${o} ${second} =`;
      }
      const newResult: number = math.evaluate(calculation);
      second !== null && setResult(newResult);
      setFirstInput(newResult);
      setOperation(newOperation);
      setUserInput("");
    },
    []
  );

  const handleResult = React.useCallback(() => {
    firstEqualClick(operand, firstInput, secondInput);
  }, [operand, firstInput, secondInput]);

  // press operand first time

  const handleFirstOperandPress = (input: string, o: Operand) => {
    setOperand(o);
    setUserInput("");
    setOperation(`${math.evaluate(input)} ${o}`);
    setSecondInput(math.evaluate(input));
    setResult(null);
  };

  //result by operand
  const handleResultByOperand = React.useCallback(
    (o: Operand, first: number, second: number) => {
      const mathOperand = operandMap.get(o) || "";
      let calculation = first + mathOperand + second;
      const newResult: number = math.evaluate(calculation);
      let newOperation = `${newResult} ${o}`;
      setFirstInput(newResult);
      setSecondInput(newResult);
      setOperation(newOperation);
      setUserInput("");
    },
    []
  );
  // operand change Handler
  const handleOperandChange = React.useCallback(
    (o: Operand) => {
      userInput && secondInput !== null && operation
        ? handleResultByOperand(o, firstInput, secondInput)
        : handleFirstOperandPress(userInput || firstInput.toString(), o);
    },
    [userInput, firstInput, secondInput]
  );

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#eeeeee",
        // width: 280,
      }}
    >
      <Stack direction="column" spacing={1}>
        <TextField
          value={operation}
          InputProps={{
            readOnly: true,
          }}
          inputProps={{ style: { textAlign: "end" } }}
        />
        <TextField
          value={representedResult}
          InputProps={{
            readOnly: true,
          }}
          inputProps={{ style: { textAlign: "end" } }}
        />
        {/* <ResultText userInput={userInput} result={result} /> */}
        <Stack direction="row" spacing={1}>
          <NumberButton num="7" handleInputChange={handleInputChange} />
          <NumberButton num="8" handleInputChange={handleInputChange} />
          <NumberButton num="9" handleInputChange={handleInputChange} />
          <ClearButton handleClear={handleClear} />
        </Stack>
        <Stack direction="row" spacing={1}>
          <NumberButton num="4" handleInputChange={handleInputChange} />
          <NumberButton num="5" handleInputChange={handleInputChange} />
          <NumberButton num="6" handleInputChange={handleInputChange} />
          <OperandButton
            operand={Operand.Mult}
            handleOperandChange={handleOperandChange}
            disabled={disableOperations}
          />
        </Stack>
        <Stack direction="row" spacing={1}>
          <NumberButton num="1" handleInputChange={handleInputChange} />
          <NumberButton num="2" handleInputChange={handleInputChange} />
          <NumberButton num="3" handleInputChange={handleInputChange} />
          <OperandButton
            operand={Operand.Div}
            handleOperandChange={handleOperandChange}
            disabled={disableOperations}
          />
        </Stack>
        <Stack direction="row" spacing={1}>
          <OperandButton
            operand={Operand.Sub}
            handleOperandChange={handleOperandChange}
            disabled={disableOperations}
          />

          <NumberButton num="0" handleInputChange={handleInputChange} />
          <OperandButton
            operand={Operand.Sum}
            handleOperandChange={handleOperandChange}
            disabled={disableOperations}
          />
          <DecimalButton
            userInput={userInput}
            handleNewInputIsDecimal={handleNewInputIsDecimal}
          />
        </Stack>
        <Stack direction="row">
          <EqualButton
            handleResult={handleResult}
            handleClear={handleClear}
            userInput={userInput}
          />
        </Stack>
      </Stack>
    </Box>
  );
}
