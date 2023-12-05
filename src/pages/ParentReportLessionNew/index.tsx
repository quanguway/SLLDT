import { Button, Card, Col, DatePicker, Row, Space, Tooltip, message } from 'antd';
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import { styled } from 'styled-components';
import apisLessonParent from './service/apis';
import { COLOR_PRIMARY } from '../../utils/variables/colors';
import RowH from '../../component/atom/Row/RowH';
import { CalendarOutlined, LeftOutlined, RightOutlined } from '@ant-design/icons';
import moment, { Moment } from 'moment';
import uiActions from '../../services/UI/actions';
import { useAppDispatch } from '../../store/hooks';

interface LessonWeekDTO {
  startOfWeek : Date;
  data : LessonDTO[];
}

interface LessonDTO {
  sendDay : Date;
  note : string ;
  title : string ;
}

const ParentReportSessionNewPage = () => {
  const day = ['Chủ Nhật', 'Thứ 2', 'Thứ 3', 'Thứ 4', 'Thứ 5', 'Thứ 6', 'Thứ 7'];
  const [dayChoose, setDayChoose] = useState(dayjs(new Date).format('YYYY-MM-DD'));
  const [reportData, setReportData] = useState<LessonDTO[]>([]);
  const [allData, setAllData] = useState<LessonWeekDTO[]>([]);
  const [dataDisplay, setDataDisplay] = useState<LessonDTO | undefined>();
  const dispatch = useAppDispatch();
  const getWeekDate = (date: Moment) => {
    return [date.clone().startOf('isoWeek'), date.clone().endOf('isoWeek')];
  };
  const datePickerChange = (value: any) => {
    setDate(getWeekDate(moment(value?.format())));
  };
  const [date, setDate] = useState<Moment[]>(getWeekDate(moment()));
  // const [week, setWeek] = useState<[]>();

  function getMonday(d:any) {
    d = new Date(d);
    const day = d.getDay(),
        diff = d.getDate() - day + (day == 0 ? -6 : 1);
    return new Date(d.setDate(diff));
  }

  const getLesson = async () => {
    try {

      await dispatch(uiActions.setLoadingPage(true));
      const res = await apisLessonParent.getListLessonParent();
      if(res?.data?.data){
        await res?.data.data.forEach((report:any) => {
          const firstOfWeek = getMonday(report.startOfWeek);
          report.startOfWeek = dayjs(firstOfWeek).format('YYYY-MM-DD');
          let newReport : LessonDTO[] = [];
          for(let i = 0; i < 6; i++){
            const d = dayjs(firstOfWeek).add(i, 'day');
            const row = report.data.find((item : LessonDTO) => dayjs(item.sendDay).format('YYYY-MM-DD') === d.format('YYYY-MM-DD'));
            newReport = [
              ...newReport,
              row ? row : { 
              sendDay : d,
              note : '',
              title : '' 
            }];
          }
          report.data = newReport;
        });
        await setAllData(res?.data.data);
    }
    } catch (err) {
      message.error('Đã có lỗi xày ra');
    } finally {

      dispatch(uiActions.setLoadingPage(false));
    }
  };

  useEffect(() => {
    getLesson();
  },[]);

  useEffect(() => {
    if(dataDisplay?.note){
      const element: HTMLElement = document.getElementById('content-lesson') as HTMLElement;
      element.innerHTML = dataDisplay.note;
    }
  },[dataDisplay]);

  useEffect(() => {
    const row = reportData.find((item) => dayjs(item.sendDay).format('YYYY-MM-DD') === dayChoose);
    setDataDisplay(row);
  },[dayChoose]);

  useEffect(() => {
    const firstOfWeek = dayjs(getMonday(date[0].format())).format('YYYY-MM-DD');
    if(allData && allData.length){
      const row = allData.find((item) => String(item.startOfWeek) === firstOfWeek);
      row ? setReportData(row.data) : setReportData([]);
    }
    setDayChoose(firstOfWeek);
  },[date, allData]);

  return (
    <ParentReportSessionNewPageStyled>
      <div className='parent-lesson'>
        <RowH className='date-picker-range'>
          {
            reportData && reportData.length ?
            (
              <>
                <Tooltip title="Tuần trước">
                  <Button icon={<LeftOutlined />} size='large' type='default' shape='circle' onClick={() => setDate(getWeekDate(date[0].subtract(7, 'day')))}></Button>
                </Tooltip>
                <Space.Compact block style={{width: 'auto'}}>
                  <DatePicker suffixIcon={<></>} onChange={datePickerChange} value={dayjs(date[0].format())} format='DD-MM-YYYY' defaultValue={dayjs()} picker='week' style={{backgroundColor: 'white'}} />
                  <Tooltip title="Tuần hiện tại">
                    <Button icon={<CalendarOutlined />} onClick={() => setDate(getWeekDate(moment()))} size='large' type='default'></Button>
                  </Tooltip>
                  
                </Space.Compact>
                <Tooltip title="Tuần sau">
                  <Button icon={<RightOutlined />} size='large' type='default' shape='circle' onClick={() => setDate(getWeekDate(date[1].add(7, 'day')))}></Button>
                </Tooltip>
              </>
            ) : <></>
          }
        </RowH>
        <br></br>
        <Row gutter={8}>
          {
            reportData.map((item) => {
              return (
                <Col key={dayjs(item.sendDay).format('DD-MM-YYYY')} span={4} onClick={() => {setDayChoose(dayjs(item.sendDay).format('YYYY-MM-DD'));}}>
                  <Card className={ (dayjs(item.sendDay).get('day') === dayjs(dayChoose).get('day') ? 'active-card' : '') + ' card-header'}>
                    <p>{day[dayjs(item.sendDay).get('day')]}</p>
                    <p>{dayjs(item.sendDay).format('DD-MM-YYYY')}</p>
                  </Card>
                </Col>
              );
            })
          }
        </Row>
        <br></br>
        <Row >
          {
            reportData && reportData.length ?
            (
              <>
                <Col span={24}>
                  <Card className='report-present'>
                    {
                      dataDisplay ? (
                        dataDisplay.title !== '' ? (
                          <>
                            <h1>{dataDisplay.title}</h1>
                            {/* <p>{dataDisplay.note}</p> */}
                            <div id='content-lesson'></div>
                          </>
                        ) : (
                          <>
                            <p><b><center>Không có báo bài ngày {dayjs(dataDisplay.sendDay).format('YYYY-MM-DD')}</center></b></p>
                          </>
                        )
                      ) :
                      (
                        <>
                          <p><b><center>Không có báo bài</center></b></p>
                        </>
                      )
                    }
                </Card>
                </Col>
              </>
            ) : (
              <></>
            )
          }
        </Row>
      </div>
    </ParentReportSessionNewPageStyled>
  );
};

  export default ParentReportSessionNewPage;

const ParentReportSessionNewPageStyled = styled.div`
display: flex;
justify-content: center;
.parent-lesson{
  width: 100%;
  min-width: 500px;
  max-width: 900px;
  .card-header{
    border: 2px solid white;
    .ant-card-body{
      padding: 8px;
      text-align: center;
    }
  }
  .card-header:hover{
    background-color: #9bcbd18f !important;
    border: 2px solid #9bcbd18f !important;
  }
  .active-card{
    background-color: ${COLOR_PRIMARY} !important;
    font-weight: 600 !important;
    border: 2px solid #d5b55a !important;
  }
  .report-present {
    width: 100%;
    min-height: 500px;
  }
}
`;