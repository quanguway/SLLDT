import { Button, Tooltip } from 'antd';
import React from 'react';
import { styled } from 'styled-components';
import { hexToRGB } from '../../../../utils/unit';

interface ActionTableProps {
  actions: (ActionItem)[];
}

interface ActionItem {
  icon: React.ReactElement,
  label: string,
  handle: () => void,
  color?: string;
}

const ActionTable = ({actions} : ActionTableProps) => {
  return (
    <ActionTableStyled>
      {actions.map((o, index) => (
        // <ActionTableItemStyled onClick={o.handle} color={o.color ?? 'black'} key={index}>
        //   {o.icon}
        //   {o.label}
        // </ActionTableItemStyled>
        <Tooltip key={index} placement='topLeft' title={o.label}>
          <Button shape='default' icon={React.cloneElement(o.icon, {style:{color: o.color}})} size={'small'} onClick={o.handle} style={{backgroundColor: hexToRGB(o.color ?? '', 0.1), border: 'none'}} />
        </Tooltip>
      ))}
    </ActionTableStyled>
  );
};

export default ActionTable;

const ActionTableStyled = styled.ul`
  list-style: none;
  display: flex;
  padding: 0px;
  margin: 0px;
  display: flex;
  gap: 8px;
  justify-content: end;

`;

// const ActionTableItemStyled = styled.li<{color: string}>`
//     display: flex;
//     color: ${props => props.color};
//     flex-wrap: nowrap;
//     margin-right: 14px;
//     cursor: pointer;
//     &:hover {
//       text-decoration: underline;
//     }
//     /* border-bottom: 1px solid ${props => props.color}; */
//     span:first-child {
//       margin-right: 0.5px;
//     }
// `;