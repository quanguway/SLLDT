import { styled } from 'styled-components';
import RowH from '../../atom/Row/RowH';
import { useCollapseSidebar } from '../../../services/hooks/useCollapseSidebar';
import { LogoutOutlined, MenuFoldOutlined, MenuUnfoldOutlined, UserOutlined } from '@ant-design/icons';
import { HEIGHT_HEADER } from '../../../utils/variables/unit';
import { Avatar, List, Popover } from 'antd';
import Logo from '../../molecule/Logo';
import { COLOR_WHITE } from '../../../utils/variables/colors';
import { getBreakpointSidebar } from '../Sidebar';
import Notification from './Notification';
import storage from '../../../utils/sessionStorage';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';


const iconStyled: React.CSSProperties = {
  fontSize: '24px',
  cursor: 'pointer'
};



const Header = ({showHamburger = true}: {showHamburger?: boolean}) => {

  const [collapsed, setCollapsed] = useCollapseSidebar(false);
  const className = storage.get('class_name');
  const [open, setOpen] = useState<boolean>(false);

  // console.log(useMediaQuery(theme.breakpoints.up('sm')));

  const toggleCollapsed = () => {
    setCollapsed( !collapsed );
  };

  const userActions = [
    {
      title: 'logout'
    }
  ];

  const navigate = useNavigate();

  return (
    <> 
      <RowStyled justify={'space-between'}>
        {showHamburger ? <div className='hamburger'>
          <div className='icon' onClick={toggleCollapsed}>
              {collapsed ? <MenuUnfoldOutlined style={{...iconStyled}} /> : <MenuFoldOutlined style={{...iconStyled}} />}
          </div>
        </div> : <div></div>}
        {! getBreakpointSidebar() ? <Logo/> : <></>}

        <div className='tool'>
          {storage.get('role') !== 'ADMIN' && <span>Lớp {className}</span>}
          <Notification/>
          <Popover
      content={
        <List
          itemLayout="horizontal"
          dataSource={userActions}
          renderItem={(item) => (
      
        <ListItemStyled onClick={() => {storage.set('token', ''); navigate('/auth/sign-in');
            }}>
              <LogoutOutlined />
              {item.title}
            </ListItemStyled>
          )}
        />
      }
      placement='bottom'
      trigger="click"
      
      open={open}
      arrow={false}
      onOpenChange={(newValue) => setOpen(newValue)}
    ></Popover>
        <Avatar
          onClick={() => setOpen(true)}
          icon={<UserOutlined />}
        />
      </div>
      </RowStyled>
    </>
  );
};

export default Header;

const ListItemStyled = styled(List.Item)`
  cursor: pointer;
  width: 100px;
  padding: 4px 8px !important;

  & > * {
    margin-right: 8px;

  }

  &:hover {
    background-color: #cccccc40;
  }
`;

const RowStyled = styled(RowH)`
  position: sticky;
  top: 0;
  height: ${HEIGHT_HEADER};
  width: 100%;
  background-color: ${COLOR_WHITE};
  padding: 0px 20px;
  z-index: 500;
  box-shadow: 3px 3px 10px lightgray;

  .tool {
    display: flex;
    gap: 24px;
    align-items: center;
    & > * {
  
      cursor: pointer;
    }
  }
`;