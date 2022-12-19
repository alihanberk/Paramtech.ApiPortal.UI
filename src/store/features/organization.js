const { createSlice } = require("@reduxjs/toolkit");

const initialState = {
  currentOrganization: null,
  currentProduct: null,
  currentEndpoint: null,
  currentTag: null,
}

export const organizationSlice = createSlice({
  name: "organization",
  initialState,
  reducers: {
    setCurrentOrganization: (state, action) => {
      state.currentOrganization = action.payload
    },
    setCurrentProduct: (state, action) => {
      state.currentProduct = action.payload
    },
    setCurrentEndpoint: (state, action) => {
      state.currentEndpoint = action.payload
    },
    setCurrentTag: (state, action) => {
      state.currentTag = action.payload
    },


    clearOrganizationState: (state, action) => {
      action.payload.map(field => state[field] = null);
    }
  }
});

export const { setCurrentOrganization, setCurrentProduct, setCurrentEndpoint, setCurrentTag, clearOrganizationState } = organizationSlice.actions;

export default organizationSlice.reducer;