import { styled } from 'styled-components';
import TimeTable from '../../TimeTablePage/TimeTable';

const ParentStudentTimeTablePage = () => {
  return (
    <ParentStudentTimeTablePageStyled>
      <h3 style={{
        fontWeight: 700,
        fontSize: '46px',
        textAlign: 'center',
        marginBottom: '46px'
      }}>Thời khoá biểu</h3>

       <TimeTable />
    </ParentStudentTimeTablePageStyled>
  );
};

const ParentStudentTimeTablePageStyled = styled.div`
  padding: 0 100px;
`;

export default ParentStudentTimeTablePage;