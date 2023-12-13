import { styled } from 'styled-components';
import { EyeOutlined } from '@ant-design/icons';
import { useEffect, useState } from 'react';

import { ColumnsType } from 'antd/es/table';
import { useAppDispatch } from '../../../store/hooks';
import { getGender } from '../../../utils/unit';
import ActionTable from '../../../component/molecule/DataTable/ActionTables';
import Filter from '../../../component/template/Filter';
import DataTable from '../../../component/molecule/DataTable';
import { ClassType, DrawerStyled } from '../Class';
import uiActions from '../../../services/UI/actions';
import apisClass from '../../ClassPage/services/apis';
import { Form, Input, Radio, Select, message } from 'antd';
import apisStudent from '../../StudentPage/services/apis';
import moment from 'moment';
import InputText from '../../../component/atom/Input/InputText';
import FormLayout from '../../../component/organism/FormLayout';
import ModalButton from '../../../component/organism/ModalButton';
import InputDatePicker from '../../../component/atom/Input/InputDatePicker';
import apisStudentAdmin from './services/apis';
import apisParent from '../Parent/services/apis';

const StudentAdminPage = () => {

  const dispatch = useAppDispatch();
  const [, setDataClass] = useState<ClassType[]>();
  const [dataStudent, setDataStudent] = useState<any[]>();
  const [classFilter] = useState<string>();
  const [yearFilter] = useState<string>();
  const [gender, setGender] = useState<boolean>(true);
  const [parentData, setParentData] = useState<any[]>();



  const [detail, setDetail] = useState<any>();
  const [open, setOpen] = useState(false);


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

  const fetchData = async () => {
    try{
      dispatch(uiActions.setLoadingPage(true));

      const res = await apisClass.getListClass({
        year: 2023,
      });

      const parrentRes = await apisParent.getListParent();

      if(parrentRes?.data?.data) {
        setParentData(parrentRes?.data?.data);
      }

      // const resTeacher = await apisTeacher.getListTeacher();

      if(res?.data?.data) {
        setDataClass(res.data.data);
      }

      // if(resTeacher?.data?.data) {
      //   setDataTeacher(resTeacher?.data?.data);
      // }

    } catch(e) {
      // message.error('Đã có lỗi xảy ra');
    } finally {
      dispatch(uiActions.setLoadingPage(false));

    }
  };

  const yearNow = moment().year();
  // const yearOption = range(0,50).map(o => ({
  //   value: yearNow - o,
  //   label: (yearNow - o).toString()
  // }));

  // const classOption = useMemo(() => {
  //   return dataClass?.map(o => ({
  //     label: o.Name,
  //     value: o.Id,
  //   }));
  // }, [dataClass]);

  useEffect(() => {
    fetchData();
  }, []);

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


  const fetchStudent = async () => {
    try{
      dispatch(uiActions.setLoadingPage(true));

      const res = await apisStudent.getListStudentByClass(classFilter ?? 'a075j00000AkxZjAAJ' ?? '', yearFilter?.toString() ?? yearNow.toString());

      // const resTeacher = await apisTeacher.getListTeacher();

      if(res?.data?.data) {
        setDataStudent(res.data.data?.[0]?.Student);
      }

      // if(resTeacher?.data?.data) {
      //   setDataTeacher(resTeacher?.data?.data);
      // }

    } catch(e) {
      // message.error('Đã có lỗi xảy ra');
    } finally {
      dispatch(uiActions.setLoadingPage(false));

    }
  };

  useEffect(() => {
    fetchStudent();
  }, []);

  useEffect(() => {
    fetchStudent();
  }, [classFilter, yearFilter]);

  return (
    <StudentAdminPageStyled>
      <h1 style={{margin: '12px 0px'}}>Học sinh</h1>
      <Filter>
      {/* <Form.Item name={'yearFilter'}>
        <InputSelect defaultValue={moment().year()} onChange={value => setYearFilter(value)} options={yearOption}/>
      </Form.Item>
      <Form.Item name={'classFilter'}>
        <InputSelect defaultValue={'1A'} onChange={value => setClassFilter(value)} options={classOption}/>
      </Form.Item>

      <InputSearchText /> */}
        {/* <InputSelect value={classId} options={[{
          value: classId,
          label: className,
        }]} /> */}
        <ModalButton
          state={[open, setOpen]}
          // isOpen={open}
          title={'Học sinh'}
          label='Thêm học sinh'
        >
          <FormLayout<any>
              onSubmit={async (value) => {
                dispatch(uiActions.setLoadingPage(true));
                console.log(value);
                
                try {
                  await apisStudentAdmin.saveStudent({
                    // ...value,
                    Name: value.Name,
                    GioiTinh__c: gender,
                    NgaySinh__c: value.NgaySinh__c.format('YYYY-MM-DD'),
                    parent: value.Parent__c.map((o: string) => ({
                      Parent__c: o
                    }))
                  });
                  fetchData();
                  setOpen(false);

                } catch (e) {
                  console.log(e);
                  
                  message.error('Số điện thoại hoặc emil bị trùng. Xin vui lòng nhập lại');
                  
                } finally {
                  dispatch(uiActions.setLoadingPage(false));
                }
              }}
            >
            <InputText required name='Name' label='Tên học sinh'/>

            <Form.Item required name={'NgaySinh__c'} label='Ngày sinh'>
              <InputDatePicker  />
            </Form.Item>

            <Form.Item name={'GioiTinh__c'} label='Giới tính'>
              <Radio.Group  onChange={(e) => setGender(e.target.value)} value={gender}>
                <Radio value={true}>Nam</Radio>
                <Radio value={false}>Nữ</Radio>
              </Radio.Group>
            </Form.Item>
            <Form.Item name={'Parent__c'} label='Phụ huynh'>
              <Select
                mode="multiple"
                size={'large'}
                placeholder="Please select"
                defaultValue={[]}
                // onChange={handleChange}
                style={{ width: '100%' }}
                options={(parentData ?? []).map(o => ({
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
        </ModalButton>
      </Filter>
      <div style={{margin: '12px'}}></div>

      <DataTable bordered={false} columns={columns} dataSource={dataStudent}/>
      <DrawerStyled
        placement='right'
        open={!!detail}
        onClose={() => setDetail(undefined)}
      >
        <Form
          layout='vertical'
        >
          <Form.Item label={'Mã Học sinh'}>
            <Input disabled  value={detail?.Ma_Hoc_Sinh__c}/>
          </Form.Item>
          <Form.Item label={'Tên Học sinh'}>
            <Input disabled value={detail?.Name}/>
          </Form.Item>
          <Form.Item label={'Ngày sinh'}>
            <Input disabled value={detail?.NgaySinh__c}/>
          </Form.Item>
          <Form.Item label={'Giới tính'}>
            <Input disabled value={detail?.GioiTinh__c ? 'Nam' : 'Nữ'}/>
          </Form.Item>
        </Form>
      </DrawerStyled>
    </StudentAdminPageStyled>
  );
};

export default StudentAdminPage;

const StudentAdminPageStyled = styled.div`

`;