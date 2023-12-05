import FormLayout from '../../../../component/organism/FormLayout';
import InputText from '../../../../component/atom/Input/InputText';
// import ActionTable from '../../../../component/molecule/DataTable/ActionTables';
// import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import InputSwitcher from '../../../../component/atom/Input/InputSwitcher';
import InputPhone from '../../../../component/atom/Input/InputPhone';
import InputDatePicker from '../../../../component/atom/Input/InputDatePicker';
import InputCurrency from '../../../../component/atom/Input/InputCurrency';
import InputSelectRange from '../../../../component/atom/Input/InputSelectRange';

const CustomerForm = () => {

  // const dataSource = [
  //   {
  //     name: 'dasdasd',
  //     email: 'asdwdadasdasdaasdasdasdsdasdasdasds',
  //     len: 'dasdasd',
  //     gane: 'dasdddddasdasdasdwdasdasdddasfasfsdfefzdxczsvsdz'
  //   },
  //   {
  //     name: 'dasdasd',
  //     email: 'asdwdaasdadasdasdsadawdasdwasds',
  //     len: 'dasdasd',
  //     gane: 'dasdddddasdasdasdwdasdasdddasfasfsdfefzdxczsvsdz'
  //   },
  // ];


  // const columns = [
  //   {
  //     title: 'Service Name',
  //     dataIndex: 'name',
  //     key: 'name',
  //   },
  //   {
  //     title: 'Service Name',
  //     dataIndex: 'len',
  //     key: 'len',
  //   },
  //   {
  //     title: 'Service Name',
  //     dataIndex: 'gane',
  //     key: 'gane',
  //   },
  //   {
  //     title: 'Service Name',
  //     dataIndex: 'email',
  //     key: 'email',
  //   },
  //   {
  //     title: 'Actions',
  //     dataIndex: 'actions',
  //     key: 'actions',
  //     render: () => {
  //       return (
  //         <ActionTable actions={[
  //           {
  //             handle: () => undefined,
  //             icon: <EditOutlined />,
  //             label: 'Edit'
  //           },
  //           {
  //             handle: () => undefined,
  //             icon: <DeleteOutlined/>,
  //             label: 'Delete'
  //           }
  //         ]}/>
  //       );
  //     },
  //   },
  // ];

  return (
    <>
      <FormLayout<any>
        onSubmit={(values) => console.log(values)}>
            <InputText 
              name={'name'} 
              label='Name' 
              rules={[
                {required: true}]}/>
            <InputSwitcher name='check' label='Checked'/>
            <InputPhone name={'phone'} />
            <InputDatePicker/>
            <InputCurrency/>
            <InputSelectRange/>
      </FormLayout>
    </>
  );
};

export default CustomerForm;