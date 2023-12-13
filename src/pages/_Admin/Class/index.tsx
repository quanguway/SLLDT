import { styled } from 'styled-components';
import DataTable from '../../../component/molecule/DataTable';
import Filter from '../../../component/template/Filter';
import ActionTable from '../../../component/molecule/DataTable/ActionTables';
import { EditOutlined, EyeOutlined } from '@ant-design/icons';
import { useAppDispatch } from '../../../store/hooks';
import apisClass from '../../ClassPage/services/apis';
import uiActions from '../../../services/UI/actions';
import { Drawer, Form, Input, Modal, Select, message } from 'antd';
import { useEffect, useMemo, useState } from 'react';
import { ColumnsType } from 'antd/es/table';
import apisTeacher from '../Teacher/services/apis';
import ModalButton from '../../../component/organism/ModalButton';
import FormLayout from '../../../component/organism/FormLayout';
import InputText from '../../../component/atom/Input/InputText';
import InputSelect from '../../../component/atom/Input/InputSelect';
import moment from 'moment';
import apisclassAdmin from './services/apis';
import apisStudent from '../../StudentPage/services/apis';
import { COLOR_YELLOW_DARK } from '../../../utils/variables/colors';


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
  const [dataStudent, setDataStudent] = useState<any[]>();
  const [detail, setDetail] = useState<any>();
  const [editDetail, setEditDetail] = useState<any>();
  const [formEdit] = Form.useForm();

  console.log(dataStudent);
  

  const teacherOption = useMemo(() => {

    if(!dataTeacher) return [];

  return (dataTeacher ?? [])?.map(teacher => ({
    label: teacher.Name,
    value: teacher.Id
  }));},[dataTeacher]); 

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
            {
              handle: () => setEditDetail(item),
              icon: <EditOutlined />,
              label: 'Edit',
              color: COLOR_YELLOW_DARK
            },
          ]}/>
        );
      },
    },
  ];

  const fetchData = async () => {
    try{
      dispatch(uiActions.setLoadingPage(true));

      await apisClass.getListClass({
        year: 2023,
      }).then(res => {
        console.log(res);
        
        setDataClass(res?.data?.data);
      });

      const resStudent = await apisStudent.getListStudentAll();

      // const resTeacher = await apisTeacher.getListTeacher();
      console.log(resStudent);
      
      if(resStudent?.data?.data) {
        setDataStudent(resStudent.data.data);
      }

      const resTeacher = await apisTeacher.getListTeacher();

      // if(res?.data?.data) {
      //   setDataClass(res.data.data);
      // }

      if(resTeacher?.data?.data) {
        setDataTeacher(resTeacher?.data?.data);
      }

      // await apisClass.getListClass({
      //   year: 2023,
      // }).then(res => {
      //   console.log(res);
        
      //   setDataClass(res?.data?.data);
      // });
      

    } catch(e) {
      // message.error('Đã có lỗi xảy ra');
    } finally {
      dispatch(uiActions.setLoadingPage(false));

    }
  };

  console.log(editDetail);
  console.log(dataClass);
  
  

  useEffect(() => {
    if(!editDetail?.Id) return;
    console.log('???');
    
    dispatch(uiActions.setLoadingPage(true));
    apisStudent.getListStudentByClass(editDetail.Id, moment().get('year').toString()).then((values) => {
      console.log(values);
      
      formEdit.setFieldsValue({
        Id: editDetail.Id,
        Name: editDetail.Name,
        GiaoVien__c: editDetail.GiaoVien__c,
        // Status__c: 'Active',
        // SchoolYear__c: moment().get('year'),
        Student__c: values?.data.data?.[0]?.Student?.map((o: any) => (o.Id))
      });

      dispatch(uiActions.setLoadingPage(false));

    });

  }, [editDetail]);

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
              onSubmit={ async (values) => {
                try {
                  dispatch(uiActions.setLoadingPage(true));

                  await apisclassAdmin.saveclass({
                    Name: values.Name,
                    GiaoVien__c: values.GiaoVien__c,
                    Status__c: 'Active',
                    SchoolYear__c: moment().get('year'),
                    hocsinh: values.Student__c.map((o: string) => ({
                      HocSinh__c: o
                    }))
                  });

                  fetchData();
                } catch(e) {

                } finally {
                  dispatch(uiActions.setLoadingPage(false));

                }
              }}
            >
            {/* <h2>Lớp học</h2> */}
            <InputText name={'Name'} label={'Tên lớp học'} />
            <Form.Item name={'GiaoVien__c'} label='Giáo viên chủ nhiệm'>
              <InputSelect options={teacherOption} />
            </Form.Item>
            <Form.Item name={'Student__c'} label='Học sinh'>
              <Select
                mode="multiple"
                size={'large'}
                // placeholder=""
                defaultValue={[]}
                // onChange={handleChange}
                style={{ width: '100%' }}
                options={(dataStudent ?? []).map(o => ({
                  label: o.Name,
                  value: o.Id
                }))}
              />
            </Form.Item>
          </FormLayout>
        </ModalButton>
      </Filter>
      <div style={{margin: '12px'}}></div>
      <DataTable bordered={false} columns={columns} dataSource={dataTable}/>

      <ModalStyled 
        footer={null}
        forceRender
        centered
          onCancel={() => setEditDetail(null)}
          open={!!editDetail}
          title={''}
        >
          <FormLayout<any>
              form={formEdit}
              onSubmit={async (values) => {
                dispatch(uiActions.setLoadingPage(true));
                console.log(values);
                console.log({
                  Id: editDetail.Id,
                  Name: values.Name,
                  GiaoVien__c: values.GiaoVien__c,
                  Status__c: 'Active',
                  SchoolYear__c: moment().get('year'),
                  hocsinh: values.Student__c.map((o: string) => ({
                    Hocsinh__c: o
                  }))
                });
                
                try {
                  await apisclassAdmin.saveclass({
                    Id: editDetail.Id,
                    Name: values.Name,
                    GiaoVien__c: values.GiaoVien__c,
                    Status__c: 'Active',
                    SchoolYear__c: moment().get('year'),
                    hocsinh: values.Student__c.map((o: string) => ({
                      HocSinh__c: o
                    }))
                  });
                  fetchData();

                } catch (e) {
                  message.error('Có lỗi xảy ra');
                  
                } finally {
                  dispatch(uiActions.setLoadingPage(false));
                }
              }}
            >
            <InputText name={'Name'} label={'Tên lớp học'} />
            <Form.Item name={'GiaoVien__c'} label='Giáo viên chủ nhiệm'>
              <InputSelect options={teacherOption} />
            </Form.Item>
            <Form.Item name={'Student__c'} label='Học sinh'>
              <Select
                mode="multiple"
                size={'large'}
                // placeholder=""
                defaultValue={[]}
                // onChange={handleChange}
                style={{ width: '100%' }}
                options={(dataStudent ?? []).map(o => ({
                  label: o.Name,
                  value: o.Id
                }))}
              />
            </Form.Item>
            {/* <InputTextPassword required name={'Password__c'} label='Mật khẩu'/> */}
            {/* <Form.Item label='Lớp chủ nhiệm'>
              <InputSelect/>
            </Form.Item> */}
          </FormLayout>
      </ModalStyled>


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

const ModalStyled = styled(Modal)`
  .ant-modal-title {
    font-size: 24px;
    text-align: center;
  }
`;