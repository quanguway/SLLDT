import { styled } from 'styled-components';
import ReportDate from './Reportdate';
import { useState } from 'react';

import { Radio, RadioChangeEvent } from 'antd';
import ReportWeek from './ReportWeek';

const ParentStudentReportLesson = () => {


  const [mode, setMode] = useState<'day' | 'week'>('day');


  const handleModeChange = (e: RadioChangeEvent) => {
    setMode(e.target.value);
  };

  const RenderReport = () => {
    switch(mode) {
      case 'week':
        return (
          <ReportWeek />
        );
      case 'day':
      default:
        return <ReportDate />;
    }
  };

  return (
    <ReportLessonStyled>
      <div className='header'>
        <div className='title'>
          <h3>Báo bài trong {mode === 'day' ? 'ngày' : 'tuần'}</h3>
          {/* <p>01.10.2023 - 31.10.2023</p> */}
        </div>
        <div>
        <Radio.Group onChange={handleModeChange} value={mode} style={{ marginBottom: 8 }}>
          <Radio.Button value="day">Ngày</Radio.Button>
          <Radio.Button value="week">Tuần</Radio.Button>
        </Radio.Group>
        </div>

      </div>
      <RenderReport/>
      {/* <CalendarSmallDays /> */}
    </ReportLessonStyled>
  );
};

const ReportLessonStyled = styled.div`
  width: 70%;
  min-width: 450px;
.header {
    display: flex;
    justify-content: space-between;
    margin-bottom: 26px;
    padding: 16px;
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
  }`;

export default ParentStudentReportLesson;