import { toolTypes } from "../../constants";

export const createElement = ({ x1, y1, x2, y2, toolType, id }) => {
  switch (toolType) {
    case toolTypes.RECTANGLE:
      return {
        id,
        toolType,
        x1,
        y1,
        x2,
        y2,
      };

    default:
      throw new Error("Something went wrong when creating element");
  }
};