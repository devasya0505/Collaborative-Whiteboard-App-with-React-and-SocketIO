// import { toolTypes } from "../../constants";

// export const adjustmentRequired = (toolType) => {
//   return toolType === toolTypes.RECTANGLE;
// };


import { toolTypes } from "../../constants";

export const adjustmentRequired = (type) =>
  [toolTypes.RECTANGLE, toolTypes.LINE].includes(type);
