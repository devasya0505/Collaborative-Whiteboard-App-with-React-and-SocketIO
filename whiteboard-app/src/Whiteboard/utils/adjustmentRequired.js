import { toolTypes } from "../../constants";

export const adjustmentRequired = (toolType) => {
  return toolType === toolTypes.RECTANGLE;
};
