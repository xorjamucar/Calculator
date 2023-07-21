import React from "react";
import { Operand } from "../functions";
import Button from "@mui/material/Button";
interface OperationButtonProps {
  operand: Operand;
  handleOperandChange: (o: Operand) => void;
  disabled: boolean;
}
export default function OperandButton({
  operand,
  handleOperandChange,
  disabled,
}: OperationButtonProps) {
  const handleClick = () => {
    handleOperandChange(operand);
  };
  return (
    <Button
      variant="outlined"
      disableRipple
      sx={{
        fontSize: 20,
        fontWeight: "1",
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
      onClick={handleClick}
      disabled={disabled}
    >
      {operand}
    </Button>
  );
}
