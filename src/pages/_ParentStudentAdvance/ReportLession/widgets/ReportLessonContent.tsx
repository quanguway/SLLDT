import { styled } from 'styled-components';
import { COLOR_PRIMARY } from '../../../../utils/variables/colors';
import { useLessonParentReportDetail } from '../../../../services/hooks/useLessonDetail';
import { Empty } from 'antd';

const ReportLessonContent = () => {

  const [reportDetail, ] = useLessonParentReportDetail([]);


  return (
    <>
      {/* <div style={{height: '45px'}}></div> */}
      <ReportLessonContentStyled>
        <div className='header'>
          {reportDetail.length > 0 ? reportDetail[0].title : ''}
        </div>
        {reportDetail.length > 0 ? <div className='body'>
          <ItemLine label='Ngày gửi' value={reportDetail[0].date} />
          <p style={{
            fontSize: '16px',
            fontWeight: '700'
          }}>Nội dung:</p>
          <p dangerouslySetInnerHTML={{__html: reportDetail[0].content}} />
        </div> : <Empty description='Ngày này không có báo bài nào được tạo'/>}

      </ReportLessonContentStyled>
    </>
  );
};

export default ReportLessonContent;

const ItemLine = ({label, value}: {label: string, value: string}) => {
  return (
    <div style={{
      display: 'flex',
      gap: '8px'
    }}>
      <p style={{
        fontSize: '16px',
        fontWeight: '700'
      }}>{label}:</p>
      <p style={{
        fontSize: '14px',
      }}>{value}</p>
    </div>
  );
};

const ReportLessonContentStyled = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  /* padding: 12px; */
  border-radius: 8px;
  border: 2px solid gray;
  max-height: 500px;
  margin-bottom: 24px;
  width: 330px;
  background-color: white;
  margin-top: 50px;

  .header {
    background-color: ${COLOR_PRIMARY};
    color: white;
    padding: 12px;
    text-align: center;
    font-weight: 600;
  }

  .body {
    padding-left: 12px;
    display: flex;
    flex-direction: column;
    gap: 8px;
  }
`;