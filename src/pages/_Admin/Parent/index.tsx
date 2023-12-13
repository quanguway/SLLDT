import { styled } from 'styled-components';
import Filter from '../../../component/template/Filter';
import DataTable from '../../../component/molecule/DataTable';
import { useEffect, useState } from 'react';
import uiActions from '../../../services/UI/actions';
import { Form, Input, Modal, Radio, message } from 'antd';
import ActionTable from '../../../component/molecule/DataTable/ActionTables';
import { EditOutlined, EyeOutlined } from '@ant-design/icons';
import { useAppDispatch } from '../../../store/hooks';
import { ClassType, DrawerStyled, TeacherType } from '../Class';
import { ColumnsType } from 'antd/es/table';
import apisClass from '../../ClassPage/services/apis';
import ModalButton from '../../../component/organism/ModalButton';
import FormLayout from '../../../component/organism/FormLayout';
import InputText from '../../../component/atom/Input/InputText';
import InputDatePicker from '../../../component/atom/Input/InputDatePicker';
import InputPhone from '../../../component/atom/Input/InputPhone';
import { COLOR_YELLOW_DARK } from '../../../utils/variables/colors';
import dayjs from 'dayjs';
import apisParent from './services/apis';
// import { bcryptEncode } from '../../../utils/unit';

