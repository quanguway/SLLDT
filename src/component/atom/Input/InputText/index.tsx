import { Form, FormItemProps, Input } from 'antd';
import { styled } from 'styled-components';

interface Props extends FormItemProps {
  placeholder?: string;
  defaultValue?: string;
  value?: string;
  disabled?: boolean;
}

const InputText = ({
  placeholder,
  defaultValue,
  value,
  disabled,
  ...props
}: Props) => {
  return (
    <InputTextStyled {...props}>
      <Input
        defaultValue={defaultValue}
        disabled={disabled}
        value={value}
        placeholder={placeholder}
        size='large' />
    </InputTextStyled>
  );
};

export default InputText;

const InputTextStyled = styled(Form.Item)`
  width: 100%;
`;