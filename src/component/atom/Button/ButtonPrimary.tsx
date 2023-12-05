import { ButtonProps } from 'antd';
import { ButtonStyled } from './ButtonOutline';
import { styled } from 'styled-components';

interface Props extends ButtonProps {
  label?: string;
}

const ButtonPrimary = ({
  label = 'button',
  ...props
}: Props) => {
  return (
    <ButtonPrimaryStyled
      type='primary'
      {...props}
    >
      {label}
    </ButtonPrimaryStyled>
  );
};

export default ButtonPrimary;

const ButtonPrimaryStyled = styled(ButtonStyled)``;