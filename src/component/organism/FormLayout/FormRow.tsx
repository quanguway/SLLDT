import { FormItemProps } from 'antd';
import { ReactElement } from 'react';
import { styled } from 'styled-components';

interface Props extends FormItemProps {
  children?: ReactElement;
  label?: string;
}
const FormRow = ({
    children,
    label}: Props) => {
  return (
    <FormRowStyled>
      {label && <p className='label'>
        <span className='labelText'>{label}</span>
      </p>}
        {children}
    </FormRowStyled>
  );
};

export default FormRow;

const FormRowStyled = styled.div`
  width: 100%;
  display: flex;
  gap: 12px;
`;
