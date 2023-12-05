import { Card, Empty, Modal } from 'antd';
import { styled } from 'styled-components';
import { useAppDispatch } from '../../store/hooks';
import dayGridPlugin from '@fullcalendar/daygrid';
import { useEffect, useRef, useState } from 'react';
import { Calendar } from '@fullcalendar/core';
import apisLessonParent from './service/apis';

const ParentReportSessionPage = () => {
  const [open, setOpen] = useState(false);
  const [openDetail, setOpenDetail] = useState(false);
  const [reportData, ] =useState([
    {
      start: '2023-10-04',
      title: 'Làm bài tập 1 sgk trang 50'
    },
    {
      start: '2023-10-04',
      title: 'Làm bài tập 1 sgk trang 50'
    },
    {
      start: '2023-10-04',
      title: 'Làm bài tập 1 sgk trang 50'
    },
    {
      start: '2023-10-04',
      title: 'Làm bài tập 1 sgk trang 50'
    },
    {
      start: '2023-10-04',
      title: 'Làm bài tập 1 sgk trang 50'
    },
    {
      start: '2023-10-04',
      title: 'Làm bài tập 1 sgk trang 50'
    },
    {
      start: '2023-10-04',
      title: 'Làm bài tập 1 sgk trang 50'
    },
    {
      start: '2023-10-04',
      title: 'Làm bài tập 1 sgk trang 50'
    },
    {
      start: '2023-10-04',
      title: 'Làm bài tập 1 sgk trang 50'
    },
    {
      start: '2023-10-04',
      title: 'Làm bài tập 1 sgk trang 51'
    },
    {
      start: '2023-12-04',
      title: 'Làm bài tập 1 sgk trang 52'
    },
    {
      start: '2023-12-04',
      title: 'Làm bài tập 1 sgk trang 53'
    },
    {
      start: '2023-12-04',
      title: 'Làm bài tập 1 sgk trang 54'
    },
    {
      start: '2023-12-04',
      title: 'Làm bài tập 1 sgk trang 55'
    },
  ]);
  const [dataClick, setDataClick] = useState([]);
  const showModal = () => {
    setOpen(true);
  };
  const handleOk = () => {
    setOpen(false);
  };
  const handleCancel = () => {
    setOpen(false);
  };
  const showModalDetail = (clickInfo:any) => {
    setOpenDetail(true);
    setDataClick(clickInfo.event.title);
  };
  const handleOkDetail = () => {
    setOpenDetail(false);
  };

  const handleCancelDetail = () => {
    setOpenDetail(false);
  };
  // const dispatch = useAppDispatch();

  

  const calendarRef = useRef<HTMLDivElement>(null);

  // const getLesson = async () => {
  //   const res = await apisLessonParent.getListLessonParent();
  // };

  useEffect(() => {
      if (calendarRef.current) {
          const calendarEl = calendarRef.current;
          const calendar = new Calendar(calendarEl, {
              plugins: [dayGridPlugin],
              initialView: 'dayGridWeek',
              headerToolbar: {
                start: 'customButton prevButton,nextButton',
                center: 'title',
                end: '',
              },
              height: '70vh',
              weekends: false,
              events: reportData,
              editable: false,
              selectable: true,
              
              eventClick: showModalDetail,
              select: () => {
                showModal();
              },
              locale:'vi',
              customButtons: {
                customButton: {
                    text: 'Hôm nay',
                    click: () => {
                        const today = new Date();
                        calendar.gotoDate(today);
                    },
                },
                prevButton: {
                    text: '<<',
                    click: () => {
                      calendar.prev();
                      const startDate = calendar.getCurrentData().dateProfile.activeRange?.start;
                      const endDate = calendar.getCurrentData().dateProfile.activeRange?.end;
                      if (startDate !== undefined&& endDate !== undefined ) {
                        const originalDate = new Date(startDate);
                        const originalDateEnd = new Date(endDate);
                        const formattedDate = (originalDate.getMonth() + 1).toString().padStart(2, '0') + '/' + originalDate.getDate().toString().padStart(2, '0') + '/' + originalDate.getFullYear();
                        const formattedDateEnd = (originalDateEnd.getMonth() + 1).toString().padStart(2, '0') + '/' + (originalDateEnd.getDate() - 1).toString().padStart(2, '0') + '/' + originalDateEnd.getFullYear();
                      } else {
                       
                      }
                    
                       
                       
                    },
                },
                nextButton: {
                  text: '>>',
                  click: () => {
                      calendar.next();
                  },
              },
          },
          });

          calendar.render();
          return () => {
              calendar.destroy();
          };
      }
  }, [reportData]);

  // const reportData = lesionSelectors.getLesionList();
  
  return (
    reportData.length > 0 ? <ParentReportSessionPageStyled
    
     >
      <Card className='report-present' title={'Báo bài'} >
        <div ref={calendarRef}></div>
      </Card>
      {/* <List grid={{ gutter: 16, column: 4 }} 
      dataSource={reportData.filter((o,index) => index !== 0 )}
      renderItem={(item) => (
        <List.Item>
          <Card title={item.date}>
            <p>{item.note}</p>
          </Card>
        </List.Item>
      )}></List> */}
      <Modal
        open={open}
        title="Title"
        onOk={handleOk}
        onCancel={handleCancel}
        
      >
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
      </Modal>
      <Modal
        open={openDetail}
        title={dataClick}
        onOk={handleOkDetail}
        onCancel={handleCancelDetail}
        
      >
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
      </Modal>
    </ParentReportSessionPageStyled> : <Empty description='Không có báo bài nào'/>
    
  );
};

  export default ParentReportSessionPage;

const ParentReportSessionPageStyled = styled.div`
  .report-present {
    width: 100%;
  }
  
`;