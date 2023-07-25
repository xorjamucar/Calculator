import Button from "@mui/material/Button";
import React from "react";

interface DecimalButtonProps {
  userInput: string;
  handleNewInputIsDecimal: () => void;
}
export default function DecimalButton({
  userInput,
  handleNewInputIsDecimal,
}: DecimalButtonProps) {
  return (
    <Button
      variant="outlined"
      disableRipple
      fullWidth
      sx={{
        fontSize: 20,
        fontWeight: "1",
        maxHeight: "100%",
        backgroundColor: "#f5f5f5",
        boxShadow: 1,
        color: "black",
        borderColor: "#bdbdbd",
        "&:hover": {
          backgroundColor: "#eeeeee",
          borderColor: "#bdbdbd",
        },
        "&:active": {
          backgroundColor: "#eeeeee",
          borderColor: "#bdbdbd",
          boxShadow: 0,
        },
      }}
      onClick={handleNewInputIsDecimal}
      // disabled={
      //   userInput === "Cannot devide by zero" ||
      //   userInput === "Result is Undefined"
      // }
    >
      .
    </Button>
  );
}