const ParentAdminPage = () => {

  const [gender, setGender] = useState<boolean>();
  const dispatch = useAppDispatch();

  const [, setDataClass] = useState<ClassType[]>();
  const [dataTeacher, setDataTeacher] = useState<TeacherType[]>();
  const [detail, setDetail] = useState<TeacherType | null>();
  const [viewDetail, setViewDetail] = useState<any>();
  const [formEdit] = Form.useForm();

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

  const columns : ColumnsType<TeacherType> = [
    // {
    //   title: 'Mã GV',
    //   dataIndex: 'MaGiaoVien__c',
    //   key: 'MaGiaoVien__c',
    // },
    {
      title: 'Tên Phụ huynh',
      dataIndex: 'Name',
      key: 'Name',
    },
    {
      title: 'Số diện thoại',
      render: (_, record: TeacherType) => {
        return record.User.Phone__c;
      }
    },
    {
      title: 'Email',
      render: (_, record: TeacherType) => {
        return record.User.Email__c;
      }
    },
    // {
    //   title: 'Lớp chủ nhiệm hiện tại',
    //   render: (_, record: TeacherType) => {
    //     return dataClass?.find(o => o.GiaoVien__c === record.Id)?.Name;
    //   }
    // },
    {
      title: 'Hành động',
      render: (item) => {
        return (
          <ActionTable actions={[
            {
              handle: () => setViewDetail(item),
              icon: <EyeOutlined />,
              label: 'Xem chi tiết',
              color: '#1890ff'
            },
            {
              handle: () => setDetail(item),
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

      const res = await apisClass.getListClass({
        year: 2023,
      });

      const resTeacher = await apisParent.getListParent();

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

  useEffect(() => {
    
    formEdit.setFieldsValue({
      UserName__c: detail?.User.UserName__c,
      Phone__c: detail?.User.Phone__c,
      Email__c: detail?.User.Email__c,
      BirthDay__c: dayjs(detail?.User?.BirthDay__c ?? '1969-12-08') ,
      Gender__c: detail?.User?.Gender__c,
      // Password__c: detail?.User.Password__c
    });
    setGender(detail?.User?.Gender__c);
  }, [detail]);

  // const dataTable = useMemo(() => {

  //   if(!dataClass || !dataTeacher) return [];

  //   return dataClass.map(o => ({
  //     ...o,
  //     TeacherName__c: dataTeacher?.find(teacher => teacher.Id === o.GiaoVien__c)?.Name
  //   }));
  // }, [dataClass, dataTeacher]); 


  return (
    <ParentAdminPageStyled>
      <h1 style={{margin: '12px 0px'}}>Phụ huynh</h1>

      <Filter>
        {/* <InputSelect value={classId} options={[{
          value: classId,
          label: className,
        }]} /> */}
        {/* <InputSearchText /> */}

        <ModalButton 
          // isOpen={open}
          title={'Phụ huynh'}
          label='Thêm Phụ huynh'
        >
          <FormLayout<any>
              onSubmit={async (value) => {
                dispatch(uiActions.setLoadingPage(true));
                
                try {
                   await apisParent.saveParent({
                    ...value,
                    Phone__c: value.Phone__c.replaceAll('-', ''),
                    Gender__c: gender ?? false,
                    Type__c: !gender ? 'Mother' : 'Father',
                    BirthDay__c: value.BirthDay__c.format('YYYY-MM-DD'),
                    Password__c: value.Phone__c.replaceAll('-', '')
                  });
                  fetchData();

                } catch (e) {
                  message.error('Số điện thoại hoặc emil bị trùng. Xin vui lòng nhập lại');
                  
                } finally {
                  dispatch(uiActions.setLoadingPage(false));
                }
              }}
            >
            <InputText required name='UserName__c' label='Tên phu huynh'/>
            <InputPhone required name={'Phone__c'} label='Số diện thoại'/>
            <InputText rules={[
              {required: true},
              {type: 'email', message: 'Email không đúng dịnh dạng'}
            ]} name='Email__c' label='Email'/>
            <Form.Item required name={'BirthDay__c'} label='Sinh nhật'>
              <InputDatePicker  />
            </Form.Item>

            <Form.Item name={'Gender__c'} label='Giới tính'>
              <Radio.Group  onChange={(e) => setGender(e.target.value)} value={gender}>
                <Radio value={true}>Nam</Radio>
                <Radio value={false}>Nữ</Radio>
              </Radio.Group>
            </Form.Item>
            {/* <InputTextPassword required name={'Password__c'} label='Mật khẩu'/> */}
            {/* <Form.Item label='Lớp chủ nhiệm'>
              <InputSelect/>
            </Form.Item> */}
          </FormLayout>
        </ModalButton>

      </Filter>
      <div style={{margin: '12px'}}></div>
      <DataTable bordered={false} columns={columns} dataSource={dataTeacher}/>

      {/* Edit */}

      

      <ModalStyled 
        // isOpen={open}
        footer={null}
        forceRender
        centered
          onCancel={() => setDetail(null)}
          open={!!detail}
          title={'Phụ huynh'}
        >
          <FormLayout<any>
              form={formEdit}
              onSubmit={async (value) => {
                dispatch(uiActions.setLoadingPage(true));
                try {
                  await apisParent.saveParent({ 
                    // ...detail,
                    // ...value,
                    Id: detail?.Id,
                    Gender__c: gender,
                    Type__c: !gender ? 'Mother' : 'Father',
                    IdUser: detail?.User.Id,
                    BirthDay__c: value.BirthDay__c.format('YYYY-MM-DD'),
                    Phone__c: value.Phone__c === detail?.User.Phone__c ? undefined : value.Phone__c,
                    Email__c: value.Email__c === detail?.User.Email__c ? undefined : value.Email__c,
                    Password__c: detail?.User.Phone__c
                  });
                  fetchData();

                } catch (e) {
                  message.error('Số điện thoại hoặc emil bị trùng. Xin vui lòng nhập lại');
                  
                } finally {
                  dispatch(uiActions.setLoadingPage(false));
                }
              }}
            >
            <InputText required name='UserName__c' label='Tên phụ huynh'/>
            <InputPhone required name={'Phone__c'} label='Số diện thoại'/>
            <InputText rules={[
              {required: true},
              {type: 'email', message: 'Email không đúng dịnh dạng'}
            ]} name='Email__c' label='Email'/>
            <Form.Item required name={'BirthDay__c'} label='Sinh nhật'>
              <InputDatePicker  />
            </Form.Item>

            <Form.Item label='Giới tính'>
              <Radio.Group  onChange={(e) => setGender(e.target.value)} value={gender}>
                <Radio value={true}>Nam</Radio>
                <Radio value={false}>Nữ</Radio>
              </Radio.Group>
            </Form.Item>
            {/* <InputTextPassword required name={'Password__c'} label='Mật khẩu'/> */}
            {/* <Form.Item label='Lớp chủ nhiệm'>
              <InputSelect/>
            </Form.Item> */}
          </FormLayout>
        </ModalStyled>

        <DrawerStyled
        placement='right'
        open={!!viewDetail}
        onClose={() => setViewDetail(undefined)}
      >
        <Form
          layout='vertical'
        >
          <Form.Item label={'Tên Phụ huynh'}>
            <Input disabled value={viewDetail?.Name}/>
          </Form.Item>
          <Form.Item label={'Ngày sinh'}>
            <Input disabled value={viewDetail?.User.BirthDay__c}/>
          </Form.Item>
          <Form.Item label={'Số diện thoại'}>
            <Input disabled value={viewDetail?.User.Phone__c}/>
          </Form.Item>
          <Form.Item label={'Email'}>
            <Input disabled value={viewDetail?.User.Email__c}/>
          </Form.Item>
          <Form.Item label={'Giới tính'}>
            <Input disabled value={viewDetail?.User.GioiTinh__c ? 'Nam' : 'Nữ'}/>
          </Form.Item>
        </Form>
      </DrawerStyled>

    </ParentAdminPageStyled>
  );

};

export default ParentAdminPage;

const ParentAdminPageStyled = styled.div`

`;

const ModalStyled = styled(Modal)`
  .ant-modal-title {
    font-size: 24px;
    text-align: center;
  }
`;