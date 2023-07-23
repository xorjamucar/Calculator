import React from "react";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import EqualButton from "./Components/EqualButton";
import {
  Operand,
  decimalLengthLimiter,
  handleOperation,
  integerLengthLimiter,
  operandMap,
} from "./functions";
import NumberButton from "./Components/NumberButton";
import OperandButton from "./Components/OperandButton";
import DecimalButton from "./Components/DecimalButton";
import ClearButton from "./Components/ClearButton";
import ResultText from "./Components/ResultText";
import { all, create, equal } from "mathjs";
var math = create(all, { number: "BigNumber", precision: 16 });
interface OperationHistory {
  firstValue: number;
  secondValue: number | null;
  r: number;
  op: Operand;
}
export default function App() {
  const [userInput, setUserInput] = React.useState("");
  const [operand, setOperand] = React.useState<Operand>(Operand.Null);
  const [operation, setOperation] = React.useState("");
  const [operandPressed, setOperandPressed] = React.useState(false);
  const [result, setResult] = React.useState(0);
  const [history, setHistory] = React.useState<OperationHistory[]>([]);
  const [equalPressed, setEqualPressed] = React.useState(false);

  // disable operations
  const disableOperations = React.useMemo(
    () => isNaN(result) || !isFinite(result),
    [userInput]
  );
  const representedResult = React.useMemo(
    () =>
      isNaN(result)
        ? "Result is Undefined"
        : !isFinite(result)
        ? "Cannot Devide by Zero"
        : userInput || result,
    [userInput, result]
  );
  // clear handler
  const handleClear = React.useCallback((newInput: string) => {
    setUserInput(newInput);
    setOperand(Operand.Null);
    setOperation("");
    setEqualPressed(false);
    setResult(0);
    setOperandPressed(false);
  }, []);

  // changeInput
  const changeInput = React.useCallback((n: string, input: string) => {
    const splitNumber = input.split(".");
    if (splitNumber.length === 2) {
      setUserInput(decimalLengthLimiter(splitNumber[0], splitNumber[1], n));
    } else {
      setUserInput(integerLengthLimiter(splitNumber[0], n));
    }
    // setOperandPressed(false);
    setEqualPressed(false);
  }, []);

  // input change handler
  const handleInputChange = React.useCallback(
    (n: string) => {
      equalPressed || disableOperations
        ? handleClear(n)
        : changeInput(n, userInput);
    },
    [userInput, equalPressed, disableOperations]
  );
  // handleDecimal
  const handleNewInputIsDecimal = React.useCallback(() => {
    !userInput.includes(".") && setUserInput((userInput || "0") + ".");
  }, [userInput]);
  // result without operand

  const continueWithoutOperand = React.useCallback((h: OperationHistory[]) => {
    const lastOperation = h[h.length - 1];
    setHistory([...h, lastOperation]);
  }, []);
  const firstWithoutOperand = React.useCallback(
    (h: OperationHistory[], input: string) => {
      console.log(input);
      setHistory([
        ...h,
        {
          firstValue: Number(input),
          secondValue: null,
          r: Number(input),
          op: Operand.Null,
        },
      ]);
      setOperation(Number(input) + "=");
      setUserInput("");
      setOperandPressed(true);
      setResult(Number(input));
    },
    []
  );
  // continue Result
  const continueCalculation = React.useCallback((h: OperationHistory[]) => {
    const { secondValue, r, op, firstValue } = h[h.length - 1];
    const mathOperand = operandMap.get(op) || "";
    const calculation = `${r} ${mathOperand} ${secondValue || firstValue}`;
    const newResult: number = Number(math.evaluate(calculation));
    setHistory([
      ...h,
      {
        firstValue: secondValue || firstValue,
        secondValue: secondValue,
        r: newResult,
        op: op,
      },
    ]);
    setOperation(`${r} ${op} ${secondValue} =`);
    setResult(newResult);
  }, []);

  // result handler
  const firstEqualClick = React.useCallback(
    (input: string, o: Operand, h: OperationHistory[], res: number) => {
      const mathOperand = operandMap.get(o) || "";
      const calculation = res + mathOperand + input;
      const newResult: number = Number(math.evaluate(calculation));
      setHistory([
        ...h,
        {
          firstValue: res,
          secondValue: Number(input),
          r: newResult,
          op: o,
        },
      ]);
      const newOperation = `${res} ${o} ${Number(input)} =`;
      setOperation(newOperation);
      setUserInput("");
      setResult(newResult);
      setEqualPressed(true);
      setOperandPressed(false);
    },
    []
  );

  const handleResultWithOperand = React.useCallback(
    (
      input: string,
      o: Operand,
      h: OperationHistory[],
      res: number,
      eq: boolean
    ) => {
      eq ? continueCalculation(h) : firstEqualClick(input, o, h, res);
    },
    []
  );

  const handleResultWithoutOperand = React.useCallback(
    (input: string, h: OperationHistory[], eq: boolean) => {
      eq ? continueWithoutOperand(h) : firstWithoutOperand(h, input);
    },
    []
  );

  const handleResult = React.useCallback(() => {
    disableOperations
      ? handleClear("")
      : operand !== Operand.Null
      ? handleResultWithOperand(
          userInput || result.toString(),
          operand,
          history,
          result,
          equalPressed
        )
      : handleResultWithoutOperand(
          userInput || result.toString(),
          history,
          equalPressed
        );
  }, [userInput, operand, history, result, equalPressed]);

  // handle new input is decimal

  const handleFirstOperandPress = (input: string, o: Operand) => {
    setResult(Number(input));
    setOperand(o);
    setUserInput("");
    setEqualPressed(false);
    setOperandPressed(true);
    setOperation(`${Number(input)} ${o}`);
  };

  // handleResult by operand
  const handleResultByOperand = React.useCallback(
    (input: string, o: Operand, res: number, h: OperationHistory[]) => {
      console.log([input, o, res]);
      const mathOperand = operandMap.get(o) || "";
      const newResult = Number(math.evaluate(input + mathOperand + res));
      setHistory([
        ...h,
        {
          firstValue: res,
          secondValue: Number(input),
          r: newResult,
          op: o,
        },
      ]);
      setResult(newResult);
      setOperandPressed(true);
      setOperation(`${newResult} ${o}`);
      setUserInput("");
    },
    []
  );
  // operand change Handler
  const handleOperandChange = React.useCallback(
    (o: Operand) => {
      userInput && operandPressed
        ? handleResultByOperand(userInput, o, result, history)
        : handleFirstOperandPress(userInput || result.toString(), o);
    },
    [userInput, result, operandPressed, history]
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
