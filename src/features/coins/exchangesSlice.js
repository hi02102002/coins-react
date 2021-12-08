import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { instanceCoins } from 'api';

export const fetchExchanges = createAsyncThunk(
  'exchanges/fetchExchanges',
  async () => {
    const response = await instanceCoins.get('/exchanges');
    return response.data.data.exchanges;
  }
);

const initialState = {
  exchanges: [],
  isLoading: false,
  isError: null,
};

const exChangesSlice = createSlice({
  name: 'globalStats',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchExchanges.pending, state => {
        state.isLoading = true;
      })
      .addCase(fetchExchanges.fulfilled, (state, action) => {
        state.isLoading = false;
        state.exchanges = action.payload;
      })
      .addCase(fetchExchanges.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.error.message;
      });
  },
});

export const coinActions = exChangesSlice.actions;
export default exChangesSlice;
