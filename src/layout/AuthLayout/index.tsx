import { styled } from 'styled-components';
import ImageBanner from '../../asset/img/banner_login.png';
import RowCenter from '../../component/atom/Row/RowCenter';
import { Col, Image } from 'antd';
import ColCenter from '../../component/atom/Col/ColCenter';
import { Outlet } from 'react-router-dom';

const AuthLayout = () => {
  return (
    <AuthLayoutStyled>
      <Col span={14}>
        <Image alt={'banner'} src ={ImageBanner} preview={false} width={'100%'} height={'100vh'}/>
      </Col>
      <InputFormStyled span={10} >
          <Outlet/>
      </InputFormStyled>
    </AuthLayoutStyled>
  );
};

export default AuthLayout;

const AuthLayoutStyled = styled(RowCenter)`

`;

const InputFormStyled = styled(ColCenter)`
  padding: 60px;
`;