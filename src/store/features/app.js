import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import service from "store/service";

export const getApiDocumentation = createAsyncThunk("apiDocumentation/get",
  async (endpoint, thunkApi) => {
    try {
      const response = await service.get(endpoint);
      return response.data;
    }
    catch (error) {
      return thunkApi.rejectWithValue(error.response.data);
    }
  }
);

export const appSlice = createSlice({
  name: "app",
  initialState: {
    currentOrganization: null,
    currentProduct: null,
    currentEndpoint: null,
    apiDocumentation: {},
    normalizedApiDocumentation: {}
  },
  reducers: {
    setCurrentOrganization: (state, action) => {
      state.currentOrganization = action.payload
    },
    setCurrentProduct: (state, action) => {
      state.currentProduct = action.payload
    },
    setCurrentEndpoint: (state, action) => {
      state.currentEndpoint = action.payload
    }
  },
  extraReducers: builder => {
    builder.addCase(getApiDocumentation.fulfilled, (state, action) => {
      state.apiDocumentation = action.payload;

      const tags = [];
      Object.values(action.payload.paths).forEach(paths => {
        Object.values(paths).forEach(path => {
          path.tags.forEach(tag => {
            if (!tags.includes(tag))
              tags.push(tag);
          });
        })
      });

      state.normalizedApiDocumentation = {
        tags
      }
    });
  }
});

export const { setCurrentOrganization, setCurrentProduct, setCurrentEndpoint } = appSlice.actions;

export default appSlice.reducer;
