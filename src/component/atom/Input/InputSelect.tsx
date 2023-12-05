import { Select, SelectProps } from 'antd';

interface Props extends SelectProps {

}

const InputSelect = ({
  ...props
}: Props) => {
  return (
    <>
      <Select
        // style={{width: '100%'}}
        size='large'
        {...props}
      />
    </>
  );
};

export default InputSelect;