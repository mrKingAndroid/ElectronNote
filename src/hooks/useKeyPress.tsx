import { useState, useEffect } from "react";
/**
 *
 * @param targetKeyCode number 类型的keyCode
 */
const useKeyPress = (targetKeyCode: number) => {
  const [keyPressed, setKeyPressed] = useState(false);

  const keyDownHandler = ({ keyCode }: { keyCode: number }) => {
    if (keyCode === targetKeyCode) {
      setKeyPressed(true);
    }
  };

  const keyUpHandler = ({ keyCode }: { keyCode: number }) => {
    if (keyCode === targetKeyCode) {
      setKeyPressed(false);
    }
  };

  useEffect(() => {
    document.addEventListener("keydown", keyDownHandler);
    document.addEventListener("keyup", keyUpHandler);
    return () => {
      document.removeEventListener("keydown", keyDownHandler);
      document.removeEventListener("keyup", keyUpHandler);
    };
  }, []);
  return keyPressed;
};

export default useKeyPress;
