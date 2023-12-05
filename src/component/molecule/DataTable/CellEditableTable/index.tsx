import { useEffect, useState } from 'react';
import {  Tooltip } from 'antd';
import { MESSAGE, checkNumberScore } from '../../../../utils/unit';
import { useAppDispatch } from '../../../../store/hooks';
import scoreboardActions from '../../../../pages/ScoreboardPage/service/actions';
import { TableScore } from '../../../../pages/ScoreboardPage/service/types/_scoreboard';
import { Score } from '../../../../pages/ScoreboardPage/service/types/scoreboard';
import { ELessonType } from '../../../../pages/ScoreboardPage/widgets/ButtonImport';

interface Props {
  name: string;
  record: TableScore;
  value: any;
}

// const typeIndex = [
//   {
//     key: 0,
//     type: 'talent',
//   },
//   {
//     key: 1,
//     type: 'subjectId',
//   },
//   {
//     key: 3,
//     type: 'evaluationComment'
//   }
// ];


const CellEditableTable = ({name, record, value}: Props) => {
  const [openError, setOpenError] = useState<boolean>(false);
  const dispatch = useAppDispatch();


  useEffect(() => {    
    if(!value || value === 0 || value === '' || isNaN(+value) ) return;

    if(checkNumberScore(value)) {
      setOpenError(false);      
      // setValueSemesterCore(value);
      return;
    } 
    setOpenError(true);
  },[value]);


//   evaluationComment(pin):"Học sinh có khả năng tư duy"
// evaluationType(pin):"SCORE"
// id(pin):"a0H5j000005vdL8EAI"
// score(pin):10
// subjectGroupId(pin):null
// subjectGroupName(pin):null
// subjectId(pin):"TOAN"
// subjectName(pin):"Toán"
// subjectType(pin):"SUBJECT"
// talent(pin):"Hoàn thành tốt"

// {
//   "subjectType": "SUBJECT",
//   "subjectId": "NANG_LUC_1",
//   "evaluationType": "TALENT",
//   "talent": "Tốt"
// },
// {
//   "subjectType": "GROUP",
//   "subjectGroupId": "NANG_LUC",
//   "evaluationComment": "Có đạo đức tốt"
// }


  return (
    <>
      <Tooltip open={openError} title={MESSAGE._NUMBER_SCORE} color={'red'}>
        <input
          style={{
            outline: 'none',
            border: 'none',
            backgroundColor: 'transparent',
            width: '100%',
            textAlign: 'center'
          }}
          value={value ?? ''}
          onChange={(e) => {
            const data: TableScore = {};
            const index = name.split('-');
            // @ts-ignore
            data[name] = e.target.value;
            data['studentCode'] = record.studentCode;

            if(index[0] === ELessonType.LESSON) {
              const dataBody: Score = {
                subjectType: 'SUBJECT',
                subjectId: index[1],
                evaluationType:'SCORE',

                //@ts-ignore
                talent: name === `${ELessonType.LESSON}-${index[1]}-0` ? data[name] : record[`${ELessonType.LESSON}-${index[1]}-0`],
                //@ts-ignore
                evaluationComment: name === `${ELessonType.LESSON}-${index[1]}-2` ? data[name] : record[`${ELessonType.LESSON}-${index[1]}-2`],
                //@ts-ignore
                score: name === `${ELessonType.LESSON}-${index[1]}-1` ? Number(data[name]) : Number(record[`${ELessonType.LESSON}-${index[1]}-1`]),
              };

              dispatch(scoreboardActions.updateRowScoreTable({
                table: data,
                score: dataBody
              }));
            } 
            // else if (index[0] === ELessonType.QUALITY || index[0] === ELessonType.TALENT) {
            //   const dataBody: Score = {
            //     subjectType: 'SUBJECT',
            //     evaluationType: index[0] === ELessonType.QUALITY ? ELessonType.QUALITY : ELessonType.TALENT,
            //     talent: e.target.value ?? ''
            //   };

            //   dispatch(scoreboardActions.updateRowScoreTable({
            //     table: data,
            //     score: dataBody
            //   }));
            // }
          }}

        />
      </Tooltip>
    </>
  );
};

export default CellEditableTable;