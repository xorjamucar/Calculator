import React from "react";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
enum Operand {
  Sum = "+",
  Sub = "-",
  Div = "÷",
  Mult = "×",
  Null = "",
}
function addCommas(x: number) {
  return x.toLocaleString(undefined, {
    maximumFractionDigits: 16,
  });
}
function removeCommas(x: string) {
  let r = parseFloat(x.replace(/,/g, ""));

  return r;
}

function multipy(input: number, previousNumber: number) {
  return addCommas(previousNumber * input);
}
function divide(input: number, previousNumber: number) {
  let result = "Cannot devide by zero";
  if (input !== 0) result = addCommas(previousNumber / input);
  else if (input === 0 && previousNumber === 0) result = "Result is Undefined";
  return result;
}
function sum(input: number, previousNumber: number) {
  return addCommas(previousNumber + input);
}
function sub(input: number, previousNumber: number) {
  return addCommas(previousNumber - input);
}
function nullOperand(input: number, previousNumber: number) {
  return addCommas(input);
}

const functionMap = new Map([
  [Operand.Mult, multipy],
  [Operand.Div, divide],
  [Operand.Sub, sub],
  [Operand.Sum, sum],
  [Operand.Null, nullOperand],
]);

export default function App() {
  const [userInput, setUserInput] = React.useState("0");
  const [operand, setOperand] = React.useState<Operand>(Operand.Null);
  const [operation, setOperation] = React.useState("");
  const [previousValue, setPreviousValue] = React.useState("0");
  const [previousFlag, setPreviousFlag] = React.useState(false);

  // result handler
  const handleResult = () => {
    setOperation(operation + userInput);
    if (
      userInput === "Cannot devide by zero" ||
      userInput === "Result is Undefined"
    ) {
      handleClear("0");
      return;
    }

    var f = functionMap.get(operand) || nullOperand;
    let current = userInput;
    let previous = previousValue;
    const haveResult = operation.slice(-1) === "=" && operand;

    haveResult && ([current, previous] = [previous, current]);
    var newInput = f(
      Number(removeCommas(current)),
      Number(removeCommas(previous))
    );
    let operationString = previous + operand + current + "=";
    !operand && (operationString = current + "=");
    (newInput === "Cannot devide by zero" ||
      newInput === "Result is Undefined") &&
      (operationString = previous + operand);
    setOperation(operationString);
    !haveResult && setPreviousValue(userInput);
    if (current === userInput) setPreviousFlag(true);
    setUserInput(newInput);
  };

  // clear handler
  const handleClear = (newInput: string) => {
    setUserInput(newInput);
    setOperand(Operand.Null);
    setOperation("");
    setPreviousValue("0");
  };
  // handle new input is decimal
  const handleNewInputIsDecimal = () => {
    if (Number(previousValue)) {
      handleClear("0.");
      return;
    }

    !userInput.includes(".") && setUserInput(userInput + ".");
  };

  // input change handler
  const handleInputChange = (n: string) => {
    // handle last value is divide by zero
    if (
      userInput === "Cannot devide by zero" ||
      userInput === "Result is Undefined"
    ) {
      handleClear(n);
      return;
    }
    // handle decimals
    else if (
      (userInput.slice(-1) === "0" && userInput.includes(".")) ||
      userInput.slice(-1) === "."
    ) {
      setUserInput(userInput + n);
      return;
    }

    // handleEqual

    let stringNumber = removeCommas(userInput).toString();
    let newInput = addCommas(Number(stringNumber + n));

    // if (previousFlag && stringNumber === n) {
    //   console.log("here");
    //   newInput = previousValue;
    // } else
    if (previousFlag) {
      newInput = n;
    }

    setPreviousFlag(false);
    setUserInput(newInput);
  };

  // operand change Handler
  const handleOperandChange = (o: Operand) => {
    setOperand(o);
    let newInput = userInput;
    if (operation.slice(-1) !== "=" && previousValue && !previousFlag) {
      const f = functionMap.get(operand) || nullOperand;
      newInput = f(
        Number(removeCommas(userInput)),
        Number(removeCommas(previousValue))
      );
      setUserInput(newInput);
    }
    setPreviousValue(newInput);
    setPreviousFlag(true);
    setOperation(newInput + o);
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
  const handleDecimalClick = () => {
    handleInputChange(".");
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
