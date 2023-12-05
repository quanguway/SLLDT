import { Drawer } from 'antd';
import { IDataTimeTable, headerTableTime } from '.';
import { useState } from 'react';
import FormLayout from '../../../component/organism/FormLayout';
import InputText from '../../../component/atom/Input/InputText';

const ColTimeTable = ({data}: {data: IDataTimeTable[]}) => {

  const [open, setOpen] = useState<boolean>();
  const [, setFormData] = useState<IDataTimeTable>();

  const handleOpen = (data?: IDataTimeTable) => {
    setOpen(true);
    setFormData(data);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      {
        headerTableTime.map((header, index) => {
          const colData = data.find(o => o.day_of_week === header.value);
           return <td className='lesson-time' onClick={() => handleOpen(colData)} key={index}>{colData?.lesson}</td>;
        }
        )
      }
      <Drawer open={open} onClose={handleClose}>
        <FormLayout<any>
          onSubmit={(values) => console.log(values)}>
              <InputText
                name={'name'} 
                label='Name' 
                rules={[
                  {required: true}]}/>
              {/* <InputSwitcher name='check' label='Checked'/>
              <InputPhone name={'phone'} />
              <InputDatePicker/>
              <InputCurrency/>
              <InputSelectRange/> */}
        </FormLayout>
      </Drawer>
    </>
  );
};
export default ColTimeTable;