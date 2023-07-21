import Button from "@mui/material/Button";
import React from "react";

interface ClearButtonProps {
  handleClear: (newInput: string) => void;
}
export default function ClearButton({ handleClear }: ClearButtonProps) {
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
      onClick={() => handleClear("0")}
    >
      C
    </Button>
  );
}
