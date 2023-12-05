import { styled } from 'styled-components';
import DataTable from '../../component/molecule/DataTable';
import Filter from '../../component/template/Filter';
import ActionTable from '../../component/molecule/DataTable/ActionTables';
import { EyeOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useAppDispatch } from '../../store/hooks';
import studentActions from './services/actions';
import StudentSelectors from './services/selectors';
import {  ColumnsType } from 'antd/es/table';
import { getGender } from '../../utils/unit';
import InputSearchText from '../../component/atom/Input/InputSearch';

const StudentPage = () => {

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  // const data = [
  //   {
  //     MaHocSinh__c: '123',
  //     Name: 'Nhật Nam',
  //     birth__c: '2021/12/23',
  //     gender__c: true,
  //   },
  //   {
  //     MaHocSinh__c: '123',
  //     Name: 'Nhật Nam',
  //     birth__c: '2021/12/23',
  //     gender__c: true,
  //   },
  //   {
  //     MaHocSinh__c: '123',
  //     Name: 'Nhật Nam',
  //     birth__c: '2021/12/23',
  //     gender__c: true,
  //   },
  //   {
  //     MaHocSinh__c: '123',
  //     Name: 'Nhật Nam',
  //     birth__c: '2021/12/23',
  //     gender__c: true,
  //   }
  // ];

  const columns : ColumnsType<any> = [
    {
      title: 'Mã HS',
      dataIndex: 'Ma_Hoc_Sinh__c',
      key: 'Ma_Hoc_Sinh__c',
    },
    {
      title: 'Tên HS',
      dataIndex: 'Name',
      key: 'Name',
    },
    {
      title: 'Ngày sinh',
      dataIndex: 'NgaySinh__c',
      key: 'NgaySinh__c',
    },
    {
      title: 'Giới tính',
      dataIndex: 'gender__c',
      key: 'gender__c',
      render: (value) => {
        return getGender(value);
      },
    },
    {
      title: ' ',
      render: (item) => {
        return (
          <ActionTable actions={[
            {
              handle: () => navigate(item.Id),
              icon: <EyeOutlined />,
              label: 'Xem chi tiết',
              color: '#1890ff'
            },
          ]}/>
        );
      },
    },
  ];

  useEffect(() => {
    dispatch(studentActions.getListStudent.fetch());
  }, []);

  const data = StudentSelectors.getStudentList();

  return (
    <StudentPageStyled>
      <Filter>
        {/* <InputSelect value={classId} options={[{
          value: classId,
          label: className,
        }]} /> */}
        <InputSearchText />
      </Filter>
      <div style={{margin: '12px'}}></div>
      <DataTable bordered={false} columns={columns} dataSource={data}/>
    </StudentPageStyled>
  );
};

export default StudentPage;

const StudentPageStyled = styled.div`

`;