import { get } from 'lodash';
import { RootState } from '../../../store';
import { useAppSelector } from '../../../store/hooks';
// import { calculateAverage } from '../../../utils/unit';
import { Datum, TableScoreRes } from './types/scoreboard';
import { IState } from './types/reducer';
import { TableScore } from './types/_scoreboard';



type MyState = RootState['scoreboard'];

const getCurrentState = (state: RootState): MyState => state.scoreboard;

const selector = <T = MyState>(key: keyof T, defaultValue?: any) => useAppSelector(state => get(getCurrentState(state), key, defaultValue));

const getParams = () => selector('params') as IState['params'];

const getScoreboard = () => { 
  return selector('scoreboard') as TableScoreRes;
  // return data.map(o => {
  //   const finalScore = (
  //     calculateAverage(o.spokenExamScore as number[]) + 
  //     calculateAverage(o._15MExamScore as number[]) +
  //     calculateAverage(o._1SessionExamScore as number[]) + 
  //     (o.finalScore ?? 0)) / 4;
  //   return {
  //     ...o,
  //     finalScore: finalScore,
  //   };}) ?? [];
};

const getScoreboardDetail = () => selector('scoreboardDetail') as Datum[];

const getTableScore = () => selector('scoreboardTable') as TableScore[];


const scoreboardSelectors = {
  getScoreboard,
  getParams,
  getTableScore,
  getScoreboardDetail
};
export default scoreboardSelectors;
