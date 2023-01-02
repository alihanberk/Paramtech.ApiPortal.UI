const { createSlice } = require("@reduxjs/toolkit");

const
  initialState = [],
  parameterInitialState = {
    parameters: [],
    bodyParametersKey: "",
    bodyParameters: {}
  };


export const currentParameters = createSlice({
  name: "currentParameters",
  initialState,
  reducers: {
    setCurrentParameters: (state, action) => {
      if (state[action.payload.key]) {
        state[action.payload.key] = { ...state[action.payload.key], ...action.payload.data };
      }
      else {
        return { ...state, ...{ [action.payload.key]: { ...parameterInitialState, ...action.payload.data } } };
      }
    }
  }
});

export const { setCurrentParameters } = currentParameters.actions;

export default currentParameters.reducer;