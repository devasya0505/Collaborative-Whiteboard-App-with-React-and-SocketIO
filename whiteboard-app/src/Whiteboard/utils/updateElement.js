import { createElement } from ".";
import { toolTypes } from "../../constants";
import { emitElementUpdate } from "../../socketConn/socketConn";
import { store } from "../../store/store";
import { setElements } from "../whiteboardSlice";

export const updateElement = (
  { id, x1, x2, y1, y2, type, index },
  elements,
) => {
  const elementsCopy = [...elements];

  switch (type) {
    case toolTypes.LINE:
    case toolTypes.RECTANGLE:
      const updatedElement = createElement({
        id,
        x1,
        y1,
        x2,
        y2,
        toolType: type,
      });

    case toolTypes.PENCIL:
      elementsCopy[index] = {
        ...elementsCopy[index],
        points: [
          ...elementsCopy[index].points,
          {
            x: x2,
            y: y2,
          },
        ],
      };

      const updatedPencilElement = elementsCopy[index];

      store.dispatch(setElements(elementsCopy));

      emitElementUpdate(updatedPencilElement);
      break;
    default:
      throw new Error("Something went wrong when updating element");
  }
};
