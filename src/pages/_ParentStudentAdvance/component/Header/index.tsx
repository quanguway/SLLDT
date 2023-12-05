import { styled } from 'styled-components';
import Logo from '../../../../component/molecule/Logo';
import NavTool from './NavTool';
import NavLink from './NavLink';
import { COLOR_PRIMARY } from '../../../../utils/variables/colors';

const ParentStudentHeader = () => {
  return (
    <ParentStudentHeaderStyled>
      <Logo/>
      <NavLink/>
      <NavTool/>
    </ParentStudentHeaderStyled>
  );
};

export default ParentStudentHeader;

const ParentStudentHeaderStyled = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 36px;

  /* background-color: ${COLOR_PRIMARY}; */

`;