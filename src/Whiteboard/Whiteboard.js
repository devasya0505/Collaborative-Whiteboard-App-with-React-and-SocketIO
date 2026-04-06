import React, { useRef, useLayoutEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Menu from "./Menu";
import rough from "roughjs/bundled/rough.esm";
import { toolTypes } from "../constants";
import {
  createElement,
  drawElement,
  adjustmentRequired,
  adjustElementCoordinates,
} from "./utils";
import { v4 as uuid } from "uuid";
import { updateElement as updateElementInStore } from "./whiteboardSlice";

const Whiteboard = () => {
  const canvasRef = useRef();

  const toolType = useSelector((state) => state.whiteboard.tool);
  const elements = useSelector((state) => state.whiteboard.elements);

  const [action, setAction] = useState(null);
  const [selectedElement, setSelectedElement] = useState(null);

  const dispatch = useDispatch();

  // 🔥 DRAW FROM REDUX STATE
  useLayoutEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const roughCanvas = rough.canvas(canvas);

    elements.forEach((element) => {
      drawElement({ roughCanvas, context: ctx, element });
    });
  }, [elements]);

  const handleMouseDown = (event) => {
    const { clientX, clientY } = event;

    if (toolType === toolTypes.RECTANGLE) {
      setAction("drawing");
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

  const handleMouseMove = (event) => {
    const { clientX, clientY } = event;

    if (action === "drawing" && selectedElement) {
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

  const handleMouseUp = () => {
    if (selectedElement) {
      const index = elements.findIndex((el) => el.id === selectedElement.id);

      if (index !== -1) {
        const element = elements[index];

        if (adjustmentRequired(element.toolType)) {
          const { x1, y1, x2, y2 } = adjustElementCoordinates(element);

          dispatch(
            updateElementInStore({
              id: element.id,
              x1,
              y1,
              x2,
              y2,
              toolType: element.toolType,
            }),
          );
        }
      }
    }

    setAction(null);
    setSelectedElement(null);
  };

  return (
    <>
      <Menu />
      <canvas
        ref={canvasRef}
        width={window.innerWidth}
        height={window.innerHeight}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
      />
    </>
  );
};

export default Whiteboard;