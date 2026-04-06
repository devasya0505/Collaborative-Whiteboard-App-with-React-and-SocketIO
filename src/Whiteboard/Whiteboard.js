import React, { useRef, useLayoutEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Menu from "./Menu";
import rough from "roughjs/bundled/rough.esm";
import { actions, toolTypes } from "../constants";
import { createElement } from "./utils";
import { v4 as uuid } from "uuid";
import { updateElement as updateElementInStore } from "./whiteboardSlice";

let selectedElement;

const setSelectedElement = (e1) => {
  selectedElement = e1;
};

const Whiteboard = () => {
  const canvasRef = useRef();
  const toolType = useSelector((state) => state.whiteboard.tool);
  const elements = useSelector((state) => state.whiteboard.elements);

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
    dispatch(updateElementInStore(element));
  };

  const handleMouseUp = () => {
    setAction(null);
    setSelectedElement(null);
  };

  const handleMouseMove = (event) => {
    const { clientX, clientY } = event;

    if (action === actions.DRAWING) {
      const index = elements.findIndex((el) => el.id === selectedElement.id);

      if (index !== -1) {
        dispatch(
          updateElementInStore({
            id: elements[index].id,
            x1: elements[index].x1,
            y1: elements[index].y1,
            x2: clientX,
            y2: clientY,
            toolType: elements[index].toolType,
          }),
        );
      }
    }
  };

  return (
    <>
      <Menu />
      <canvas
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseMove={handleMouseMove}
        ref={canvasRef}
        width={window.innerWidth}
        height={window.innerHeight}
      />
    </>
  );
};

export default Whiteboard;
