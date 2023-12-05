import { Form, FormItemProps, Switch } from 'antd';
import { styled } from 'styled-components';

interface Props extends FormItemProps {

}

const InputSwitcher = ({
  ...props
}: Props) => {
  return (
    <Form.Item {...props}>
      <SwitchStyled size='default'/>
    </Form.Item>
  );
};

export default InputSwitcher;

const SwitchStyled = styled(Switch)``;