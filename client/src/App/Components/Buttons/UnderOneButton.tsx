import React from "react";
import { CalculatorButton } from "../../Styles";
import { Typography } from "@mui/material";
import { UnderOne } from "../../Icons";

interface Props {
  handleClick: () => void;
}
export default function UnderOneButton({ handleClick }: Props) {
  return (
    <CalculatorButton
      variant="outlined"
      disableRipple
      fullWidth
      sx={{
        fontSize: 30,
        color: "#1e88e5",
        boxShadow: 1,
        position: "relative",
        lineHeight: "50%",
        backgroundColor: "#f5f5f5",
        "&:active": {
          boxShadow: 0,
        },
      }}
      onClick={handleClick}
    >
      <UnderOne />
    </CalculatorButton>
  );
}
