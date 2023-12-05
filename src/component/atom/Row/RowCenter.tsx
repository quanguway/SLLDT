import { Row, RowProps } from 'antd';

interface Props extends RowProps {

}

const RowCenter = ({ 
  align = 'middle',
  justify = 'center',
  ...props} : Props) => {
  return (
    <Row 
      align={align}
      justify={justify}
      {...props}>

    </Row>
  );
};

export default RowCenter;