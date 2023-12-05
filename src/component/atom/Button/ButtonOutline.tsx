import { Button, ButtonProps } from 'antd';
import { styled } from 'styled-components';
import { COLOR_PRIMARY, COLOR_WHITE } from '../../../utils/variables/colors';

interface Props extends ButtonProps {
  label?: string;
}

const ButtonOutline = ({
  label = 'button',
  ...props
}: Props) => {
  return (
    <ButtonPrimaryStyled
      type='default'
      {...props}
    >
      {label}
    </ButtonPrimaryStyled>
  );
};

export default ButtonOutline;

export const ButtonStyled = styled(Button)`
  height: 42px;
  padding: 0px 26px;
`;

const ButtonPrimaryStyled = styled(ButtonStyled)`
  background-color: ${COLOR_WHITE};
  color: ${COLOR_PRIMARY};
  border-color: ${COLOR_PRIMARY};
  &:hover {
    color: ${COLOR_WHITE} !important;
    background-color: ${COLOR_PRIMARY} !important;
  }
`;