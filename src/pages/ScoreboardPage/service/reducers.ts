import { createSlice } from '@reduxjs/toolkit';
import { NAME_REDUCER } from './constants';
import { IState } from './types/reducer';
import actions from './actions';
import { Datum } from './types/scoreboard';

const initialState: IState = {
  scoreboard: null,
  scoreboardDetail: null,
  scoreboardTable: [],
  params: {
    evaluation: 'GIUA_HK_1'
  }
};

// const col = [
//   {
//     index: 1,
//     name: ''
//   }
// ];

export const Slice = createSlice({
  name: NAME_REDUCER,
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
    .addCase(actions.getScoreboard.success, (state, { payload }) => {      
      const data = {
        ...payload,
        data: payload.data
        ?.sort((o1: Datum, o2: Datum) => o1?.studentName?.split(' ')[o1?.studentName?.split(' ').length - 1]
        .localeCompare(o2?.studentName?.split(' ')[o2?.studentName?.split(' ').length - 1]) ?? 1 )
      };
      state.scoreboard = data;
    })
    .addCase(actions.setParam, (state, { payload }) => {            
      state.params = payload;
    })
    .addCase(actions.getScoreboardDetail.success, (state, { payload }) => {            
      state.scoreboardDetail = payload;
    })
    .addCase(actions.updateRowScoreTable, (state, { payload }) => {  
      
      const {table, score} = payload;    
      state.scoreboardTable = state.scoreboardTable.map(o => {
        if(o.studentCode === table.studentCode) {
          
          return {
            ...o,
            ...table
          };
        }
        return o;
      });

      // Chỉnh sửa bảng điểm đề save bẳng điểm

      const scoreIdx = state.scoreboard?.data[
        state.scoreboard?.data.findIndex(o => o.studentId === table.studentCode)].scores.findIndex(o => o.subjectId === score.subjectId);
        
      if(scoreIdx !== -1) {
        state.scoreboard?.data[
          state.scoreboard?.data.findIndex(o => o.studentId === table.studentCode)].scores.forEach((o, index) => {
            if(o.subjectId === score.subjectId) {   

              const data = {
                ...o,
                ...score
              };

              state.scoreboard?.data[
                state.scoreboard?.data.findIndex(o => o.studentId === table.studentCode)].scores.splice(index, 1);
              state.scoreboard?.data[
                state.scoreboard?.data.findIndex(o => o.studentId === table.studentCode)].scores.push(data);
            }
            return o;
        });

      } else {
        state.scoreboard?.data[
          state.scoreboard?.data.findIndex(o => o.studentId === table.studentCode)].scores.push(score);
      }

    })
    .addCase(actions.setScoreTable, (state, { payload }) => {     
      state.scoreboardTable = payload;
    });
  },
});
const scoreboardServiceReducer = Slice.reducer;
export default scoreboardServiceReducer;
