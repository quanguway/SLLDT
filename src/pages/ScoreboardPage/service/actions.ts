import { PREFIX_ACTIONS } from './constants';
import { createAction, createAsyncAction } from '../../../services/actionConfigs';
import { Evalution, TScoreboardParamReq } from './apis';
import { TableScore } from './types/_scoreboard';
import { Score, TableScoreAttr } from './types/scoreboard';

const setColScoreboard = createAction<TableScoreAttr>(PREFIX_ACTIONS + 'SET_SCOREBOARD');

const setParam = createAction<{evaluation: keyof typeof Evalution}>(PREFIX_ACTIONS + 'SET_PARAM');

const getScoreboard = createAsyncAction<TScoreboardParamReq>(PREFIX_ACTIONS + 'GET_SCOREBOARD');

const getScoreboardDetail = createAsyncAction<TScoreboardParamReq>(PREFIX_ACTIONS + 'GET_SCOREBOARD_DETAIL');

const setScoreTable = createAction<TableScore[]>(PREFIX_ACTIONS + 'SET_SCORE_TABLE');

const updateRowScoreTable = createAction<{table: TableScore, score: Score}>(PREFIX_ACTIONS + 'updateRowScoreTable');



const scoreboardActions = {
  setColScoreboard,
  getScoreboard,
  setParam,
  setScoreTable,
  updateRowScoreTable,
  getScoreboardDetail
};

export default scoreboardActions;
