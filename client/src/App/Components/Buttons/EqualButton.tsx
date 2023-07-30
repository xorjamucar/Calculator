import { Button } from "@mui/material";
import React from "react";
import { CalculatorButton } from "../../Styles";

interface EqualButtonProps {
  handleResult: () => void;
}
export default function EqualButton({ handleResult }: EqualButtonProps) {
  const handleButtonClick = () => {
    handleResult();
  };
  return (
    <CalculatorButton
      fullWidth
      variant="contained"
      disableRipple
      id={"="}
      sx={{
        fontSize: 30,
        boxShadow: 2,
        maxHeight: "100%",

        color: "white",
        // borderColor: "#bdbdbd",
        "&:hover": {
          backgroundColor: "#1e88e5",
          borderColor: "#616161",
        },
        "&:active": {
          backgroundColor: "#42a5f5",
          borderColor: "#bdbdbd",
          boxShadow: 0,
        },
        "&:focus": {
          backgroundColor: "#42a5f5",
          borderColor: "#bdbdbd",
          boxShadow: 0,
        },
      }}
      onClick={() => {
        handleButtonClick();
        document.getElementById("=")?.blur();
      }}
    >
      =
    </CalculatorButton>
  );
}
