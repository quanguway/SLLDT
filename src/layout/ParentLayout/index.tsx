import { ConfigProvider, Layout, message } from 'antd';
import { Outlet } from 'react-router-dom';
import { styled } from 'styled-components';
import Header from '../../component/template/Header';
import Sidebar from '../../component/template/Sidebar';
import useDetachScreen, { EScreen } from '../../services/hooks/useScreenDetect';

// import { useState } from 'react';
import { useCollapseSidebar } from '../../services/hooks/useCollapseSidebar';
import { COLOR_PRIMARY } from '../../utils/variables/colors';
import { useEffect } from 'react';
import { socket } from '../../utils/socket';
import storage from '../../utils/sessionStorage';

const ParentLayout = () => {
  const screen = useDetachScreen();
  const classId = storage.get('class_id');
  useEffect(() => {
    if(classId && classId !== ''){
      socket.emit('addParent', {classId: classId});
    }
  },[]);

  useEffect(() => {
    socket.on('success-connect', (data) => {
    });
  },[socket]);



  const LayoutScreen = () => {
    return (
      <LayoutAppStyled>
        <Header showHamburger={false} />
        <MainLayout>
          <MainStyled>
            <Outlet/>
          </MainStyled>
        </MainLayout>
      </LayoutAppStyled>
    );
  };

  

  return (
    <ConfigProvider
        theme={{
          token: {
            fontFamily: '"Raleway", sans-serif',
            colorPrimary: COLOR_PRIMARY
            
          },
        }}
      >
        <LayoutScreen />
    </ConfigProvider>
    );
};
export default ParentLayout;

const LayoutAppStyled = styled.div`
`;
// 80
const MainLayout = ({children} : {children: React.ReactNode}) => {
  const [collapsed] = useCollapseSidebar();
  
  return (
    <MainLayoutBrowserStyled collapsed={collapsed}>
      {children}
    </MainLayoutBrowserStyled>
  );
};

const MainLayoutMobile = ({children} : {children: React.ReactNode}) => {

  return (
    <MainLayoutMobileStyled>
      {children}
    </MainLayoutMobileStyled>
  );
};

const MainLayoutBrowserStyled = styled(Layout)<{collapsed: boolean}>`

`;

const MainLayoutMobileStyled = styled(Layout)`
  margin-inline-start: 0px;
`;

const MainStyled = styled.div`
  overflow-y: auto;
  width: 100%;
  padding: 19px 64px;
  background-color: #ecf0fa;
  height: calc(100vh - 63px);
`;  

