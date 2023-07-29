import React from "react";
import Button from "@mui/material/Button";
import { BackSpaceIcon } from "../../Icons";
interface Props {
  handleBackSpace: () => void;
}
export default function BackSpaceButton({ handleBackSpace }: Props) {
  return (
    <Button
      variant="outlined"
      disableRipple
      fullWidth
      onClick={handleBackSpace}
      // endIcon={<RootIcon />}
      sx={{
        fontSize: 30,
        color: "#1e88e5",
        boxShadow: 1,
        maxHeight: "100%",
        backgroundColor: "#f5f5f5",
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
    >
      <BackSpaceIcon />
    </Button>
  );
}
