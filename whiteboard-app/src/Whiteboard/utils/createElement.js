import { toolTypes } from "../../constants";

export const createElement = ({ x1, y1, x2, y2, toolType, id }) => {
  if (!toolType) return null;

  switch (toolType) {
    case toolTypes.RECTANGLE:
      return { id, toolType, x1, y1, x2, y2 };

    case toolTypes.LINE:
      return { id, toolType, x1, y1, x2, y2 };

    default:
      console.error("Invalid toolType:", toolType);
      return null;
  }
};