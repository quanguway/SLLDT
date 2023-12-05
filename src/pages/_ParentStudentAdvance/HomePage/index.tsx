import { styled } from 'styled-components';
import TimeTableLine from './widgets/TimeLine';
import ParentStudentReportLesson from './widgets/ReportLesson';
import {  Divider } from 'antd';
import { COLOR_PRIMARY } from '../../../utils/variables/colors';
import { BORDER_STYLED } from '../../../utils/unit';
import storage from '../../../utils/sessionStorage';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import lesionActions from '../../ReportLesionPage/services/actions';

const ParentStudentHomePage = () => {

  const dispatch = useDispatch();

  // const RowInfo = ( {label, value}:{label: string, value: string}) => {
  //   return (
  //     <div style={{display: 'flex', gap: '8px', fontSize: '16px'}}>
  //       <h5 style={{fontWeight: 400, fontSize: '16px'}}>{label}: </h5>
  //       <p style={{fontWeight: 600, fontSize: '16px'}}>{value}</p>
  //     </div>
  //   );
  // };

  useEffect(() => {
    dispatch(lesionActions.getListLesion.fetch(true));
  }, []);

  return (
    <ParentStudentHomePageStyled>
      <h2 style={{
        padding: '0px 60px',
        fontSize: '18px',
        fontWeight: 800,
        color: 'gray',
      }}>Xin chào phụ huynh em <span style={{color: COLOR_PRIMARY}}>{storage.get('student_name')}</span>!</h2>
      <div className='container-header'>
        {/* <div className='info'>
          <h3>Thông tin học sinh</h3>
          <Divider/>

          <div className='info-content'>
            <div className='info-content-avatar'>
              <Avatar size={124} icon={<UserOutlined />}/>
              <a>Xem chi tiết</a>
            </div>
            <Divider type='vertical' style={{height: '100px'}}/>

            <div className='info-content-avatar-main'>
              <div>

              <RowInfo label='MaHS' value={'HS0004'}/>
              <RowInfo label='Họ và tên' value={storage.get('student_name') ?? ''}/>
              <RowInfo label='Ngày sinh' value='15/10/2001'/>
              </div>

              <div>

              <RowInfo label='Quê quán' value='Phú yên'/>
              <RowInfo label='Email' value={`${storage.get('student_name')?.split(' ')?.[(storage.get('student_name')?.split(' ')?.length ?? 0) - 1]}@gmail.com`}/>
              <RowInfo label='Số điện thoại' value='0987654321'/>
              </div>
              <div>

                <RowInfo label='Dân tộc' value='Kinh'/>
                <RowInfo label='Tôn giáo' value='Không'/>
              </div>
            </div>
          </div>
        </div> */}
        {/* <CardButton
        >
          <div>
            <h3>Xem bảng điểm</h3>
            <p>Xem chi tiết</p>
          </div>
        </CardButton> */}
        <div>

        </div>
      </div>
      <div className='content'>
        <div className='content-box'>
          <ParentStudentReportLesson />
          <Divider type='vertical' style={{height: '100%'}}/>
          <TimeTableLine />
          {/* <Divider type='vertical' style={{height: '100vh'}}/>
          <ParentStudentNotification /> */}
        </div>

      </div>
    </ParentStudentHomePageStyled>
  );
};

export default ParentStudentHomePage;

const ParentStudentHomePageStyled = styled.div`
  margin-top: 20px;
  .container-header {
    padding: 0px 60px;
    display: flex;
    justify-content: space-between;
    .info {
      margin-top: 46px;
      color: black;
      font-weight: 700;
      font-size: 16px;
      border: ${BORDER_STYLED};
      border-radius: 12px;
      padding: 16px 46px;
      box-shadow: 3px 3px 10px lightgray;
      width: 100%;


      .info-content {
        display: flex;
        align-items: center;
        gap: 32px;
      }

      .info-content-avatar {
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;

        & > a {
          color: blue;
          text-decoration: underline;
          cursor: pointer;
          margin-top: 12px;
          font: 14px;
        }
      }

      .info-content-avatar-main {
        display: flex;
        gap: 82px;

        & > div {
          display: flex;
          flex-direction: column;
          gap: 8px;
        } 
      }
    }
  }

  .content {
    
    padding: 20px 60px;
    /* width: 100%; */
    .content-box {
      box-shadow: 3px 3px 10px lightgray;
      display: flex;
      gap: 12px;
      padding: 16px;
      border-radius: 12px;
    }
    
  }

`;

// const CardButton = styled.div`
//   border: ${BORDER_STYLED};
//   border-radius: 12px;
//   box-shadow: 3px 3px 10px lightgray;
//   background-color: #a8071a;
//   color: white;
//   width: 370px;
//   margin-top: 46px;

// `;