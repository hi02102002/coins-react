import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { instanceCoins } from 'api';

export const fetchCoin = createAsyncThunk('coin/fetchCoin', async id => {
  const response = await instanceCoins.get(`/coin/${id}`);
  return response.data.data.coin;
});

const initialState = {
  coin: {},
  isLoading: false,
  isError: null,
};

const coinSlice = createSlice({
  name: 'coin',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchCoin.pending, state => {
        state.isLoading = true;
      })
      .addCase(fetchCoin.fulfilled, (state, action) => {
        state.isLoading = false;
        state.coin = action.payload;
      })
      .addCase(fetchCoin.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.error.message;
      });
  },
});

export const coinActions = coinSlice.actions;
export default coinSlice;
