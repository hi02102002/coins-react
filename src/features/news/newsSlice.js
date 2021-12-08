import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { instanceNews } from 'api';

export const fetchNews = createAsyncThunk(
  'news/fetchNews',
  async ({ query, count }) => {
    const response = await instanceNews(query, count).get('/news/search');
    return response.data.value;
  }
);

const initialState = {
  news: [],
  isLoading: false,
  isError: null,
};

const newsSlice = createSlice({
  name: 'news',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchNews.pending, state => {
        state.isLoading = true;
      })
      .addCase(fetchNews.fulfilled, (state, action) => {
        state.isLoading = false;
        state.news = action.payload;
      })
      .addCase(fetchNews.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.error.message;
      });
  },
});

export default newsSlice;
