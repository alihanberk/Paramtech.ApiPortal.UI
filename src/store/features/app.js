import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import service from "store/service";

export const submitRequest = createAsyncThunk("exampleRequest",
  async (payload, thunkApi) => {
    try {
      const response = await service[payload.method](payload);
      return response;
    }
    catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  }
)

export const appSlice = createSlice({
  name: "app",
  initialState: {
    parameters: [],
    headerParams: [],
    token: null,
    warning: {},
    drawerVisible: false,
    requestResponse: {},
    responseContent: null,
    responseModelVisibility: [],
    requestBody: null,
    requestLanguage: "bash",
    environment: "test",
    authorizedWarning: false,
    descriptionVisible: false,
    brandVisible: false,
    currentKey: null,
  },
  reducers: {
    setParameters: (state, action) => {
      state.parameters = action.payload;
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
    },
    clearResponse: (state, action) => {
      state.requestResponse = {}
    },
    setResponseContent: (state, action) => {
      state.responseContent = action.payload
    },
    setModelVisibility: (state, action) => {
      state.responseModelVisibility = action.payload
    },
    setRequestBody: (state, action) => {
      state.requestBody = action.payload
    },
    changeRequestLanguage: (state, action) => {
      state.requestLanguage = action.payload
    },
    clearData: (state, action) => {
      action.payload.forEach(x => (state[x.key] = x.initialState))
    },
    setEnvironment: (state, action) => {
      state.environment = action.payload
    },
    setAuthorizedWarning: (state, action) => {
      state.authorizedWarning = action.payload
    },
    setDescriptionsVisible: (state, action) => {
      state.descriptionVisible = action.payload
    },
    setBrandVisible: (state, action) => {
      state.brandVisible = action.payload
    },
    setCurrentKey: (state, action) => {
      state.currentKey = action.payload;
    }
  },

  extraReducers: builder => {
    builder.addCase(submitRequest.rejected, (state, action) => {
      state.requestResponse = action.payload;
    })
    builder.addCase(submitRequest.fulfilled, (state, action) => {
      state.requestResponse = action.payload;
    })
  }
});

export const {
  setEnvironment,
  setParameters,
  setHeaders,
  setToken,
  setWarning,
  setDrawerVisible,
  setResponseContent,
  setModelVisibility,
  clearData,
  setRequestBody,
  changeRequestLanguage,
  setAuthorizedWarning,
  setDescriptionsVisible,
  setBrandVisible,
  setCurrentKey
} = appSlice.actions;

export default appSlice.reducer;
