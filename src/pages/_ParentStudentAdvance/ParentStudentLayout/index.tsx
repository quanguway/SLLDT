import { styled } from 'styled-components';
import ParentStudentHeader from '../component/Header';
import { CloseOutlined } from '@ant-design/icons';
import { Outlet } from 'react-router-dom';
import { useState } from 'react';
import Footer from '../../../component/template/Footer';
import { COLOR_PRIMARY } from '../../../utils/variables/colors';
import { ConfigProvider } from 'antd';


const ParentStudentLayout = () => {
  

  return (
    <ConfigProvider
        theme={{
          token: {
            fontFamily: '"Raleway", sans-serif',
            colorPrimary: COLOR_PRIMARY
          },
        }}
      >
        <ParentStudentLayoutStyled>
          <ParentStudentHeader/>
          <TopBar/> 
          <Outlet/>
          <Footer/>
        </ParentStudentLayoutStyled>
      </ConfigProvider>
  );
};

export default ParentStudentLayout;

const ParentStudentLayoutStyled = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100vh;
  .tool {
    display: flex;
    gap: 8px;
    align-items: center;
    & > * {
      cursor: pointer;
    }
  }
`;

const TopBar = () => {

  const [closeTopBar, setCloseTopBar] = useState<boolean>(false);

  return !closeTopBar ? <div style={{
    padding: '8px 16px',
    color: 'white',
    fontSize: '14px',
    backgroundColor: COLOR_PRIMARY,
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: '20px',

  }}> 
    <div></div>
    <p> Nếu bạn có vấn đề gì, hãy liên hệ cho chúng tôi qua <span style={{textDecoration: 'underline'}}>0812345679</span> </p> 
    <CloseOutlined style={{
      cursor: 'pointer'
    }} onClick={() => setCloseTopBar(true)} />
    </div> : <div style={{
      width: '100%',
      height: '1px',
      backgroundColor: 'lightgray',

    }}></div>;
};


