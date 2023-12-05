import { createSlice } from '@reduxjs/toolkit';
import actions from './actions';
import { NAME_REDUCER } from './constants';

const initialState = {
  studentList: [],
  studentListPaginate: {},
  studentDetail: null,
  params: {},
};

export const Slice = createSlice({
  name: NAME_REDUCER,
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder

      // .addCase(actions.setstudentListParams, (state, { payload }) => {
      //   const _params = payload as IstudentParam;
      //   const params = {
      //     ...state.params ?? {},
      //     ..._params
      //   };

      //   if (params.keyword === undefined || params.keyword === null) {
      //     delete params.keyword;
      //   }
      //   if (params.page === undefined || params.page === null) {
      //     params.page = 1;
      //   }

      //   if (params.per_page === undefined || params.per_page === null) {
      //     params.per_page = 10;
      //   }

      //   state.params = params;
      // })
      .addCase(actions.getListStudent.success, (state, { payload }) => {
        const data = payload;
        state.studentList = data;
      })
      .addCase(actions.getDetailStudent.success, (state, { payload }) => {
        const data = payload;
        state.studentDetail = data;
      });

  },
});
const studentServiceReducer = Slice.reducer;
export default studentServiceReducer;
