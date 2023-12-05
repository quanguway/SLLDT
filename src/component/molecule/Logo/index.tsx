import { styled } from 'styled-components';
import RowCenter from '../../atom/Row/RowCenter';
import { useCollapseSidebar } from '../../../services/hooks/useCollapseSidebar';
import { COLOR_PRIMARY } from '../../../utils/variables/colors';
import logo from '../../../asset/img/logo.png';
import { useNavigate } from 'react-router-dom';
import storage from '../../../utils/sessionStorage';

const Logo = () => {

  const [collapsed] = useCollapseSidebar();
  const navigate = useNavigate();

  return (
    <LogoStyled onClick={() => {
      storage.get('role') === 'PARENT' ? navigate('/app/home') : undefined;
    }} style={{ fontSize: collapsed ? '24px' : '26px'}}>
      <img width={70} height={60} src={logo}/>
    </LogoStyled>
  );
};

export default Logo;

const LogoStyled = styled(RowCenter)`
  height: 64px;
  z-index: 40;
  background-color: white;
  font-weight: bold;
  position: sticky;
  top: 0;
  left: 0;
  cursor: pointer;
  color: ${COLOR_PRIMARY};
`;

