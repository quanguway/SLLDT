import moment, { Moment } from 'moment';
import { styled } from 'styled-components';
import { useEffect, useMemo, useState } from 'react';
import { Button, Popover, Tooltip } from 'antd';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import { EMonth, TDate, days } from '../../../../component/Calendar';
import { COLOR_PRIMARY } from '../../../../../../utils/variables/colors';
import lesionSelectors from '../../../../../ReportLesionPage/services/selectors';
import { useNavigate } from 'react-router-dom';



const CalendarSmallDays = () => {

  // const getWeekDate = (date: Moment) => {
  //   return [date.clone().startOf('isoWeek'), date.clone().endOf('isoWeek')];
  // };

  // const [lessonRes, setLessonRes] = useState();

  // const dispatch = useAppDispatch();

  const [dateSelected, setDateSelected] = useState<string>(moment().format());
  // const navigate = useNavigate();
  // const [dayOfWeek, setDayOfWeek] = useState<TDate[][]>([]);

  const dataReportLesion = lesionSelectors.getLesionList();


  const dataReport = useMemo(() => (dataReportLesion ?? [])?.map(o => ({
    title: o.Title__c,
    date: moment(o.SentDay__c).format('DD/MM/YYYY'),
    content: o.Content__c
  })),[dataReportLesion]);

  // const dataReport = [
  //   {
  //     content: 'Hai Nam Test',
  //     date :'2023-11-27',
  //     title : 'Báo bài ngày 45257',
  //   }
  // ];


  const getDaysOfWeek = () => {

    // const getLesson = async () => {
    //   try {
  
    //     await dispatch(uiActions.setLoadingPage(true));
    //     const res = await apisLessonParent.getListLessonParent();
    //     if(res?.data?.data){
    //       // setLessonRes(res?.data?.data);
          
    //     }
    //   } catch (err) {
    //     message.error('Đã có lỗi xày ra');
    //   } finally {
  
    //     dispatch(uiActions.setLoadingPage(false));
    //   }
    // };

    // useEffect(() => {
    //   getLesson();
    // },[]);


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
      
      if(s.slice(-1) === '0' || currentMonthDates?.length === index + 1) {

        const dataRep = days.map(o => {
          const data = dataReport.filter(e => {

            return moment(e.date, 'DD/MM/YYYY').isSame(moment(o.date, 'YYYY/MM/DD'), 'day');
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
    // setDayOfWeek(dayOfWeek);
    return {dayOfWeek: dayWeek, dayOfMonth: currentMonthDates};
  };

  const {dayOfWeek} = useMemo(() => {    
    return getDaysOfWeek();
  }, [dateSelected]);

  useEffect(() => {
  
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
                  return (
                    <Popover key={index} placement="right" title={date?.data?.[0].title} content={date?.data?.[0].content} trigger={'click'}>
                      <td style={{pointerEvents: date?.date ? undefined : 'none'}} className={` col ${ isCurrentDate(date?.date) ? 'current' : ''}`} key={indexDay}> 
                        {date?.date ? 
                          <div className={`${ (date?.data?.length ?? 0) > 0 ? 'report' : ''}`}>
                            <p className={` ${ isCurrentDate(date?.date) ? 'current' : ''}`}>{moment(date?.date).date()}</p> 
                          </div>
                          : <></>}  </td>
                    </Popover>
                  );

                })}
              </tr>
            ))}
        </tbody>
      </table>
      <div className='describe'>
        <div className='describe-item'>
          <div style={{backgroundColor: '#fa541c', borderRadius: '100%', height: '10px', width: '10px'}}></div>
          <p>Báo bài</p>
        </div>
      </div>
    </CalendarStyled>
  );
};

export default CalendarSmallDays;

const widthCell = 60;
const heightCell = 25;

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
    border-radius: 12px;
    
    & tbody {
      cursor: pointer;
    }

    .col {
      padding: 8px;
      /* display: flex; */
      /* justify-content: center; */
      max-width: ${widthCell + 'px'} ;
      height: ${heightCell + 'px'} ;
      p {
        text-align: center;
        font-size: 14px;
        /* margin-top: -30%; */
        /* font-weight: 600; */
      }
      .current {
        color: ${COLOR_PRIMARY};
        font-weight: 700;
      }

    }

    .report {
      margin-left: 4px;
      color: white;
      border-color: ${COLOR_PRIMARY};
      background-color: #fa541c;
      border-radius: 100%;
      padding: 8px;
      width: ${(heightCell - 8)+'px'};
      p {
      }
    }

    .report .current   {
      color: white;
      
    }

    & th {
      color: gray;
      font-size: 12px;
      padding: 8px;
      width: 42px;
    }
  }



  .describe {
    .describe-item {
      display: flex;
      gap: 8px;
      align-items: center;
      font-size: 12px;
      justify-content: flex-end;
      margin-right: 45px;
    }
  }
`;

// const BreakTimeOverlay = () => {

//   const [count, setCount] = useState(0);
//   const ref = useRef<HTMLDivElement>(null);

//   useLayoutEffect(() => {
//     if (ref.current?.clientWidth) {
//       const width = ref.current?.clientWidth;
//       setCount(Math.round((width / 16) + 5));
//     }
//   });

//    return (
//     <div style={{pointerEvents: 'none'}} ref={ref} className='breakingTimeOverlay'>
//       <svg fill="none" xmlns="http://www.w3.org/2000/svg" style={{ height: heightCell, width: widthCell , display: 'flex', opacity: '.3' }}>
//         <g clipPath="url(#clip0_6901_178720)">
//           {Array.from(Array(count).keys()).map(o => <line key={o} x1={0.353553 + 16 * o} y1={0.353553 * 2} x2={-95.6464 + 16 * o} y2={96.3535 * 2} stroke="#C3C2E0" />)}
//         </g>
//       </svg>

//     </div >
//   );
// };