import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import DataTable from '../../../../component/molecule/DataTable';
import ActionTable from '../../../../component/molecule/DataTable/ActionTables';
import { COLOR_RED, COLOR_YELLOW_DARK } from '../../../../utils/variables/colors';

const CustomerDataTable = () => {


  const dataSource = [
    {
      name: 'quang',
      phone_number: '04123123123'
    }
  ];
  
  const columns = [
    {
      title: 'Customer Name',
      dataIndex: 'name',
      key: 'name',
     
    },
    {
      title: 'Phone Number',
      dataIndex: 'phone_number',
      editable: true,
      key: 'phone_number',
    },
    {
      title: 'Service Name',
      dataIndex: 'email',
      key: 'email',
      editable: true

    },
    {
      title: 'Actions',
      dataIndex: 'actions',
      key: 'actions',
      render: () => {
        return (
          <ActionTable actions={[
            {
              handle: () => undefined,
              icon: <EditOutlined />,
              label: 'Edit',
              color: COLOR_YELLOW_DARK
            },
            {
              handle: () => undefined,
              icon: <DeleteOutlined />,
              label: 'Delete',
              color: COLOR_RED
            }
          ]}/>
        );
      },
    },
  ];
  
  return (
    <>
      <DataTable columns={columns} dataSource={dataSource}/>
    </>
  );
};

export default CustomerDataTable;