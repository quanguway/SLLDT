import { MaskedInput } from 'antd-mask-input';
import NumberMask from '../../../utils/Mask/number';
import { PhoneOutlined } from '@ant-design/icons';
import { Form, FormItemProps } from 'antd';
import { styled } from 'styled-components';

interface Props extends FormItemProps {

}

const InputPhone = ({
  ...props
}: Props) => {
  return (
    <InputPhoneStyled {...props}>
      <MaskedInput mask={NumberMask.PHONE} addonBefore={<PhoneOutlined />} size='large'/>
    </InputPhoneStyled>
  );
};

export default InputPhone;

const InputPhoneStyled = styled(Form.Item)`
  width: 100%;
`;