import {  Modal, Tag } from 'antd';
import { styled } from 'styled-components';
import DataTable from '../../../../component/molecule/DataTable';
import ActionTable from '../../../../component/molecule/DataTable/ActionTables';
import { DeleteOutlined } from '@ant-design/icons';
import absenceSelectors from '../../service/selectors';
import moment from 'moment';
import { EAbsenceStatus } from '../..';
import apisAbsence from '../../service/apis';

const ListAbsence = ({isAccept = false}: {isAccept?: boolean}) => {

  const Status = ({status}: {status: EAbsenceStatus}) => {
    switch (status) {
      case EAbsenceStatus.ACCEPT:
        return <Tag color='green'>Đã duyệt</Tag>;
      case EAbsenceStatus.DELETE:
        return <Tag color='red'>Đã huỷ</Tag>;
      case EAbsenceStatus.PENDING:
        return <Tag color='yellow'>Đang duyêt</Tag>;
      case EAbsenceStatus.DRAFT:
        return <Tag color='gray'>Nháp</Tag>;
      default:
        return <Tag>Đang gửi</Tag>;
    }
  };


  const columns = !isAccept ? [
    {
      title: 'Tên HS',
      dataIndex: 'student_name',
      key: 'student_name',
    },
    {
      title: 'Từ ngày',
      dataIndex: 'date_from',
      key: 'date_from',
    },
    {
      title: 'Đến ngày',
      dataIndex: 'date_to',
      key: 'date_to',
    },
    {
      title: 'Số ngày nghỉ',
      dataIndex: 'num_of_absent',
      key: 'num_of_absent', 
    },
    {
      title: 'Lí do',
      dataIndex: 'reason',
      key: 'reason', 
    },
    {
      title: 'Trạng thái',
      dataIndex: 'status',
      key: 'status', 
      render: (text: EAbsenceStatus) => {
        return (
          <Status status={text} />
        );
      }
    },
    {
      title: 'Hành động',
      render: ( record: any) => {
        return (
          <ActionTable actions={[
            {
              handle: async () => {
                await apisAbsence.saveAbsenceParent({
                  ...record,
                  TrangThai__c: EAbsenceStatus.DELETE
                });
              },
              icon: <DeleteOutlined />,
              label: 'Huỷ đơn nghỉ',
              color: '#f5222d'
            },
          ]}/>
        );
      },
    },
  ] :  [
    {
      title: 'Tên HS',
      dataIndex: 'student_name',
      key: 'student_name',
    },
    {
      title: 'Từ ngày',
      dataIndex: 'date_from',
      key: 'date_from',
    },
    {
      title: 'Đến ngày',
      dataIndex: 'date_to',
      key: 'date_to',
    },
    {
      title: 'Số ngày nghỉ',
      dataIndex: 'num_of_absent',
      key: 'num_of_absent', 
    },
    {
      title: 'Lí do',
      dataIndex: 'reason',
      key: 'reason', 
    },
    {
      title: 'Trạng thái',
      dataIndex: 'status',
      key: 'status', 
      render: (text: EAbsenceStatus) => {
        return (
          <Status status={text} />
        );
      }
    }
  ];

  const absenceParents = absenceSelectors.getAbsenceParent();

  const absenceParent = isAccept ? 
    absenceParents.filter(o => o.TrangThai__c === EAbsenceStatus.ACCEPT):
    absenceParents.filter(o => o.TrangThai__c !== EAbsenceStatus.ACCEPT);

  const data = absenceParent.map(o => ({
    student_name: o.HocSinh.Name,
    date_from: o.NgayNghi__c,
    date_to: moment(o.NgayNghi__c).add(o.SoNgayNghi__c, 'day').format('YYYY-MM-DD'),
    num_of_absent: o.SoNgayNghi__c,
    reason: o.LyDo__c,
    status: o.TrangThai__c
  }));

  // const data = [
  //   {
  //     student_code: '231412',
  //     student_name: 'Nguyễn Văn Long',
  //     date_from: '2023-04-12',
  //     date_to: '2023-04-13',
  //     num_of_absent: 2,
  //     reason: 'Xin nghỉ ốm',
  //     status: 'Chờ duyệt'
  //   },
  //   {
  //     student_code: '231412',
  //     student_name: 'Nguyễn Văn Long',
  //     date_from: '2023-04-12',
  //     date_to: '2023-04-13',
  //     num_of_absent: 2,
  //     reason: 'Xin nghỉ ốm',
  //     status: 'Chờ duyệt'
  //   }
  // ];

  return (
    <ListAbsenceStyled>
      <DataTable bordered={false} columns={columns} dataSource={data}/>
      <Modal>
        
      </Modal>
    </ListAbsenceStyled>
  );
};

export default ListAbsence;

const ListAbsenceStyled = styled.div`

`;