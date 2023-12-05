import { styled } from 'styled-components';
import { BORDER_STYLED } from '../../../../../utils/unit';
import { Empty } from 'antd';

const ParentStudentNotification = () => {
  return (
    <NotificationStyled>
      <div className='header'>
        <div className='title'>
          <h3>Thông báo đến phụ huynh</h3>
        </div>
      </div>
      <div className='content'>
        <Empty description='Hiện tại không có thông báo'/>
      </div>
    </NotificationStyled>
  );
};

export default ParentStudentNotification;

const NotificationStyled = styled.div`
  /* border-radius: 8px;
  border: ${BORDER_STYLED};
  height: 100%;
  display: flex; */

  .header {
    display: flex;
    justify-content: space-between;
    margin-bottom: 56px;
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
  }
  
`;