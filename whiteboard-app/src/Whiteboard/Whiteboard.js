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
import { emitElementUpdate } from "../socketConn/socketConn";

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

    if (
      toolType === toolTypes.RECTANGLE ||
      toolType === toolTypes.LINE ||
      toolType === toolTypes.PENCIL
    ) {
      setAction("drawing");
      const element = createElement({
        x1: clientX,
        y1: clientY,
        x2: clientX,
        y2: clientY,
        toolType,
        id: uuid(),
      });

      if (!element) return;

      setSelectedElement(element);
      dispatch(updateElementInStore(element));
      emitElementUpdate(element);
    }
  };

  const handleMouseMove = (event) => {
    const { clientX, clientY } = event;

    if (action !== "drawing" || !selectedElement) return;

    const index = elements.findIndex((el) => el.id === selectedElement.id);

    if (index === -1) return;

    const el = elements[index];

    // PENCIL (separate logic)
    if (el.toolType === toolTypes.PENCIL) {
      const updatedPoints = [
        ...(Array.isArray(el.points) ? el.points : []),
        [clientX, clientY],
      ];

      const updatedElement = {
        ...el,
        points: updatedPoints,
      };

      dispatch(updateElementInStore(updatedElement));
      emitElementUpdate(updatedElement);
      return;
    }

    // RECTANGLE / LINE
    const updatedElement = {
      id: el.id,
      x1: el.x1,
      y1: el.y1,
      x2: clientX,
      y2: clientY,
      toolType: el.toolType,
    };

    dispatch(updateElementInStore(updatedElement));
    emitElementUpdate(updatedElement);
  };

  const handleMouseUp = () => {
    if (selectedElement) {
      const index = elements.findIndex((el) => el.id === selectedElement.id);

      if (index !== -1) {
        const element = elements[index];

        if (adjustmentRequired(element.toolType)) {
          const { x1, y1, x2, y2 } = adjustElementCoordinates(element);

          const adjustedElement = {
            id: element.id,
            x1,
            y1,
            x2,
            y2,
            toolType: element.toolType,
          };

          dispatch(updateElementInStore(adjustedElement));
          emitElementUpdate(adjustedElement);
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
