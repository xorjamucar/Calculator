import React from "react";
export default function useKeyboard() {
  return React.useEffect(() => {
    let element: HTMLElement | null = null;
    function handleKeyDown(e: KeyboardEvent) {
      e.preventDefault();
      element = document.getElementById(e.key);
      element?.classList.add("Mui-active");
      // console.log(element?);
      // element?.focus();
    }
    function handleKeyUp(e: KeyboardEvent) {
      element?.click();
      element?.classList.remove("Mui-active");
      // element?.blur();
    }
    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("keyup", handleKeyUp);
    // Don't forget to clean up
    return function cleanup() {
      document.removeEventListener("keydown", handleKeyDown);
      document.addEventListener("keyup", handleKeyUp);
    };
  }, []);
}
