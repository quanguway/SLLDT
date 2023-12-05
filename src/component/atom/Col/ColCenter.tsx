import { Col, ColProps } from 'antd';
import { styled } from 'styled-components';

interface Props extends ColProps {
  children: React.ReactNode;
}

const ColCenter = ({
  children,
  ...props
}: Props) => {
  return ( 
    <ColCenterStyled
      {...props}>
      {children}
    </ColCenterStyled>
  );
};

export default ColCenter;

const ColCenterStyled = styled(Col)`
  justify-content: center;
  align-items: center;
`;