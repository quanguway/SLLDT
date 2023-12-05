import { createSlice } from '@reduxjs/toolkit';
import { NAME_REDUCER } from './constants';
import { IState } from './types/reducer';
import actions from './actions';

const initialState: IState = {
  attendanceDetail: [],

};

export const Slice = createSlice({
  name: NAME_REDUCER,
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
    .addCase(actions.getAttendanceDetail.success, (state, { payload }) => {      
      state.attendanceDetail = payload;
    })
    .addCase(actions.checkAttendance, (state, { payload }) => {      
      const {studentId, isCheck} = payload;
      state.attendanceDetail = state.attendanceDetail.map(o => {
        if(o.MaHocSinh__c === studentId) {
          return {
            ...o,
            VangMat__c: isCheck
          };
        }
        return o;
      });
    });

  },
});
const attendanceServiceReducer = Slice.reducer;
export default attendanceServiceReducer;
