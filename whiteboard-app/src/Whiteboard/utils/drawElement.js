import { toolTypes } from "../../constants";

export const drawElement = ({ roughCanvas, element }) => {
  const { x1, y1, x2, y2, toolType } = element;

  switch (toolType) {
    case toolTypes.RECTANGLE:
      roughCanvas.rectangle(
        x1,
        y1,
        x2 - x1,
        y2 - y1
      );
      break;

    case toolTypes.LINE:
      roughCanvas.line(x1, y1, x2, y2);
      break;

    default:
      throw new Error("Error drawing element");
  }
};