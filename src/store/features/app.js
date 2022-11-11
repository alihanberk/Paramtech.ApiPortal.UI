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
    normalizedApiDocumentation: {},
    parameters: [],
    headerParams: [],
    token: null,
    warning: {},
    drawerVisible: false,
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
    },
    setParameters: (state, action) => {
      state.parameters = action.payload
    },
    setHeaders: (state, action) => {
      state.headerParams = action.payload
    },
    setToken: (state, action) => {
      state.token = action.payload
    },
    setWarning: (state, action) => {
      state.warning = action.payload
    },
    setDrawerVisible: (state, action) => {
      state.drawerVisible = action.payload
    }
  },
  extraReducers: builder => {
    builder.addCase(getApiDocumentation.fulfilled, (state, action) => {
      state.apiDocumentation = action.payload;

      const tags = [],
        data = [];
      for (const [apiKey, paths] of Object.entries(action.payload.paths)) {
        for (const [key, value] of Object.entries(paths)) {
          value.tags.forEach(tag => {
            if (data[tag]) {
              data[tag].push({ method: key, data: value, endpoint: apiKey });
            }
            else {
              data[tag] = [{ method: key, data: value, endpoint: apiKey }]
            }
            if (!tags.includes(tag))
              tags.push(tag);
          });
        }
      };

      state.normalizedApiDocumentation = {
        tags,
        data
      }
    });
  }
});

export const { setCurrentOrganization, setCurrentProduct, setCurrentEndpoint, setParameters, setHeaders, setToken, setWarning, setDrawerVisible } = appSlice.actions;

export default appSlice.reducer;
