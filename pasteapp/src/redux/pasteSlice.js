import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  pastes: JSON.parse(localStorage.getItem("pastes")) || [],
};

const saveToLocal = (pastes) => {
  localStorage.setItem("pastes", JSON.stringify(pastes));
};

const pasteSlice = createSlice({
  name: "paste",
  initialState,
  reducers: {
    addPaste: (state, action) => {
      state.pastes.push(action.payload);
      saveToLocal(state.pastes);
    },

    deletePaste: (state, action) => {
      state.pastes = state.pastes.filter(p => p.id !== action.payload);
      saveToLocal(state.pastes);
    },

    updatePaste: (state, action) => {
      const { id, content } = action.payload;
      const paste = state.pastes.find(p => p.id === id);
      if (paste) {
        paste.content = content;
      }
     localStorage.setItem("pastes", JSON.stringify(state.pastes));
    }
  }
});

export const { addPaste, deletePaste, updatePaste } = pasteSlice.actions;
export default pasteSlice.reducer;