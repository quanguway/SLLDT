import { Evalution } from '../apis';
import { TableScore } from './_scoreboard';
import { Datum, TableScoreRes } from './scoreboard';

export interface IState {
  scoreboard: TableScoreRes | null;
  scoreboardDetail: Datum | null;
  scoreboardTable: TableScore[];
  params: {
    evaluation: keyof typeof Evalution;
  }
}