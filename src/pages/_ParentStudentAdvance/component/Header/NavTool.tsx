import { Avatar, List, Popover } from 'antd';
import Notification from '../../../../component/template/Header/Notification';
import { useNavigate } from 'react-router-dom';
import storage from '../../../../utils/sessionStorage';
import { useState } from 'react';
import { LogoutOutlined, UserOutlined } from '@ant-design/icons';
import { styled } from 'styled-components';
import { COLOR_PRIMARY } from '../../../../utils/variables/colors';

const NavTool = () => {

  // const [collapsed, setCollapsed] = useCollapseSidebar(false);
  const studentName = storage.get('student_name');
  const [open, setOpen] = useState<boolean>(false);

  // console.log(useMediaQuery(theme.breakpoints.up('sm')));

  // const toggleCollapsed = () => {
  //   setCollapsed( !collapsed );
  // };

  const userActions = [
    {
      title: 'Logout'
    }
  ];

  const navigate = useNavigate();

  return (
      <div className='tool'>
      <Notification/>
      <span style={{color: COLOR_PRIMARY}}><b>{studentName}</b></span>
      <Popover
        content={
          <List
            itemLayout='horizontal'
            dataSource={userActions}
            renderItem={(item) => (
        
            <ListItemStyled onClick={() => {storage.set('token', ''); navigate('/auth/sign-in');
              }}>
                <LogoutOutlined style={{marginRight: '8px'}} />
      
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
  );
};

export default NavTool;

const ListItemStyled = styled(List.Item)`
  cursor: pointer;
  width: 100px;
  font-weight: 700;

  &:hover {
    background-color: #cccccc40;
  }

`;