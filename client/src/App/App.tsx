import React from "react";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
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

  // result handler
  const handleResult = () => {
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
  };

  // clear handler
  const handleClear = (newInput: string) => {
    setUserInput(newInput);
    setOperand(Operand.Null);
    setOperation("");
    setFirstCall(false);
    setOperandPressed(false);
    setPreviousValue("");
  };

  // handle new input is decimal
  const handleNewInputIsDecimal = () => {
    if (firstCall) {
      handleInputChange("0.");
      return;
    }
    !userInput.includes(".") && setUserInput(userInput + ".");
  };

  // firstCallHandler
  const handleFirstCall = (n: string) => {
    setFirstCall(false);
    setOperandPressed(false);
    setUserInput(n);
  };

  // has toReset
  const hasToReset = () =>
    ["Cannot devide by zero", "Result is Undefined"].includes(userInput) ||
    (operation.slice(-1) === "=" && operand !== Operand.Null);

  // changeInput
  const changeInput = (n: string) => {
    const splitNumber = userInput.split(".");
    if (splitNumber.length === 2) {
      setUserInput(splitNumber[0] + "." + splitNumber[1] + n);
    } else {
      setUserInput(addCommas(Number(removeCommas(userInput) + n)));
    }
    setOperandPressed(false);
  };
  const handleInputChange = (n: string) => {
    hasToReset()
      ? handleClear(n)
      : firstCall
      ? handleFirstCall(n)
      : changeInput(n);
  };

  // operand change Handler
  const handleOperandChange = (o: Operand) => {
    let newValue = userInput;
    if (o === operand && operation.slice(-1) !== "=" && !operandPressed) {
      const { result } = handleOperation(
        removeCommas(newValue),
        removeCommas(previousValue),
        o
      );
      newValue = result;
    }
    const newOperation = newValue + o;
    setOperand(o);
    setPreviousValue(newValue);
    setUserInput(newValue);
    setFirstCall(true);
    setOperandPressed(true);
    setOperation(newOperation);
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
        alignItems: "center",
        justifyContent: "center",
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
            userInput={userInput}
          />
        </Stack>
        <Stack direction="row" spacing={1}>
          <NumberButton num="1" handleInputChange={handleInputChange} />
          <NumberButton num="2" handleInputChange={handleInputChange} />
          <NumberButton num="3" handleInputChange={handleInputChange} />
          <OperandButton
            operand={Operand.Div}
            handleOperandChange={handleOperandChange}
            userInput={userInput}
          />
        </Stack>
        <Stack direction="row" spacing={1}>
          <OperandButton
            operand={Operand.Sub}
            handleOperandChange={handleOperandChange}
            userInput={userInput}
          />

          <NumberButton num="0" handleInputChange={handleInputChange} />
          <OperandButton
            operand={Operand.Sum}
            handleOperandChange={handleOperandChange}
            userInput={userInput}
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
