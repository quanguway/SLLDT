import { styled } from 'styled-components';
import TimeTable from './TimeTable';


const TimeTablePage = () => {


  return (
    <TimeTablePageStyled>
      {/* <h3 style={{
        fontWeight: 700,
        fontSize: '46px',
        textAlign: 'center',
        marginBottom: '46px'
      }}>Thời khoá biểu</h3> */}
      {/* <Filter>
        <ButtonImport/>
      </Filter> */}
      <div className='card'>
        <TimeTable />
      </div>
    </TimeTablePageStyled>
  );
};

export default TimeTablePage;

const TimeTablePageStyled = styled.div`

  /* table {
    background-color: transparent;
  } */

  .card {
    border-radius: 12px;
    background-color: transparent;
    /* box-shadow: 3px 3px 20px lightgray; */
    margin: 0px auto;
  }
`;
