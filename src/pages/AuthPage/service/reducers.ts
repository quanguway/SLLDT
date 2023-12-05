import { createSlice } from '@reduxjs/toolkit';
import { NAME_REDUCER } from './constants';
import { IState } from './types/reducer';
import actions from './actions';

const initialState: IState = {
  access_token: '',
  user_data: {}

};

export const Slice = createSlice({
  name: NAME_REDUCER,
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(actions.login.success, (state, { payload }) => {
      const data = payload;      
      
      state.access_token = data?.token ?? null;
      state.user_data = data;
    }).addCase(actions.setToken, (state, { payload }) => {      
      state.access_token = payload;
    });
  },
});
const authServiceReducer = Slice.reducer;
export default authServiceReducer;
