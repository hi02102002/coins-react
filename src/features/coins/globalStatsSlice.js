import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { instanceCoins } from 'api';

export const fetchGlobalStats = createAsyncThunk(
  'globalStats/fetchGlobalStats',
  async () => {
    const response = await instanceCoins.get('/stats');
    return response.data.data;
  }
);

const initialState = {
  globalStats: {},
  isLoading: false,
  isError: null,
};

const globalStatsSlice = createSlice({
  name: 'globalStats',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchGlobalStats.pending, state => {
        state.isLoading = true;
      })
      .addCase(fetchGlobalStats.fulfilled, (state, action) => {
        state.isLoading = false;
        state.globalStats = action.payload;
      })
      .addCase(fetchGlobalStats.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.error.message;
      });
  },
});

export const coinActions = globalStatsSlice.actions;
export default globalStatsSlice;
