import { Checkbox, Form, FormItemProps } from 'antd';

interface Props extends FormItemProps {
  labelCheckbox: string,
  onChange?: any,
}

const InputCheckbox = ({
  labelCheckbox,
  onChange,
  name,
  ...props
}: Props) => {
  const form = Form.useFormInstance();
  return (
    <Form.Item {...props}>
      <Checkbox onChange={onChange} style={{fontWeight: 600}}>{labelCheckbox}</Checkbox>
    </Form.Item>
  );
};

export default InputCheckbox;