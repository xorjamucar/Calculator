import React from "react";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import TextField from "@mui/material/TextField";
import EqualButton from "./Components/EqualButton";
import {
  Operand,
  inputLimiter,
  operandMap,
  resultFormating,
} from "./functions";
import NumberButton from "./Components/NumberButton";
import OperandButton from "./Components/OperandButton";
import DecimalButton from "./Components/DecimalButton";
import ClearButton from "./Components/ClearButton";
import { all, create } from "mathjs";
import FakeOperandButton from "./Components/FakeOperandButton";
import BackSpaceButton from "./Components/BackSpaceButton";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import { Typography } from "@mui/material";
import { ButtonRow, CalculatorBox, HistoryBox, PageBox } from "./Styles";
import Calculator from "./Components/Calculator";
var math = create(all, { number: "BigNumber" });
interface OperationHistory {
  firstValue: number;
  secondValue: null | number;
  r: number | null;
  op: Operand;
}
export default function App() {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up("sm"));

  return (
    <PageBox>
      <Calculator matches={matches} />
      {matches && (
        <HistoryBox>
          <Typography variant="h6">History</Typography>
        </HistoryBox>
      )}
    </PageBox>
  );
}
