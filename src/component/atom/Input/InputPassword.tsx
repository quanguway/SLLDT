import { Form, FormItemProps, Input } from 'antd';

interface Props extends FormItemProps {
  placeholder?: string;
  defaultValue?: string;
  value?: string;
}

const InputTextPassword = ({
  placeholder,
  defaultValue,
  value,
  ...props
}: Props) => {
  return (
    <Form.Item {...props}>
      <Input.Password
        value={value}
        defaultValue={defaultValue}
        placeholder={placeholder}
        size='large' />
    </Form.Item>
  );
};

export default InputTextPassword;