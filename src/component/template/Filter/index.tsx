import React from 'react';
import RowH from '../../atom/Row/RowH';
import { styled } from 'styled-components';

interface Props {
  children?: React.ReactNode
}

const Filter = ({children}: Props) => {
  return (
    <FilterStyled justify={'space-between'}>
        {/* <OBreadcrumb/> */}
        <div></div>
        <div className='options'>
          {children}
        </div>
    </FilterStyled>
  );
};

export default Filter;

const FilterStyled = styled(RowH)`
  background-color: white;
  border-radius: 12px;
  padding: 8px;
  .options {
    /* width: 80%; */
    display: flex;
    & > * {
      margin-left: 8px;
    }
  }
`;