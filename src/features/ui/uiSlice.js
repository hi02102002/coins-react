import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  loading: false,
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    setLoading(state) {
      state.loading = true;
    },
    setLoaded(state) {
      state.loading = false;
    },
  },
});

export const uiActions = uiSlice.actions;
export default uiSlice;
