import { createSlice } from '@reduxjs/toolkit';
import actions from './actions';
import { NAME_REDUCER } from './constants';

const initialState = {
  lesionList: [],
  lessonParentDetail: []
  // studentListPaginate: {},
  // studentDetail: null,
  // params: {},
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
      //   }s

      //   state.params = params;
      // })
      .addCase(actions.getListLesion.success, (state, { payload }) => {
        const data = payload;
        state.lesionList = data;
      })
      .addCase(actions.setDetailParentReportLesion, (state, { payload }) => {
        const data = payload;
        state.lessonParentDetail = data as any;
      });
      // .addCase(actions.getDetailStudent.success, (state, { payload }) => {
      //   const data = payload;
      //   state.studentDetail = data;
      // });

  },
});
const lesionServiceReducer = Slice.reducer;
export default lesionServiceReducer;
