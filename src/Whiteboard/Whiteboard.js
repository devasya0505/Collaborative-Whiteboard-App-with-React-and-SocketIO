import React, { useRef, useLayoutEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Menu from "./Menu";
import rough from "roughjs/bundled/rough.esm";
import { actions, toolTypes } from "../constants";
import { createElement } from "./utils";
import { v4 as uuid } from "uuid";
import { updateElement } from "./whiteboardSlice";

let selectedElement;

const setSelectedElement = (e1) => {
  selectedElement = e1;
};

const Whiteboard = () => {
  const canvasRef = useRef();
  const toolType = useSelector((state) => state.whiteboard.tool);
  const [action, setAction] = useState(null);

  const dispatch = useDispatch();

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

    const element = createElement({
      x1: clientX,
      y1: clientY,
      x2: clientX,
      y2: clientY,
      toolType,
      id: uuid(),
    });

    setSelectedElement(element);
    dispatch(updateElement(element));
  };

  const handleMouseUp = () => {
    setAction(null);
    setSelectedElement(null);
  };

  return (
    <>
      <Menu />
      <canvas
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        ref={canvasRef}
        width={window.innerWidth}
        height={window.innerHeight}
      />
    </>
  );
};

export default Whiteboard;
