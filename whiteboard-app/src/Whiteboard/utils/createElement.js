import { toolTypes } from "../../constants";

export const createElement = ({ x1, y1, x2, y2, toolType, id, text }) => {
  if (!toolType) return null;

  switch (toolType) {
    case toolTypes.RECTANGLE:
      return { id, toolType, x1, y1, x2, y2 };

    case toolTypes.LINE:
      return { id, toolType, x1, y1, x2, y2 };

    case toolTypes.PENCIL:
      return {
        id,
        toolType,
        points: [[x1, y1]],
      };

    case toolTypes.TEXT:
      return { id, type: toolType, x1, y1, text: text || "" };

    default:
      console.error("Invalid toolType:", toolType);
      return null;
  }
};
