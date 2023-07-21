import Button from "@mui/material/Button";
import React from "react";

interface ClearButtonProps {
  handleClear: (newInput: string) => void;
}
export default function ClearButton({ handleClear }: ClearButtonProps) {
  return (
    <Button
      variant="outlined"
      sx={{ fontSize: 20 }}
      onClick={() => handleClear("0")}
    >
      C
    </Button>
  );
}
