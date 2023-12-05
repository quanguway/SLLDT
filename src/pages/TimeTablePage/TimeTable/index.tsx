import { styled } from 'styled-components';
import ColTimeTable from './ColTimeTable';
import moment, { Moment } from 'moment';
import { useEffect, useMemo, useState } from 'react';
import apisTimetable from '../services/apis';
import { DetailType } from '../services/type/timeTable';
import { groupBy } from 'lodash';
import RowH from '../../../component/atom/Row/RowH';
import { Button, DatePicker, Space, Tooltip } from 'antd';
import { CalendarOutlined, LeftOutlined, RightOutlined } from '@ant-design/icons';
import dayjs from 'dayjs';
import { COLOR_PRIMARY } from '../../../utils/variables/colors';
import uiActions from '../../../services/UI/actions';
import { useAppDispatch } from '../../../store/hooks';

export type IDataTimeTable = {
  day_of_week: 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday' | 'Saturday' | 'Sunday',
  lesson: string;
}

export  type ITimeTable = {
  index: number,
  data: IDataTimeTable[];
}

export const headerTableTime = [
  {
    value: 'Monday',
    label: 'Thứ 2',
    // color: '#ffec3d'
  },
  {
    value: 'Tuesday',
    label: 'Thứ 3',
    // color: '#73d13d'
  },
  {
    value: 'Wednesday',
    label: 'Thứ 4',
    // color: '#ffa940'

  },
  {
    value: 'Thursday',
    label: 'Thứ 5',
    // color: '#4096ff'
  },
  {
    value: 'Friday',
    label: 'Thứ 6',
    // color: '#ff4d4f'
  },
];

const dataTemplate: (ITimeTable | null)[] = [
  {
    index: 1,
    data: []
  },
  {
    index: 2,
    data: []
  },
  null,
  {
    index: 3,
    data: []
  },
  {
    index: 4,
    data: []
  },
  
  null, null,
  {
    index: 5,
    data: []
  },
  {
    index: 6,
    data: []
  },
  {
    index: 7,
    data: []
  },
];



const TimeTable = () => {

  const [date, setDate] = useState<Moment>(moment());
  const dispatch = useAppDispatch();
  
  const [dataTimeTable, setDataTimeTable] = useState<any[]>();
  const fetchApi = async () => {
    const res = await apisTimetable.getTimeTable({
      date: date.format('YYYY-MM-DD')
    });
    
    const data = groupBy(res?.data?.Schedule?.detail, o => o.Lesson__c);

    const dataTimeTable = Object.keys(data).map(key => ({
      index: Number(key.charAt(1)),
      data: (data[key] as DetailType[]).map(o => ({
        day_of_week: o.Day__c,
        lesson: o.Name
      }))
    }));

    const timeTable = dataTemplate.map(o => {
      if(dataTimeTable?.find( e => Number(e?.index) === o?.index )) {
        return dataTimeTable?.find( e => Number(e?.index) === o?.index );
      }
      else {
        return o;
      }
    });

    setDataTimeTable(timeTable ?? []);
  };

  useEffect(() => {
    dispatch(uiActions.setLoadingPage(true));
    try {

      fetchApi();
    } finally{
      dispatch(uiActions.setLoadingPage(false));
    }

  }, [date]);

  const dataSource = useMemo(() => {
    return dataTimeTable ?? [];
  }, [dataTimeTable]);

  
  const datePickerChange = (value: any) => {
    setDate(moment(value.format()));
  };

  return (
    <TimeTableContainerStyled>

        <RowH className='date-picker-range'>
          <Tooltip title="Tuần trước">
            <Button icon={<LeftOutlined />} size='large' type='default' shape='circle' onClick={() => setDate((date.subtract(7, 'day')))}></Button>
          </Tooltip>
          <Space.Compact block style={{width: 'auto'}}>
            <DatePicker suffixIcon={<></>} onChange={datePickerChange} value={dayjs(date.format())} format='DD-MM-YYYY' defaultValue={dayjs()} picker='week' style={{backgroundColor: 'white'}} />
            <Tooltip title="Tuần hiện tại">
              <Button icon={<CalendarOutlined />} onClick={() => setDate(moment())} size='large' type='default'></Button>
            </Tooltip>
            
          </Space.Compact>
          <Tooltip title="Tuần sau">
            <Button icon={<RightOutlined />} size='large' type='default' shape='circle' onClick={() => setDate(date.add(7, 'day'))}></Button>
          </Tooltip>
        </RowH>

      <TimeTableStyled>
        <thead>
          <tr>
            <th className='sessions-days'>Buổi</th>
            <th>Tiết</th>
            {headerTableTime.map((o, index) => (
              <th  style={moment().get('day') === index ? {
                // backgroundColor: o.color
              } : {}} key={index}>{o.label}</th>
            ))}
          </tr>
          </thead>
          <tbody>

          <tr>
            <td style={{
              backgroundColor: '#ffccc7',
              border: '0px'
            }} className='sessions-days' rowSpan={6}>Buổi sáng</td>
          </tr>
          {dataSource.map((o, index) => {
            switch(true) {
              case o === null && index === 2: 
                return (
                <tr>
                  <td style={{
                    backgroundColor: '#bae0ff',
                    border: '0px',
                    fontWeight: 800
                  }} colSpan={6}>GIỜ RA CHƠI</td>
                </tr>
                );
              case o === null && index === 5:
                  return (
                    <tr>
                      <td style={{
                        backgroundColor: '#bae0ff',
                        border: '0px'
                      }} className='sessions-days' colSpan={7}>NGHĨ TRƯA</td>
                    </tr>
                  );
              case o === null && index === 6:
                return (
                  <tr>
                    <td style={{
                      backgroundColor: '#ffccc7',
                      border: '0px'

                    }} className='sessions-days' rowSpan={4}>Buổi chiều</td>
                  </tr>
                );
              default: 
                return o !== null && (
                  <tr className='lesson' key={index}>
                    <td className='lesson-index'>{o.index}</td>
                    <ColTimeTable data={o.data}/>
                  </tr>
                );
            }
            
          })}
          </tbody>

      </TimeTableStyled>
    </TimeTableContainerStyled>
  );
};

export default TimeTable;

const TimeTableContainerStyled = styled.div`


.date-picker-range {
    height: auto;
    display: flex;
    justify-content: center;
    gap: 16px;
    padding: 8px 16px;
    border-radius: 8px;
    margin: 12px 0px;
  }
`;

const TimeTableStyled = styled.table`
  font-family: arial, sans-serif;
  border-spacing: 5px;
  width: 100%;
  background-color: white;
  th {
    background-color: ${COLOR_PRIMARY};
    color: white;
  }

  /* th:nth-child(1), th:nth-child(2) {
    background-color: white;
    color: black;
  }
   */

  td, th {
    border: 1px solid #dddddd;
    text-align: center;
    padding: 8px;
    border-color: black;
  }

  th {
    border: 0px;
  }

  .sessions-days {
    width: 70px;
    font-size: 16px;
    font-weight: bold;
  }
  .lesson {
    .lesson-index {
      width: 45px;
      font-weight: bold;
    }

    .lesson-time {
      cursor: pointer;
      &:hover {
        opacity: 0.5;
      }
    } 
  }

  
`;