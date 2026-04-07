import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  tool: null,
  elements: [],
};

const whiteboardSlice = createSlice({
  name: "whiteboard",
  initialState,
  reducers: {
    setToolType: (state, action) => {
      state.tool = action.payload;
    },

    updateElement: (state, action) => {
      if (!action.payload) return; // ✅ prevents crash

      const index = state.elements.findIndex(
        (el) => el.id === action.payload.id,
      );

      if (index === -1) {
        state.elements.push(action.payload);
      } else {
        state.elements[index] = action.payload;
      }
    },

    setElements: (state, action) => {
      state.elements = action.payload;
    },
  },
});

export const { setToolType, updateElement, setElements } =
  whiteboardSlice.actions;

export default whiteboardSlice.reducer;
