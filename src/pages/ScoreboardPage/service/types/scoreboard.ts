import { TableScore } from './_scoreboard';


export interface TableScoreAttr {
  row: string,
  col: [any, number?],
  value: string,

}

export interface TableScoreRes {
  typeEvalution: string;
  data: Datum[];
  classId: string;
}

export interface Datum {
  studentName: string;
  studentId: string;
  scores: Score[];
  id: string;
  EvaluationSheetId: string;
}

export interface Score {
  talent?: string;
  subjectType: string;
  subjectName?: string | string;
  subjectId?: string | string;
  subjectGroupName?: (null | string)[];
  subjectGroupId?: (null | string)[];
  score?: number | string;
  id?: string;
  evaluationType?: string | string;
  evaluationComment?: string;
}
