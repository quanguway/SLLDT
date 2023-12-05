import { styled } from 'styled-components';
import RowCenter from '../../atom/Row/RowCenter';
import { UserOutlined } from '@ant-design/icons';
import { Avatar, Col } from 'antd';
import storage from '../../../utils/sessionStorage';

const AvatarSidebar = ({collapsed, name} : {collapsed: boolean, name?: string}) => {

  

  return collapsed ? 
    (<AvatarCollapsedStyled>
      <Avatar
        size={'large'}
        icon={<UserOutlined />}
      />
    </AvatarCollapsedStyled>) :
    (<AvatarStyled>
      <Col>
        <Avatar
          size={100}
          icon={<UserOutlined />}
        />
        <h3>{name ?? storage.get('user_name')}</h3>
        <p>Học sinh</p>
      </Col>
    </AvatarStyled>);
};

export default AvatarSidebar;

const AvatarCollapsedStyled = styled(RowCenter)`
  padding: 24px 0px;
`;

const AvatarStyled = styled(RowCenter)`
  min-height: 100px;
  padding: 24px;  
  .ant-col {
    text-align: center;
  }
`;