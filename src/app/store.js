import { configureStore } from '@reduxjs/toolkit';
import coinsSlice from 'features/coins/coinsSlice';
import exChangesSlice from 'features/coins/exchangesSlice';
import globalStatsSlice from 'features/coins/globalStatsSlice';
import newsSlice from 'features/news/newsSlice';
import uiSlice from 'features/ui/uiSlice';

const store = configureStore({
  reducer: {
    globalStats: globalStatsSlice.reducer,
    ui: uiSlice.reducer,
    coins: coinsSlice.reducer,
    news: newsSlice.reducer,
    exchanges: exChangesSlice.reducer,
  },
});

export default store;
