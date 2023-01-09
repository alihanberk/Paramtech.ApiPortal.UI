import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import ErrorHandling from "store/errorHandling";
import service from "store/service";

const initialState = {
  loading: false,
  data: [],
  normalizedData: []
}

export const getDocumentation = createAsyncThunk("documentation/get",
  async (endpoint, thunkApi) => {
    try {
      const response = await service.getRequest(endpoint);
      return response.data;
    }
    catch (error) {
      return thunkApi.rejectWithValue(error.response.data);
    }
  }
);

export const documantation = createSlice({
  name: "documantation",
  initialState,
  reducers: {
    clearDocumentation: (state, action) => initialState
  },
  extraReducers: builder => {
    builder.addCase(getDocumentation.pending, state => ({ loading: true, data: [], normalizedData: [] }));

    builder.addCase(getDocumentation.rejected, (state, action) => {
      ErrorHandling({ message: action.error.message });
      return { loading: false, data: [], normalizedData: [] }
    });

    builder.addCase(getDocumentation.fulfilled, (state, action) => {
      const
        tags = [],
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
            if (!tags.find(x => x.name === tag))
              tags.push({ name: tag, key: tag, endpoint: apiKey });
          });
        }
      };
      return { loading: false, data: action.payload, normalizedData: { data, tags } }
    })
  }
});

export const { clearDocumentation } = documantation.actions;

export default documantation.reducer;