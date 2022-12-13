const { createSlice } = require("@reduxjs/toolkit");

export const languageSlice = createSlice({
  name: "lang",
  initialState: {
    language: "tr"
  },
  reducers: {
    changeLanguage: (state, action) => {
      state.language = action.payload
    }
  }
});

export const { changeLanguage } = languageSlice.actions;

export default languageSlice.reducer;