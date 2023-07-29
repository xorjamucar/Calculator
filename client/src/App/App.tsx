import React from "react";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import { reducer } from "./functions/reducer";
import { all, create } from "mathjs";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import { Typography } from "@mui/material";
import { HistoryBox, PageBox } from "./Styles";
import Calculator from "./Components/Calculator";
import { RootIcon } from "./Icons";
var math = create(all, { number: "BigNumber" });

export default function App() {
  const [state, dispatch] = React.useReducer(reducer, {
    firstValue: math.bignumber(0),
    secondValue: null,
    input: "",
    step: 5,
    operation: {
      firstFunction: "",
      secondFunction: "",
      result: "",
      eq: "",
      operand: "",
    },
    history: [],
  });
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up("sm"));

  return (
    <PageBox>
      <Calculator state={state} dispatch={dispatch} matches={matches} />
      {matches && (
        <HistoryBox>
          <Typography variant="h6">History</Typography>
        </HistoryBox>
      )}
    </PageBox>
  );
}
