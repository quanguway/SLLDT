import { Card } from 'antd';
import { styled } from 'styled-components';
import { COLOR_PRIMARY } from '../../utils/variables/colors';
import { useNavigate } from 'react-router-dom';
// import { useEffect } from 'react';
import storage from '../../utils/sessionStorage';

const ParentHomePage = () => {
  // const classId = storage.get('class_id');


  const navTop = [
    {
     label: 'Báo bài',
     link: '/app/report-session'
    },{
      label: 'Lịch Học',
      link: '/app/time-table'
     },{
      label: 'Bảng điểm',
      link: '/app/evaluation-sheet'
     }];
  const navBottom = [{
    label: 'Xin nghỉ phép',
    link: '/app/parent-attendance'
   },{
    label: 'Giáo viên chủ nhiệm',
    link: '/'
   }];

  const navigate = useNavigate();

  return (
    <ParentHomePageStyled>
      <div className='cards'>
        {navTop.map((s, index) => (
          <Card className='card-item' key={index} onClick={() => navigate(s.link)}>
            <p>{s.label}</p> 
          </Card>
        ))}
      </div>
      <div className='cards'>
        {navBottom.map((s, index) => (
          <Card className='card-item' key={index} onClick={() => navigate(s.link)}>
            <p>{s.label}</p>
          </Card>
        ))}
      </div>
    </ParentHomePageStyled>
  );
};

export default ParentHomePage;

const ParentHomePageStyled = styled.div`
  height: 100%;
  gap: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  .cards {
    display: flex;
    justify-content: center;
    gap: 100px;

    .card-item {
      background-color: ${COLOR_PRIMARY};
      /* white-space: nowrap; */
      display: flex;
      justify-content: center;
      align-items: center;
      height: 160px;
      width: 255px;
      cursor: pointer;
      p {
        font-size: 32px;
        font-weight: 600;
        color: white;
        text-align: center;
      }
    }
  }
`;