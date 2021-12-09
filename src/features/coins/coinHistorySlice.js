import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { instanceCoins } from 'api';

export const fetchCoinHistory = createAsyncThunk(
  'coins/fetchCoinHistory',
  async ({ id, timePeriod }) => {
    const response = await instanceCoins.get(
      `/coin/${id}/history/${timePeriod}`
    );
    return response.data.data.history;
  }
);

const initialState = {
  history: [],
  isLoading: false,
  isError: null,
};

const coinHistorySlice = createSlice({
  name: 'history',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchCoinHistory.pending, state => {
        state.isLoading = true;
      })
      .addCase(fetchCoinHistory.fulfilled, (state, action) => {
        state.isLoading = false;
        state.history = action.payload;
      })
      .addCase(fetchCoinHistory.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.error.message;
      });
  },
});

export const coinHistoryActions = coinHistorySlice.actions;
export default coinHistorySlice;
