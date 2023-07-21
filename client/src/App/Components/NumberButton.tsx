import React from "react";
import Button from "@mui/material/Button";

interface NumberButtonProps {
  num: string;
  handleInputChange: (n: string) => void;
}
export default function NumberButton({
  num,
  handleInputChange,
}: NumberButtonProps) {
  const handleClick = () => {
    // if (
    //   userInput === "Cannot devide by zero" ||
    //   userInput === "Result is Undefined" ||
    //   (operation.slice(-1) === "=" && operand)
    // ) {
    //   handleClear(n);
    //   return;
    // } else if (firstCall) {
    //   handleFirstCall(n);
    //   return;
    // }
    // reset
    //   ? handleClear(num)
    //   : firstCall
    //   ? handleFirstCall(num)
    handleInputChange(num);
  };
  return (
    <Button variant="outlined" onClick={handleClick}>
      {num}
    </Button>
  );
}