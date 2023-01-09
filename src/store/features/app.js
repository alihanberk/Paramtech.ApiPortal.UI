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
);

const initialState = {
  token: {
    key: null,
    runAnimation: true
  },
  requestResponse: {},
  requestLanguage: "bash",
  environment: undefined,
  authorizedWarning: false,
  descriptionVisible: false,
  brandVisible: false,
  currentKey: null,
}

export const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    setAppState: (state, action) => {
      state[action.payload.key] = action.payload.data;
    },
    clearData: (state, action) => {
      action.payload.forEach(x => (state[x] = initialState[x]))
    },
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
  setAppState,
  clearData
} = appSlice.actions;

export default appSlice.reducer;
