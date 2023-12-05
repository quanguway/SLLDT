import { ColumnType, ColumnsType } from 'antd/es/table';
import DataTable from '../../../component/molecule/DataTable';
import CellEditableTable from '../../../component/molecule/DataTable/CellEditableTable';
import scoreboardSelectors from '../service/selectors';
import { useEffect, useMemo } from 'react';
import scoreboardActions from '../service/actions';
import { ELesions, ELessonType, EQuality, ETalent } from './ButtonImport';
import ActionTable from '../../../component/molecule/DataTable/ActionTables';
import { EyeOutlined } from '@ant-design/icons';
import { COLOR_BLUE } from '../../../utils/variables/colors';
import { useAppDispatch } from '../../../store/hooks';
import { TableScore } from '../service/types/_scoreboard';
import { Select } from 'antd';
// import { getTalentByScore } from '../../../utils/unit';
import { styled } from 'styled-components';


const ScoreboardDataTable = () => {

  const dataSource = scoreboardSelectors.getScoreboard();  
  const dispatch = useAppDispatch();
  const mucDatDuocOption = [ {
    value: 'Hoàn thành tốt',
    label: 'Hoàn thành tốt'
  },{
    value: 'Hoàn thành',
    label: 'Hoàn thành'
  },{
    value: 'Chưa hoàn thành',
    label: 'Chưa hoàn thành'
  } ];


  const columnAttr: ColumnType<any> = {
    align: 'center',
  };

  const columnAttrPoint: (name:string) => ColumnType<any> = (name) => {    
    return {
      ...columnAttr,
      width: 50,
      render: (text: string, record: TableScore) => {        
        return (
          <CellEditableTable
            value={text}
            record={record}
            name={name}
          // useSetValue={useColDataTable}
          />
        );
      }
    };
  };

  
  
  const getChildrenColumn = (title: (keyof typeof ELesions)[], dataIndex: string) => {
      const childrenList: ColumnType<any>[] = title.map((s ,) => {
      return {
        title: ELesions[s],
        // dataIndex: dataIndex,
        // key: `${dataIndex}_${title}`,
        children: [
          {
            title: 'Điểm KTĐK',
            dataIndex: `${dataIndex}-${s}-1`,
            key: `${dataIndex}-${s}-1`,
            ...columnAttrPoint(`${dataIndex}-${s}-1`)
          },
          {
            title: 'Nhận xét',
            dataIndex: `${dataIndex}-${s}-2`,
            key: `${dataIndex}-${s}-2`,
            ...columnAttrPoint(`${dataIndex}-${s}-2`)
          },
          {
            align: 'center',
            title: 'Mức đạt được',
            dataIndex: `${dataIndex}-${s}-0`,
            key: `${dataIndex}-${s}-0`,
            render: (text: string,) => {                 
              return (
                <SelectColStyled options={mucDatDuocOption} value={text} onChange={() => {

                }} />);
            // render: (value: any, record: TableScore) => {
            //   //@ts-ignore
            //   return getTalentByScore(Number(record[`${dataIndex}-${s}-1`]));
            // }
          },
        },
        ],
    };});

    return childrenList;
  };

  const getChildrenColumnSimple = (titles: (keyof typeof ETalent | keyof typeof EQuality)[], dataIndex: string) => {
    
    return titles.map(s => { 
      console.log(`${dataIndex}-${s}`);
      return {
        align: 'center',
        title: s in ETalent ?  ETalent[s as keyof typeof ETalent] : EQuality[s as keyof typeof EQuality],
        dataIndex: `${dataIndex}-${s}`,
        key: `${dataIndex}-${s}`,
        render: (text: string, record: TableScore) => {                 
          return (
            <SelectColStyled value={text} onChange={(value) => {

              const data: TableScore = {};
              // @ts-ignore
              data[`${dataIndex}_${s}`] = value;
              data['studentCode'] = record.studentCode;
              const idx = (s in ETalent ? Object.keys(ETalent).findIndex(key => key === s) : Object.keys(EQuality).findIndex(key => key === s)) + 1;

              const dataBody = {
                subjectType: 'SUBJECT',
                subjectId: `${s in ETalent ? 'NANG_LUC' : 'PHAM_CHAT'}_${idx}`,
                evaluationType: ELessonType.TALENT.toUpperCase(),
                talent: value as string
              };       
              
              dispatch(scoreboardActions.updateRowScoreTable({
                table: data,
                score: dataBody
              }));
            }} options={options}/>
          );
        }
      } as ColumnType<any>;} );
  };

  const options = [
    {
      value: 'Tốt',
      label: 'Tốt'
    },
    {
      value: 'Đạt',
      label: 'Đạt'
    },
    {
      value: 'Cần cố gắng',
      label: 'Cần cố gắng'
    },
  ];



 

 
  const dataIndexLesion = 'lesion';
  const dataIndexTalent = 'talent';
  const dataIndexQuality = 'quality';

  const columns: ColumnsType<TableScore>= [
    {
      title: 'STT',
      dataIndex: 'stt',
      key: 'stt',
      ...columnAttr
    },
    {
      title: 'Mã HS',
      dataIndex: 'studentCode',
      key: 'studentCode',
      // ...columnAttr
    },
    {
      title: 'Họ và tên',
      dataIndex: 'fullName',
      key: 'fullName',
      width: 200,
      // ...columnAttr
    },
    {
      title: 'Các môn học và hoạt động giáo dục',
      ...columnAttr,
      children: getChildrenColumn(Object.keys(ELesions) as (keyof typeof ELesions)[], dataIndexLesion)
    },
    {
      title: 'Các năng lực, phẩm chất',
      ...columnAttr,
      children: [
        {
          title: 'Năng lực',
          children: getChildrenColumnSimple(Object.keys(ETalent) as (keyof typeof ETalent)[], dataIndexTalent)
        },
        {
          title: ' Phẩm chất',
          children: getChildrenColumnSimple(Object.keys(EQuality)  as (keyof typeof EQuality)[], dataIndexQuality)
        }
      ]
    },
    {
      title: 'Hành động',
      // fixed: 'right'
      render: () => {
        return <ActionTable actions={[
          {
            handle: () => undefined,
            icon: <EyeOutlined />,
            label: 'Xem chi tiết',
            color: COLOR_BLUE
          },
          // {
          //   handle: () => undefined,
          //   icon: <DeleteOutlined />,
          //   label: 'Delete',
          //   color: COLOR_RED
          // }
        ]}/>;
      }
    }
  ];

  const data: TableScore[] = useMemo(() => dataSource?.data?.map((o, index: number) => { 
    const lesionIds = Object.keys(ELesions);
    const quanlityIds = Object.keys(EQuality);
    const talientIds = Object.keys(ETalent);
    const lesionList = {};


    lesionIds.forEach((s) => {
      //@ts-ignore
      lesionList[`${dataIndexLesion}-${s}-0`] = o.scores.find(e => e.subjectId === s)?.talent;
      //@ts-ignore
      lesionList[`${dataIndexLesion}-${s}-1`] = o.scores.find(e => e.subjectId === s)?.score;
      //@ts-ignore
      lesionList[`${dataIndexLesion}-${s}-2`] = o.scores.find(e => e.subjectId === s)?.evaluationComment;
    });

    quanlityIds.forEach((s, index) => {
      //@ts-ignore
      lesionList[`${dataIndexQuality}-${s}`] = o.scores.find(e => e.subjectId === 'PHAM_CHAT_'+(index + 1))?.talent;
    });

    talientIds.forEach((s, index) => {
      //@ts-ignore
      lesionList[`${dataIndexTalent}-${s}`] = o.scores.find(e => e.subjectId === 'NANG_LUC_'+(index + 1))?.talent;
    });



    return {
      studentCode: o.studentId,
      stt: index + 1,
      fullName: o.studentName,
      ...lesionList
    };
  }), [dataSource]); 

  useEffect(() => {
    dispatch(scoreboardActions.setScoreTable(data));
  }, [data]);  

  const dataTable = scoreboardSelectors.getTableScore();

  // console.log(dataTable?.sort((o1, o2) => o1?.fullName?.localeCompare(o2?.fullName ?? '') ?? 1 ));
  

  return (
    <>
      <DataTable columns={columns} dataSource={dataTable ?? []} />
    </>
  );
};

export default ScoreboardDataTable;

const SelectColStyled = styled(Select)`
  width: 100%;
  .ant-select-selector {
    width: 100%;
    min-width: 150px;
    border: none !important;
    padding: 0px !important;
    background-color: transparent !important;
    outline: none !important;
    box-shadow: none !important;
    border-color: transparent !important;
  }
  .ant-select-open {
    border: none !important;
  }
`;