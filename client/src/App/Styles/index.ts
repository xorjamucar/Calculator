import Box, { BoxProps } from "@mui/material/Box";
import Button, { ButtonProps } from "@mui/material/Button";
import { styled } from "@mui/material/styles";

export const ButtonRow = styled(Box)<BoxProps>(({ theme }) => ({
  display: "flex",
  flexDirection: "row",
  height: "12%",
  width: "100%",
  gap: 2,
}));

export const PageBox = styled(Box)<BoxProps>(({ theme }) => ({
  display: "flex",
  flexDirection: "row",
  minHeight: "100vh",
  backgroundColor: "#eeeeee",
  width: "100%",
}));

export const HistoryBox = styled(Box)<BoxProps>(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  minHeight: "100%",
  width: "30%",
  gap: 0.5,
  margin: 3,
}));

interface CalculatorBoxProps extends BoxProps {
  matches: boolean;
}
export const CalculatorBox = styled(Box, {
  shouldForwardProp: (prop) => prop !== "matches",
})<CalculatorBoxProps>(({ matches, theme }) => ({
  display: "flex",
  flexDirection: "column",
  minHeight: "100%",
  width: matches ? "70%" : "100%",
  justifyContent: "space-between",
  gap: 1,
  margin: 3,
}));

export const CalculatorButton = styled(Button)<ButtonProps>(({ theme }) => ({
  // maxHeight: "100%",
  // padding: 0,
  color: "black",
  borderColor: "#616161",
  borderWidth: "2px",
  borderRadius: "10px",
  "&:hover": {
    backgroundColor: "#eeeeee",
    borderColor: "#616161",
    borderWidth: "2px",
  },
  "&:active": {
    backgroundColor: "#eeeeee",
    borderColor: "#bdbdbd",
    color: "#bdbdbd",
    boxShadow: 0,
  },
}));
