import { SwapRightOutlined } from '@ant-design/icons';
import { Form, Select, Space } from 'antd';
import { styled } from 'styled-components';

const InputSelectRange = () => {

  const options = [
    {
      value: 'a',
      label: 'a'
    },
    {
      value: 'b',
      label: 'b'
    }
  ];

  const SelectRangeItem = () => (
    <Select showSearch options={options} size='large' />
  );

  return (
    <>
      <SpaceCompactStyled block>
        <FormItemStyled name={['select', 0]} label='Điểm đến'>
          <SelectRangeItem/>
        </FormItemStyled>
        <SwapRightOutlined style={{fontSize: '24px', margin: '0px 12px'}}/>
        <FormItemStyled name={['select', 1]} label='Điểm đi'>
          <SelectRangeItem/>
        </FormItemStyled>
      </SpaceCompactStyled>
    </>
  );
};

export default InputSelectRange;

const SpaceCompactStyled = styled(Space.Compact)`
`;

const  FormItemStyled = styled(Form.Item)`
  width: 100%;
`;