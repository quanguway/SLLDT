import { createSlice } from '@reduxjs/toolkit';
import { NAME_REDUCER } from './constants';
import { IState } from './types/reducer';
import actions from './actions';

const initialState: IState = {
  absenceParent: []

};

export const Slice = createSlice({
  name: NAME_REDUCER,
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(actions.getAbsenceParent.success, (state, { payload }) => {
      state.absenceParent = payload;      
    });
  },
});
const absenceServiceReducer = Slice.reducer;
export default absenceServiceReducer;
