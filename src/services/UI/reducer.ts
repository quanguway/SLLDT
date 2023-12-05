import { createSlice } from '@reduxjs/toolkit';
import actions from './actions';
import { set } from 'lodash';

const initialState: Record<any, any> = {
  refreshToken: true,
  collapseSidebar: true,
  showModal: false,
};

export const Slice = createSlice({
  name: 'ui',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(actions.setLoading, (state, { payload }) => {
      const { path, result } = payload as { path: string, result: boolean };
      set(state, path, result);
    }).addCase(actions.setLoadingPage, (state, { payload }) => {
      set(state, 'loadingApp', payload);
    }).addCase(actions.setCollapseSidebar, (state, { payload }) => {
      state.collapseSidebar = payload;
    }).addCase(actions.setShowModal, (state,{payload}) => {
      state.showModal = payload;
    });
  },
});
const uiServiceReducer = Slice.reducer;
export default uiServiceReducer;
