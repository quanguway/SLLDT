import moment, { Moment } from 'moment';
import { styled } from 'styled-components';
import { COLOR_PRIMARY} from '../../../../utils/variables/colors';
import { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import { Button, Tag, Tooltip} from 'antd';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import { useAppDispatch } from '../../../../store/hooks';
import lesionSelectors from '../../../ReportLesionPage/services/selectors';
import lesionActions from '../../../ReportLesionPage/services/actions';
import { useLessonParentReportDetail } from '../../../../services/hooks/useLessonDetail';
import { useLocation } from 'react-router-dom';

export enum EDays {
  mon = 'Thứ 2',
  tue = 'Thứ 3',
  wed = 'Thứ 4',
  thu = 'Thứ 5',
  fri = 'Thứ 6',
  sat = 'Thứ 7',
  sun = 'Chủ Nhật'
}

export enum EMonth {
  jan = 'Tháng 1',
  feb = 'Tháng 2',
  mar = 'Tháng 3',
  apr = 'tháng 4',
  may = 'Tháng 5',
  jun = 'Tháng 6',
  jul = 'Tháng 7',
  aug = 'Tháng 8',
  sep = 'Tháng 9',
  oct = 'Tháng 10',
  nov = 'Tháng 11',
  dec = 'Tháng 12'
}

export type TDate = {
  key: number
  date?: string
  data?: TReport[]
}

export type TReport = {
  title: string;
  date: string;
  content: string;
}

export const days = [
  {
    label: EDays.mon,
    value: 1,
  },
  {
    label: EDays.tue,
    value: 2,
  },
  {
    label: EDays.wed,
    value: 3,
  },
  {
    label: EDays.thu,
    value: 4,
  },
  {
    label: EDays.fri,
    value: 5,
  },
  {
    label: EDays.sat,
    value: 6,
  },
  {
    label: EDays.sun,
    value: 0,
  },
];

const CalendarDays = () => {

  const {state} = useLocation();


  const [dateSelected, setDateSelected] = useState<string>(state?.date ? moment(state?.date, 'YYYY/MM/DD').format() : moment().format());
  const [, setReportDetail] = useLessonParentReportDetail([]);

  
  const dispatch = useAppDispatch();

    useEffect(() => {
      dispatch(lesionActions.getListLesion.fetch());
    }, []);
  const dataReportLesion = lesionSelectors.getLesionList();

  
  // const dataReport = [
  //   {
  //     title: 'Báo bài ngày 23/10/2023',
  //     date: '23/10/2023',
  //     content: 'Haha al ready okd'
  //   }
  // ];

  const dataReport = useMemo(() =>  dataReportLesion?.map(o => ({
    title: o.Title__c,
    date: o.SentDay__c,
    content: o.Content__c
  })),[dataReportLesion]) ;

  const getDaysOfWeek = () => {
   
    const date = moment(dateSelected);
    const currentMonthDates = new Array(date.daysInMonth()).fill(null).map((x, i) => date.startOf('month').add(i, 'days').format('YYYY/MM/DD') + '-' + date.startOf('month').add(i, 'days').day());
    const dayWeek: TDate[][] = [];
    let days: TDate[] = [];

    currentMonthDates.forEach((s, index) => {
      const dates = s.split('-');
      days.push({
        date: dates[0],
        key: Number(dates[1])
      });      
      
      if(s.slice(-1) === '0' || currentMonthDates.length === index + 1) {
        const dataRep = days.map(o => {
          const data = dataReport?.filter(e => {
            return moment(e?.date, 'YYYY-MM-DD').isSame(moment(o?.date, 'YYYY/MM/DD'), 'day');
          });         
          return {
            ...o,
            data,
          };
        });

        dayWeek.push(dataRep);
        days = [];
      }
    });
    return {dayOfWeek: dayWeek, dayOfMonth: currentMonthDates};
  };

  const {dayOfWeek} = useMemo(() => {    
    return getDaysOfWeek();
  }, [dateSelected]);

  const isCurrentDate = (date?: string) => {
    if(! date) return false;
    
    return moment(date).isSame(moment(), 'day');
  };

  const months = Object.values(EMonth).map((o, index) => ({
    label: o,
    value: index
  }));

  const date: Moment = useMemo(() => moment(dateSelected), [dateSelected]);

  const isCalendarSelected = useCallback((date?: string) => {
    if(moment(dateSelected).format('YYYY/MM/DD') === date) {
    }
    
    return moment(dateSelected).format('YYYY/MM/DD') === date; 
    
  }, [dateSelected]);
  
  return (
    <CalendarStyled>
      <div className='filter'>
        {/* <div className='current'>
          {moment().format('DD/MM/YYYY')}
        </div> */}
        <div className='month'>
          <Tooltip title="Tháng trước">
            <Button icon={<LeftOutlined />} size='large' type='text' shape='circle' onClick={() => {
                setDateSelected( date.subtract(1, 'month').format());
              }}></Button>
          </Tooltip>
          {months.find(o => o.value === date.get('month'))?.label}, {date.get('year')}
          <Tooltip title="Tháng sau">
            <Button icon={<RightOutlined />} size='large' type='text' shape='circle' onClick={() => setDateSelected(date.add(1, 'month').format())}></Button>
          </Tooltip>
        </div>
      </div>
      <table className='calendar'>
        <thead>
          <tr>
            {days.map((o, index) => (
              <th key={index}>{o.label}</th>
            ))}
          </tr>
        </thead>
        <tbody>
            {dayOfWeek.map((o: TDate[], index: number) => (
              <tr key={index}>
                {days.map((e, indexDay) => {
                  const date = o.find(d => d.key === e.value);
                  return <td 

                    onClick={() => {
                      setReportDetail(date?.data ?? []);
                      setDateSelected(date?.date ?? '');
                    }} 
                    style={{pointerEvents: date?.date ? undefined : 'none'}} 
                    className={`col ${ isCurrentDate(date?.date) ? 'current' : ''} ${isCalendarSelected(date?.date) ? 'selected' : ''}`} 
                    key={indexDay}> 

                    {date?.date ? 
                      <div className='block'>
                        <p>{moment(date?.date)?.date()}</p> 
                        <div style={{
                          }}>
                            {((date?.data ?? []).length) > 0 ? date?.data?.map((tag, index) => (
                              <Tag style={{
                                textOverflow: 'ellipsis',
                                overflow: 'hidden',
                                width: '100%'

                              }} key={index} color='#f50'>{tag.title}</Tag>
                            )): <></>}
                          </div>
                        </div>
                        : <BreakTimeOverlay/>}  </td>;
                })}
              </tr>
            ))}
        </tbody>
      </table>
      <div className='describe'>
        <div className='describe-item'>
          <div style={{backgroundColor: '#fa541c', borderRadius: '100%', height: '15px', width: '15px'}}></div>
          <p>Báo bài</p>
        </div>
      </div>
    </CalendarStyled>
  );
};

export default CalendarDays;

const widthCell = 90;
const heightCell = 50;

const CalendarStyled = styled.div`
  background-color: white;
  .filter {
    display: flex;
    justify-content: center;
    width: ${((widthCell * 7) + 20) + 'px'};
    margin-bottom: 12px;
    .current {
      font-size: 18px;
    }

    .month{
      display: flex;
      gap: 8px;
      align-items: center;
      font-weight: 700;
      color: ${COLOR_PRIMARY};
      text-transform: uppercase;
      cursor: pointer;
    }

  }

  .calendar {
    border-collapse: collapse;
    border-radius: 12px;
    
    & tbody {
      cursor: pointer;
    }

    .col {
      padding: 8px;
      border: 1px solid gray;
      align-items: center;
      max-width: ${widthCell + 'px'} ;
      min-width: ${widthCell + 'px'} ;
      height: ${heightCell + 'px'} ;
      p {
        font-weight: 600;
      }
    
      &:hover {
        color: white;
        background-color: ${COLOR_PRIMARY};
        /* color: white !important; */

      }
    }

    .current {
      color: ${COLOR_PRIMARY};
    }

    .selected {
      color: white;
      background-color: ${COLOR_PRIMARY};
    }

    .block {
      display: flex;
      justify-content: space-between;
      flex-direction: column;
      height: 100%;
    }

    .active {
      color: ${COLOR_PRIMARY};
      border-color: white;
      /* background-color: #1a9bab7d; */
    }

    & th {
      background-color: ${COLOR_PRIMARY};
      border: 1px solid ${COLOR_PRIMARY};
      color: white;
      padding: 12px;
    }
  }

  .describe {
    .describe-item {
      margin-top: 12px;
      display: flex;
      gap: 8px;
      align-items: center;
      font-size: 14px;
      justify-content: flex-start;
      margin-right: 45px;
    }
  }
`;

const BreakTimeOverlay = () => {

  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (ref.current?.clientWidth) {
      const width = ref.current?.clientWidth;
      setCount(Math.round((width / 16) + 5));
    }
  });

   return (
    <div style={{pointerEvents: 'none'}} ref={ref} className='breakingTimeOverlay'>
      <svg fill="none" xmlns="http://www.w3.org/2000/svg" style={{ height: heightCell, width: widthCell , display: 'flex', opacity: '.3' }}>
        <g clipPath="url(#clip0_6901_178720)">
          {Array.from(Array(count).keys()).map(o => <line key={o} x1={0.353553 + 16 * o} y1={0.353553 * 2} x2={-95.6464 + 16 * o} y2={96.3535 * 2} stroke="#C3C2E0" />)}
        </g>
      </svg>

    </div >
  );
};