import moment from 'moment';
import { useEffect, useMemo, useState } from 'react';
import { styled } from 'styled-components';
import { getDayOfWeek } from '../../../../../utils/unit';
import {  Empty, Timeline, TimelineItemProps } from 'antd';
import { hexToRGB } from '../../../../../utils/unit';
import InputDatePicker from '../../../../../component/atom/Input/InputDatePicker';
import apisTimetable from '../../../../TimeTablePage/services/apis';
import { useAppDispatch } from '../../../../../store/hooks';
import uiActions from '../../../../../services/UI/actions';

const TimeTableLine = () => {

  const [date, setDate] = useState(moment());
  const dispatch = useAppDispatch();

  const [dataTimeTable, setDataTimeTable] = useState<any[]>();

  // console.log(dataTimeTable);
  
  const fetchApi = async () => {
    try {
      const res = await apisTimetable.getTimeTable({
        date: date.format('YYYY-MM-DD'),
        day: date.format('dddd') as any
      });
        setDataTimeTable(res?.data?.Schedule?.detail ?? []);
    } catch (error) {
      // const res = await apisTimetable.getTimeTable({
      //   date: date.format('YYYY-MM-DD'),
      //   day: date.format('dddd') as any
      // });
    }
  };


  useEffect(() => {
    dispatch(uiActions.setLoadingPage(true));
    try {

      fetchApi();
      fetchApi();
    } finally{
      dispatch(uiActions.setLoadingPage(false));
    }

  }, [date]);

  const lessonToday =  useMemo(() => [
    {
      timeStart: '',
      timeEnd: '',
      lesson: dataTimeTable?.[0]?.Name,
      color: '#2f54eb',
    },
    {
      timeStart: '',
      timeEnd: '',
      lesson: dataTimeTable?.[1]?.Name,
      color: '#722ed1',

    },
    {
      timeStart: '',
      timeEnd: '',
      lesson: dataTimeTable?.[2]?.Name,
      color: '#eb2f96',
    },
    {
      timeStart: '',
      timeEnd: '',
      lesson: dataTimeTable?.[3]?.Name,
      color: '#2f54eb',
    },
    {
      timeStart: '',
      timeEnd: '',
      lesson: dataTimeTable?.[4]?.Name,
      color: '#722ed1',

    },
    {
      timeStart: '',
      timeEnd: '',
      lesson: dataTimeTable?.[5]?.Name,
      color: '#eb2f96',
    },
    {
      timeStart: '',
      timeEnd: '',
      lesson: dataTimeTable?.[6]?.Name,
      color: '#722ed1',
    },
  ], [dataTimeTable]);

  const itemTimeLine: TimelineItemProps[] = lessonToday.map(o => ({
    // label: o.timeStart,
    children: <CardTimeLine lesson={o.lesson} color={o.color} time={o.timeStart + ' - ' + o.timeEnd}/>,
    color: o.color,
  }));

  return (
    <TimeTableLineStyled>
      <div className='header'>
        <div className='title'>
          <h3>Tiết học trong ngày</h3>
          <p>{getDayOfWeek(date)}, {date.format('DD/MM/YYYY')}</p>
        </div>
        <InputDatePicker
        onChange={value => {
          setDate(moment(value?.format() ));
        }}
         style={{
          borderRadius: '999px',
          padding: '1px 20px'
        }} size={'small'} />
      </div>
      {/* <Divider  orientation='left' style={{fontWeight: 800, fontSize: '20px', color: 'gray'}}>7 giờ 30 phút</Divider> */}
      {lessonToday.length > 0 ? <TimeLineStyled items={itemTimeLine}/> : <Empty description='Hôm nay không có buổi học nào'/>}
    </TimeTableLineStyled>
  );
};

export default TimeTableLine;

const TimeTableLineStyled = styled.div`
  width: 450px;
  padding: 8px 16px;
  .header {
    display: flex;
    justify-content: space-between;
    margin-bottom: 56px;
    h3 {
      font-weight: 800px;
      font-size: 18px;
      margin-bottom: 8px;
    }

    p {
      font-weight: 700;
      font-size: 14px;
      color: grey;
    }
  }
  .time{
    display: none;
  }
`;

const TimeLineStyled = styled(Timeline)`
  transform: translate(0px ,25px);

`;



const CardTimeLine = ({lesson, time, color }:{lesson: string, time: string, color: string}) => {
  return (
    <CardTimeLineStyled $color={color}>
      <div className='circle'></div>
      <div>
        <p className='lesson'>{lesson}</p>
        <p className='time'>{time}</p>
      </div>
    </CardTimeLineStyled>
  );
};

const CardTimeLineStyled = styled.div<{ $color: string; }>`
  border-radius: 12px;
  /* width: 270px; */
  display: flex;
  background-color: ${props => hexToRGB(props.$color, 0.1)+')'};
  padding: 8px;
  align-items: center;
  gap: 12px;
  transform: translate(-5% ,-30%);
  margin-left: 30px;

  .circle {
    width: 25px;
    height: 25px;
    border-radius: 100%;
    background-color: ${props => hexToRGB(props.$color, 0.5)+')'};


  }

  .lesson {
    font-weight: 700;
    font-size: 14px;
    color: ${props => props.$color}
  }

  .time {
    font-weight: 600;
    font-size: 12px;
    color: ${props => hexToRGB(props.$color, 0.8)+')' }
    
  }
`;