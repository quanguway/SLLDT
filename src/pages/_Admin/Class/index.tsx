import { styled } from 'styled-components';
import DataTable from '../../../component/molecule/DataTable';
import Filter from '../../../component/template/Filter';
import ActionTable from '../../../component/molecule/DataTable/ActionTables';
import { EyeOutlined } from '@ant-design/icons';
import { useAppDispatch } from '../../../store/hooks';
import apisClass from '../../ClassPage/services/apis';
import uiActions from '../../../services/UI/actions';
import { Drawer, Form, Input } from 'antd';
import { useEffect, useMemo, useState } from 'react';
import { ColumnsType } from 'antd/es/table';
import apisTeacher from '../Teacher/services/apis';
import ModalButton from '../../../component/organism/ModalButton';
import FormLayout from '../../../component/organism/FormLayout';
import InputText from '../../../component/atom/Input/InputText';
import InputSelect from '../../../component/atom/Input/InputSelect';
import moment from 'moment';


export type ClassType = {
  Id: string;
  Name: string;
  GiaoVien__c: string;
  NumOfStudent__c: number;
  Status__c: string;
  SchoolYear__c: number;
  CreatedDate: string;
  LastModifiedDate: string;
}

export type TeacherType = {
  Id: string;
  Name: string;
  MaGiaoVien__c: string;
  Users__c: string;
  User: UserType;
}

export type UserType = {
  Id: string;
  Name: string;
  CreatedDate: string;
  UserName__c: string;
  Gender__c: boolean;
  Email__c: string;
  Phone__c: string;
  BirthDay__c: string;
  Password__c: string;
  LastModifiedDate: string;
}

const ClassPage= () => {

  // const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const [dataClass, setDataClass] = useState<ClassType[]>();
  const [dataTeacher, setDataTeacher] = useState<TeacherType[]>();
  const [detail, setDetail] = useState<any>();

  const teacherOption = useMemo(() => dataTeacher?.map(teacher => ({
    label: teacher.Name,
    value: teacher.Id
  })),[dataTeacher]); 

  const columns : ColumnsType<any> = [
    {
      title: 'Lớp',
      dataIndex: 'Name',
      key: 'Name',
    },
    {
      title: 'Sĩ số',
      dataIndex: 'NumOfStudent__c',
      key: 'NumOfStudent__c',
    },
    {
      title: 'Giáo viên chủ nhiệm',
      dataIndex: 'TeacherName__c',
      key: 'TeacherName__c',
    },
    // {
    //   title: 'Giới tính',
    //   dataIndex: 'gender__c',
    //   key: 'gender__c',
    //   render: (value) => {
    //     return getGender(value);
    //   },
    // },
    {
      title: 'Hành động',
      render: (item, record) => {
        return (
          <ActionTable actions={[
            {
              handle: () => {
                setDetail(record);
              },
              icon: <EyeOutlined />,
              label: 'Xem chi tiết',
              color: '#1890ff'
            },
          ]}/>
        );
      },
    },
  ];

  const fetchData = async () => {
    try{
      dispatch(uiActions.setLoadingPage(true));

      const res = await apisClass.getListClass({
        year: 2023,
      });

      const resTeacher = await apisTeacher.getListTeacher();

      if(res?.data?.data) {
        setDataClass(res.data.data);
      }

      if(resTeacher?.data?.data) {
        setDataTeacher(resTeacher?.data?.data);
      }

    } catch(e) {
      // message.error('Đã có lỗi xảy ra');
    } finally {
      dispatch(uiActions.setLoadingPage(false));

    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const dataTable = useMemo(() => {

    if(!dataClass || !dataTeacher) return [];

    return dataClass.map(o => ({
      ...o,
      TeacherName__c: dataTeacher?.find(teacher => teacher.Id === o.GiaoVien__c)?.Name
    }));
  }, [dataClass, dataTeacher]); 

  return ( 
    <ClassPageStyled>
      <Filter>
        {/* <InputSelect value={classId} options={[{
          value: classId,
          label: className,
        }]} /> */}
        {/* <InputSearchText /> */}
        <ModalButton 
          title={'Lớp học'}
          label='Thêm lớp học'
        >
          <FormLayout<any>
              onSubmit={() => {
                
              }}
            >
            {/* <h2>Lớp học</h2> */}
            <InputText label={'Tên lớp học'} />
            <Form.Item label='Giáo viên chủ nhiệm'>
              <InputSelect options={teacherOption} />
            </Form.Item>
          </FormLayout>
        </ModalButton>
      </Filter>
      <div style={{margin: '12px'}}></div>
      <DataTable bordered={false} columns={columns} dataSource={dataTable}/>

      <DrawerStyled
        placement='right'
        open={!!detail}
        onClose={() => setDetail(undefined)}
      >
        <Form
          layout='vertical'
        >
          <Form.Item label={'Tên lớp học'}>
            <Input disabled value={detail?.Name}/>
          </Form.Item>
          <Form.Item label={'Sỉ số lớp'}>
            <Input disabled  value={detail?.NumOfStudent__c}/>
          </Form.Item>
          
          <Form.Item label={'Giáo viên chủ nhiệm'}>
            <Input disabled value={detail?.TeacherName__c}/>
          </Form.Item>
          <Form.Item label={'Năm học'}>
            <Input disabled value={moment(detail?.SchoolYear__c, 'YYYY').subtract(1, 'year').format('YYYY') + ' - ' + detail?.SchoolYear__c}/>
          </Form.Item>
          <Form.Item label={'Trạng thái'}>
            <Input disabled value={detail?.Status__c === 'Active' ? 'Đang hoạt động' : 'Ngưng hoạt động'}/>
          </Form.Item>
          {/* <Form.Item label={'Giới tính'}>
            <Input disabled value={detail?.}/>
          </Form.Item> */}
        </Form>
      </DrawerStyled>
    </ClassPageStyled>
  );
};

export default ClassPage;

const ClassPageStyled = styled.div`
  .ant-input {
    color: black
  }
`;

export const DrawerStyled = styled(Drawer)`
  .ant-input {
    color: black
  }
`;