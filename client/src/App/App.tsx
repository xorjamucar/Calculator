import React from "react";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import { reducer } from "./functions/reducer";
import { all, create } from "mathjs";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import {
  Box,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Typography,
} from "@mui/material";
import { HistoryBox, PageBox } from "./Styles";
import Calculator from "./Components/Calculator";
import { Trash } from "./Icons";

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
  const matches = useMediaQuery(theme.breakpoints.up("md"));
  // let element: HTMLElement | null = null;
  // element = document.getElementById("equal");
  // console.log(element?.className);
  React.useEffect(() => {
    let element: HTMLElement | null = null;
    function handleKeyDown(e: KeyboardEvent) {
      e.preventDefault();
      element = document.getElementById(e.key);
      element?.focus();
    }
    function handleKeyUp(e: KeyboardEvent) {
      element?.click();
      element?.blur();
    }
    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("keyup", handleKeyUp);
    // Don't forget to clean up
    return function cleanup() {
      document.removeEventListener("keydown", handleKeyDown);
      document.addEventListener("keyup", handleKeyUp);
    };
  }, []);
  return (
    <PageBox>
      <Calculator state={state} dispatch={dispatch} matches={matches} />
      {matches && (
        <HistoryBox>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Typography variant="h6">History</Typography>
            <IconButton onClick={() => dispatch({ type: "eraseHist" })}>
              <Trash />
            </IconButton>
          </Box>

          <List
            sx={{
              width: "100%",
              maxHeight: "90vh",
              overflow: "auto",
              // maxWidth: 360,
            }}
          >
            {[...state.history].reverse().map((value, i) => (
              <ListItem
                key={i}
                disableGutters
                sx={{
                  justifyContent: "flex-end",
                  textAlign: "right",
                  paddingRight: 1,
                  paddingLeft: 3,
                  maxWidth: "100%",
                  wordWrap: "break-word",
                }}
              >
                <ListItemText
                  primaryTypographyProps={{
                    fontSize: 20,
                    fontWeight: "medium",
                    color: "grey",
                  }}
                  secondaryTypographyProps={{
                    fontSize: 30,
                    fontWeight: "medium",
                    color: "black",
                  }}
                  primary={
                    value.firstFunction +
                    value.operand +
                    value.secondFunction +
                    "="
                  }
                  secondary={value.result}
                />
              </ListItem>
            ))}
          </List>
        </HistoryBox>
      )}
    </PageBox>
  );
}
