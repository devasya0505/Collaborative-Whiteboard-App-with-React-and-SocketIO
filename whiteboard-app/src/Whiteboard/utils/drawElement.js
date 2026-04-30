import { toolTypes } from "../../constants";
import getStroke from "perfect-freehand";
import { getSvgPathFromStroke } from ".";

export const drawElement = ({ roughCanvas, context, element }) => {
  if (!element || !element.toolType) return;

  const { x1, y1, x2, y2, toolType } = element;

  switch (toolType) {
    case toolTypes.RECTANGLE:
      roughCanvas.rectangle(x1, y1, x2 - x1, y2 - y1);
      break;

    case toolTypes.LINE:
      roughCanvas.line(x1, y1, x2, y2);
      break;

    case toolTypes.PENCIL: {
      const { points } = element;

      if (!Array.isArray(points) || points.length === 0) return;

      const stroke = getStroke(points, { size: 10 });
      const pathData = getSvgPathFromStroke(stroke);

      const path = new Path2D(pathData);
      context.fill(path);
      break;
    }

    case toolTypes.TEXT:
      context.textBaseline = "top";
      context.font = "24px sans-serif";
      context.fillText(element.text || "", element.x1, element.y1);
      break;

    default:
      console.error("Invalid toolType:", toolType);
  }
};
