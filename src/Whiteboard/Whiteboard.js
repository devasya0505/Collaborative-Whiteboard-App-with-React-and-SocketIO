import React, { useRef, useLayoutEffect, useState } from "react";
import { useSelector } from "react-redux";
import Menu from "./Menu";
import rough from "roughjs/bundled/rough.esm";
import { actions, toolTypes } from "../constants";

const Whiteboard = () => {
  const canvasRef = useRef();
  const toolType = useSelector((state) => state.whiteboard.tool);
  const [action, setAction] = useState(null);

  useLayoutEffect(() => {
    const canvas = canvasRef.current;

    const rc = rough.canvas(canvas);

    rc.rectangle(10, 10, 200, 200); // x, y, width, height
    rc.rectangle(20, 20, 300, 300); // x, y, width, height
    rc.line(80, 120, 300, 100); // x1, y1, x2, y2
    rc.line(0, 0, 100, 100); // x1, y1, x2, y2
  }, []);

  const handleMouseDown = (event) => {
    const { clientX, clientY } = event;
    console.log(toolType);

    if (toolType === toolTypes.RECTANGLE) {
      setAction(actions.DRAWING);
    }
  };

  return (
    <>
      <Menu />
      <canvas
        onMouseDown={handleMouseDown}
        ref={canvasRef}
        width={window.innerWidth}
        height={window.innerHeight}
      />
    </>
  );
};

export default Whiteboard;
