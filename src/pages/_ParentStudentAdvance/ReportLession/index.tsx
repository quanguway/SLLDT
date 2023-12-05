import dayjs from 'dayjs';
import { styled } from 'styled-components';
import updateLocale from 'dayjs/plugin/updateLocale';
import CalendarDays from '../component/Calendar';
import ReportLessonContent from './widgets/ReportLessonContent';
import bgReport from '../../../asset/img/bg-report.png';

dayjs.extend(updateLocale);



dayjs.updateLocale('vi', {
  weekdaysMin : ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
});

const ParentStudentReportLessonPage = () => {

  return (
    <ParentStudentReportLessonPageStyled>
      <h1 className='header'>Báo bài cho học sinh</h1>
      <div className='container'>
        <CalendarDays/>
        <ReportLessonContent />
      </div>
    </ParentStudentReportLessonPageStyled>
  );
};

export default ParentStudentReportLessonPage;

const ParentStudentReportLessonPageStyled = styled.div`
  margin-top: 50px;

  .header {
    text-align: center;
    margin-bottom: 30px;
  }
  .container {
    display: flex;
    gap: 46px;
    padding: 30px;
    justify-content: center;
    box-shadow: 2px 2px 10px lightgrey;
    max-width: 1200px;
    margin: 0 auto;
    border-radius: 12px;
  }

  /* background-image: url(${bgReport}); */
  /* background-size: auto; */
`; 