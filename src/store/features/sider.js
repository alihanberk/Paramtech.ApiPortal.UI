const { createSlice } = require("@reduxjs/toolkit");

const initialState = {
  list: {
    data: [],
    placeholder: "",
    searchFields: "name"
  }
}

export const siderSlice = createSlice({
  name: "sider",
  initialState,
  reducers: {
    setSiderProps: (state, action) => {
      state.list = action.payload
    },

    clearSiderProps: (state) => {
      state.list = initialState;
    }
  }
});

export const { setSiderProps, clearSiderProps } = siderSlice.actions;

export default siderSlice.reducer;