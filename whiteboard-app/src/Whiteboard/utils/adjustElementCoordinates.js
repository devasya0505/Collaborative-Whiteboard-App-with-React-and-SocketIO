import { toolTypes } from "../../constants";

export const adjustElementCoordinates = (element) => {
  const { x1, y1, x2, y2, toolType } = element;

  switch (toolType) {
    case toolTypes.RECTANGLE:
      return {
        x1: Math.min(x1, x2),
        y1: Math.min(y1, y2),
        x2: Math.max(x1, x2),
        y2: Math.max(y1, y2),
      };

    default:
      return { x1, y1, x2, y2 };
  }
};