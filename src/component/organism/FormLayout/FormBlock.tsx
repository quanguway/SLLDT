import React from 'react';
import { styled } from 'styled-components';

type Props = {
  children?: React.ReactNode;
  label?: string;
  style?: React.CSSProperties;
}

const FormBlock = ({
  children,
  label,
  style
} : Props) => {
  return (
    <FormBlockStyled style={style}>
      <h3>
        {label}
      </h3>
      {children}
    </FormBlockStyled> 
  );
};
export default FormBlock;

const FormBlockStyled = styled.div`
  width: 100%;;
`;