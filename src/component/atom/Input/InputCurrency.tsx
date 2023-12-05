import { Form, FormItemProps, InputNumber } from 'antd';

interface Props extends FormItemProps {

}

const InputCurrency = ({
  ...props
}: Props) => {
  return (
    <Form.Item {...props}>
      <InputNumber 
        controls= {false}
        formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')} 
        parser={(value) => value!.replace(/\$\s?|(,*)/g, '')}
        addonBefore={<IconCurrency />} 
        size='large'/>
    </Form.Item>
  );  
};

export default InputCurrency;

const IconCurrency = () => {
  return (
    <svg width={'1em'} height={'1em'} id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 78.03 122.88">
      <title>vietnamese-dong</title>
        <path d="M68.59,101.2H50.51V91.12c-.53,0-7,11.77-22.12,11.77q-13.09,0-20.75-9.26T0,68.53q0-16.8,8.6-27.06T31.19,31.19q13.45,0,19,10h.33V22.39H28.45V10.15H50.51V0H68.59V10.15H78V22.39H68.59V101.2ZM50.76,62.08a16.93,16.93,0,0,0-4.42-12,14.53,14.53,0,0,0-11.13-4.8,14.51,14.51,0,0,0-12.35,6.09c-3,4.06-4.51,9.59-4.51,16.64q0,9.69,4.26,15.19c2.85,3.66,6.8,5.49,11.89,5.49a14.42,14.42,0,0,0,11.81-5.76q4.57-5.76,4.45-14.35V62.08Zm17.12,60.8H2.42V111.22H67.88v11.66Z"/>
      </svg>
  );
};