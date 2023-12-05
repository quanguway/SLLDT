import { Row, RowProps } from 'antd';

interface Props extends RowProps {

}

const RowH = ({ 
  align = 'middle',
  
  ...props} : Props) => {
  return (
    <Row 
      align={align}
      {...props}>

    </Row>
  );
};

export default RowH;