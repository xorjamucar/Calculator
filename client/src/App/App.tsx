import React from "react";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import EqualButton from "./Components/EqualButton";
import { Operand, removeCommas, handleOperation, addCommas } from "./functions";
import NumberButton from "./Components/NumberButton";
import OperandButton from "./Components/OperandButton";
import DecimalButton from "./Components/DecimalButton";
import ClearButton from "./Components/ClearButton";

export default function App() {
  const [userInput, setUserInput] = React.useState("0");
  const [operand, setOperand] = React.useState<Operand>(Operand.Null);
  const [operation, setOperation] = React.useState("");
  const [previousValue, setPreviousValue] = React.useState("0");
  const [firstCall, setFirstCall] = React.useState(false);
  const [operandPressed, setOperandPressed] = React.useState(false);
  // has to Reset
  const hasToReset = React.useMemo(
    () =>
      ["Cannot devide by zero", "Result is Undefined"].includes(userInput) ||
      (operation.slice(-1) === "=" && operand !== Operand.Null),
    [userInput, operation, operand]
  );
  // disable operations
  const disableOperations = React.useMemo(
    () =>
      userInput === "Cannot devide by zero" ||
      userInput === "Result is Undefined",
    [userInput]
  );
  // clear handler
  const handleClear = React.useCallback((newInput: string) => {
    setUserInput(newInput);
    setOperand(Operand.Null);
    setOperation("");
    setFirstCall(false);
    setOperandPressed(false);
    setPreviousValue("0");
  }, []);

  // firstCallHandler
  const handleFirstCall = React.useCallback((n: string) => {
    setFirstCall(false);
    setOperandPressed(false);
    setUserInput(n);
  }, []);

  // changeInput
  const changeInput = React.useCallback(
    (n: string) => {
      const splitNumber = userInput.split(".");
      if (splitNumber.length === 2) {
        setUserInput(splitNumber[0] + "." + splitNumber[1] + n);
      } else {
        console.log(splitNumber);
        setUserInput(addCommas(Number(removeCommas(userInput) + n)));
      }
      setOperandPressed(false);
    },
    [userInput]
  );

  // input change handler
  const handleInputChange = React.useCallback(
    (n: string) => {
      hasToReset
        ? handleClear(n)
        : firstCall
        ? handleFirstCall(n)
        : changeInput(n);
    },
    [userInput, hasToReset, firstCall]
  );

  // result handler
  const handleResult = React.useCallback(() => {
    let [prev, current] = [
      removeCommas(previousValue),
      removeCommas(userInput),
    ];
    operation.slice(-1) === "=" &&
      operand &&
      ([prev, current] = [current, prev]);
    const r = handleOperation(current, prev, operand);
    setPreviousValue(addCommas(current));
    setUserInput(r.result);
    setFirstCall(true);
    setOperandPressed(false);
    setOperation(r.op);
  }, [userInput, previousValue, operation, operand]);

  // handle new input is decimal
  const handleNewInputIsDecimal = React.useCallback(() => {
    firstCall
      ? handleInputChange("0.")
      : !userInput.includes(".") && setUserInput(userInput + ".");
  }, [userInput, firstCall]);

  // operand change Handler
  const handleOperandChange = React.useCallback(
    (o: Operand) => {
      let newValue = userInput;
      if (o === operand && operation.slice(-1) !== "=" && !operandPressed) {
        const { result } = handleOperation(
          removeCommas(newValue),
          removeCommas(previousValue),
          o
        );
        newValue = result;
      }
      const newOperation = removeCommas(newValue) + o;
      setOperand(o);
      setPreviousValue(newValue);
      setUserInput(newValue);
      setFirstCall(true);
      setOperandPressed(true);
      setOperation(newOperation);
    },
    [operation, operandPressed, userInput]
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
          value={userInput}
          InputProps={{
            readOnly: true,
          }}
          inputProps={{ style: { textAlign: "end" } }}
        />
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
