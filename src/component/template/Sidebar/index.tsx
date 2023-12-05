import { styled } from 'styled-components';
import {  HEIGHT_HEADER, WIDTH_SIDEBAR, WIDTH_SIDEBAR_COLLAPSED } from '../../../utils/variables/unit';
import { useCollapseSidebar } from '../../../services/hooks/useCollapseSidebar';
import useScreenDetect, { EScreen } from '../../../services/hooks/useScreenDetect';
import { useEffect } from 'react';
import { COLOR_WHITE } from '../../../utils/variables/colors';
import Logo from '../../molecule/Logo';
import MenuSidebar from '../../organism/MenuSidebar';



export const getBreakpointSidebar = () => {
  const screen = useScreenDetect();
  return screen === EScreen.BROWSER;
};

const Sidebar = () => {

  const [collapsed, setCollapsed] = useCollapseSidebar();
  const screen = useScreenDetect();



  useEffect(() => {
    if(screen !== EScreen.BROWSER)
      setCollapsed(true);
  }, [screen]);

  return (
    <SidebarStyled collapsed={collapsed} breakpoint={getBreakpointSidebar()}>
      {getBreakpointSidebar() ? <Logo/> : <></>}
      {/* <AvatarSidebar collapsed={collapsed} /> */}
      <MenuSidebar collapsed={collapsed} />
    </SidebarStyled>
  );
};

export default Sidebar;

const SidebarStyled = styled.div<{collapsed: boolean, breakpoint: boolean}>`
  width: ${props => props.collapsed ? WIDTH_SIDEBAR_COLLAPSED : WIDTH_SIDEBAR};
  top: ${props => props.breakpoint ? 0 : HEIGHT_HEADER};
  z-index: ${props => props.breakpoint ? 1000 : 400};
  
  position: fixed;
  transition: width 0.3s cubic-bezier(0.2, 0, 0, 1) 0s;
  box-shadow: 5px 0px 10px lightgrey !important;
  overflow-y: auto;
  height: 100vh !important;
  background-color: ${COLOR_WHITE};
  left: 0;
`;