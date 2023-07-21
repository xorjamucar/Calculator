import React from "react";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { evaluate } from "mathjs";

enum Operand {
  Sum = "+",
  Sub = "-",
  Div = "÷",
  Mult = "×",
  Null = "",
}

var operandMap = new Map([
  [Operand.Sum, "+"],
  [Operand.Sub, "-"],
  [Operand.Div, "/"],
  [Operand.Mult, "*"],
]);

interface OperationHandlerReturn {
  result: string;
  op: string;
}
function handleOperation(
  input: number,
  previousNumber: number,
  o: Operand
): OperationHandlerReturn {
  var mathOperand = operandMap.get(o);

  if (previousNumber === 0 && input === 0 && o === Operand.Div) {
    return {
      result: "Result is Undefined",
      op: `${previousNumber} ${o}`,
    };
  } else if (input === 0 && o === Operand.Div)
    return { result: "Cannot devide by zero", op: `${previousNumber} ${o}` };
  else if (!mathOperand) return { result: "" + input, op: input + "=" };
  const result: number = evaluate(`${previousNumber}  ${mathOperand} ${input}`);
  var parsedResult = addCommas(result);
  const op = `${previousNumber} ${o} ${input} =`;

  return {
    result: parsedResult,
    op: op,
  };
}

function addCommas(x: number) {
  return x.toLocaleString("en-US", {
    maximumFractionDigits: 15,
  });
}
function removeCommas(x: string) {
  let r = Number(x.replace(/,/g, ""));
  return r;
}

export default function App() {
  const [userInput, setUserInput] = React.useState("0");
  const [operand, setOperand] = React.useState<Operand>(Operand.Null);
  const [operation, setOperation] = React.useState("");
  const [previousValue, setPreviousValue] = React.useState("0");
  const [firstCall, setFirstCall] = React.useState(false);
  const [operandPressed, setOperandPressed] = React.useState(false);
  // result handler
  const handleResult = () => {
    if (
      userInput === "Cannot devide by zero" ||
      userInput === "Result is Undefined"
    ) {
      handleClear("0");
      return;
    }
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

  // input change handler
  const handleInputChange = (n: string) => {
    if (
      userInput === "Cannot devide by zero" ||
      userInput === "Result is Undefined" ||
      operation.slice(-1) === "="
    ) {
      handleClear(n);
      return;
    } else if (firstCall) {
      setFirstCall(false);
      setOperandPressed(false);
      setUserInput(n);
      return;
    }
    const splitNumber = userInput.split(".");
    if (splitNumber.length === 2) {
      setUserInput(splitNumber[0] + "." + splitNumber[1] + n);
    } else {
      setUserInput(addCommas(Number(removeCommas(userInput) + n)));
    }
    setOperandPressed(false);
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

  // operand button click handlers
  const handleMult = () => {
    handleOperandChange(Operand.Mult);
  };
  const handleDiv = () => {
    handleOperandChange(Operand.Div);
  };
  const handleSub = () => {
    handleOperandChange(Operand.Sub);
  };
  const handleSum = () => {
    handleOperandChange(Operand.Sum);
  };

  // number button click handlers
  const handleZeroClick = () => {
    handleInputChange("0");
  };
  const handleOneClick = () => {
    handleInputChange("1");
  };
  const handleTwoClick = () => {
    handleInputChange("2");
  };
  const handleThreeClick = () => {
    handleInputChange("3");
  };
  const handleFourClick = () => {
    handleInputChange("4");
  };
  const handleFiveClick = () => {
    handleInputChange("5");
  };
  const handleSixClick = () => {
    handleInputChange("6");
  };
  const handleSevenClick = () => {
    handleInputChange("7");
  };
  const handleEightClick = () => {
    handleInputChange("8");
  };
  const handleNineClick = () => {
    handleInputChange("9");
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
          <Button variant="outlined" onClick={handleSevenClick}>
            7
          </Button>
          <Button variant="outlined" onClick={handleEightClick}>
            8
          </Button>
          <Button variant="outlined" onClick={handleNineClick}>
            9
          </Button>
          <Button
            variant="outlined"
            sx={{ fontSize: 20 }}
            onClick={() => handleClear("0")}
          >
            C
          </Button>
        </Stack>
        <Stack direction="row" spacing={1}>
          <Button variant="outlined" onClick={handleFourClick}>
            4
          </Button>
          <Button variant="outlined" onClick={handleFiveClick}>
            5
          </Button>
          <Button variant="outlined" onClick={handleSixClick}>
            6
          </Button>
          <Button
            variant="outlined"
            sx={{ fontSize: 20 }}
            onClick={handleMult}
            disabled={
              userInput === "Cannot devide by zero" ||
              userInput === "Result is Undefined"
            }
          >
            ×
          </Button>
        </Stack>
        <Stack direction="row" spacing={1}>
          <Button variant="outlined" onClick={handleOneClick}>
            1
          </Button>
          <Button variant="outlined" onClick={handleTwoClick}>
            2
          </Button>
          <Button variant="outlined" onClick={handleThreeClick}>
            3
          </Button>
          <Button
            variant="outlined"
            sx={{ fontSize: 20 }}
            onClick={handleDiv}
            disabled={
              userInput === "Cannot devide by zero" ||
              userInput === "Result is Undefined"
            }
          >
            ÷
          </Button>
        </Stack>
        <Stack direction="row" spacing={1}>
          <Button
            variant="outlined"
            sx={{ fontSize: 20 }}
            onClick={handleSub}
            disabled={
              userInput === "Cannot devide by zero" ||
              userInput === "Result is Undefined"
            }
          >
            -
          </Button>

          <Button variant="outlined" onClick={handleZeroClick}>
            0
          </Button>
          <Button
            variant="outlined"
            sx={{ fontSize: 20 }}
            onClick={handleSum}
            disabled={
              userInput === "Cannot devide by zero" ||
              userInput === "Result is Undefined"
            }
          >
            +
          </Button>
          <Button
            variant="outlined"
            sx={{ fontSize: 20 }}
            onClick={handleNewInputIsDecimal}
            disabled={
              userInput === "Cannot devide by zero" ||
              userInput === "Result is Undefined"
            }
          >
            .
          </Button>
        </Stack>
        <Stack direction="row">
          <Button
            fullWidth
            variant="contained"
            sx={{ fontSize: 20 }}
            onClick={handleResult}
            onKeyUp={(event: React.KeyboardEvent<HTMLButtonElement>) => {
              console.log(event.key);
            }}
          >
            =
          </Button>
        </Stack>
      </Stack>
    </Box>
  );
}
