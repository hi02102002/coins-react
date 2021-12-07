import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { instanceCoins } from 'api';

export const fetchCoins = createAsyncThunk('coins/fetchCoins', async count => {
  console.log(count);
  const response = await instanceCoins.get(`/coins?limit=${count}`);
  return response.data.data.coins;
});

const initialState = {
  coins: [],
  isLoading: false,
  isError: null,
};

const coinsSlice = createSlice({
  name: 'coins',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchCoins.pending, state => {
        state.isLoading = true;
      })
      .addCase(fetchCoins.fulfilled, (state, action) => {
        state.isLoading = false;
        state.coins = action.payload;
      })
      .addCase(fetchCoins.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.error.message;
      });
  },
});

export const coinActions = coinsSlice.actions;
export default coinsSlice;
