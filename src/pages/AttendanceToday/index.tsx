import { styled } from 'styled-components';
import {  Checkbox, Input, Select, Space} from 'antd';
import DataTable from '../../component/molecule/DataTable';
import { useEffect, useMemo, useState } from 'react';
import { ColumnsType } from 'antd/es/table';
import { ActionFormStyled } from '../../component/organism/FormLayout';
import ButtonOutline from '../../component/atom/Button/ButtonOutline';
import ButtonPrimary from '../../component/atom/Button/ButtonPrimary';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../store/hooks';
import attendanceActions from '../Attendance/service/actions';
import attendanceSelectors from '../Attendance/service/selectors';

import uiActions from '../../services/UI/actions';
import apisLetterTeacher from '../AttendanceCheckPage/service/apis';
import moment from 'moment';
import storage from '../../utils/sessionStorage';
import fetch from '../../services/request';
import { configTimeout } from '../../utils/unit';
function formatDate(dateString: string): string {
  const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'numeric', day: 'numeric' };
  const formattedDate: string = new Date(dateString).toLocaleDateString('vi-Vi', options);

  return formattedDate;
}


interface DataType {
  maHS: string;
  name: string;
  vang: boolean;
  coPhep: boolean;
  disabled?: boolean;
}



// const data: DataType[] = [
//   {
//     key: '1',
//     name: 'John Doe',
//     age: 28,
//     status: null,
//   },
//   {
//     key: '2',
//     name: 'Jane Smith',
//     age: 24,
//     status: <Tag color='blue'>Có phép</Tag>,
//   },
//   {
//     key: '3',
//     name: 'Bob Johnson',
//     age: 32,
//     status: <Tag color='blue'>Có phép</Tag>,
//   },
//   {
//     key: '4',
//     name: 'Bob Johnson',
//     age: 32,
//     status: <Tag color='blue'>Có phép</Tag>,
//   },
//   {
//     key: '5',
//     name: 'Bob Johnson',
//     age: 32,
//     status: <Tag color='blue'>Có phép</Tag>,
//   },
//   {
//     key: '6',
//     name: 'Bob Johnson',
//     age: 32,
//     status: <Tag color='blue'>Có phép</Tag>,
//   },
//   {
//     key: '7',
//     name: 'Bob Johnson',
//     age: 32,
//     status: null,
//   },
//   {
//     key: '8',
//     name: 'Bob Johnson',
//     age: 32,
//     status: <Tag color='blue'>Có phép</Tag>,
//   },
//   {
//     key: '9',
//     name: 'Bob Johnson',
//     age: 32,
//     status: <Tag color='blue'>Có phép</Tag>,
//   },
//   {
//     key: '10',
//     name: 'Bob Johnson',
//     age: 32,
//     status: null,
//   },
//   {
//     key: '11',
//     name: 'Anh',
//     age: 32,
//     status: <Tag color='blue'>Có phép</Tag>,
//   },
//   {
//     key: '12',
//     name: 'Bob Johnson',
//     age: 32,
//     status: <Tag color='blue'>Có phép</Tag>,
//   },
//   {
//     key: '13',
//     name: 'Bob Johnson',
//     age: 32,
//     status: null,
//   },
//   {
//     key: '14',
//     name: 'Bob Johnson',
//     age: 32,
//     status: <Tag color='blue'>Có phép</Tag>,
//   },
//   {
//     key: '15',
//     name: 'Bob Johnson',
//     age: 32,
//     status: <Tag color='blue'>Có phép</Tag>,
//   },
  
// ];

// interface IStudent {
//   Id: string;
//   Ma_Hoc_Sinh__c: string;
//   Name: string;
//   NgaySinh__c?: any;
//   GioiTinh__c: boolean;
// }

const AttendanceTodayPage = () => {
  const navigate = useNavigate();
  const dateStr: string = new Date().toISOString();
  const formattedDate: string = formatDate(dateStr);
  // const [selectedRowKeys, setSelectedRowKeys] = useState<string[]>([]);
  // const [, setSearchText] = useState('');
  // const [, setFilteredData] = useState<DataType[] | null>(null);
  // const studentList = StudentSelectors.getStudentList() as IStudent[];

  const [studentList, setStudentList] = useState<any[]>();

  const [dataStudentAbsent, setDataStudentAbsent] = useState<any[]>([]);

  const [studentNP, setStudentNP] = useState<any[]>([]);
  // const dataStudent = useMemo(() => {
  //   console.log(studentList);
    
  //   return studentList.map((o: any) => ({
  //     coPhep: false,
  //     maHS: o.Ma_Hoc_Sinh__c,
  //     name: o.Name,
  //     vang: false
  //   }));
  // }, [studentList]);


  const getStudentList = async () => {
    const class_id = storage.get('class_id');

    await fetch({
      method: 'get',
      url: `class/${class_id}`,
      configs: {
        timeout: 2500
      }
      // params: { ...params, per_page: 100 },
    }).catch(() => {
      getStudentList();
    }).then((res) => {
      const studentList = res?.data?.data[0].Student;
      setStudentList(studentList);
    });
  };

  const getLetter = async () => {
    try {
      await dispatch(uiActions.setLoadingPage(true));
       const class_id = storage.get('class_id');
       await fetch({
          method: 'get',
          url: `letter/${class_id}`,
          configs: {
            ...configTimeout
          }
        }).catch(() => {
          getLetter();
        }).then(res => {

          if(res?.data?.data){
            const data = res.data.data;
            
            const listData = data?.filter((o: any) => {
              const ngayNghi = moment(o.NgayNghi__c, 'YYYY-MM-DD').subtract(1, 'day');
              const ngayKT = moment(o.NgayNghi__c, 'YYYY-MM-DD').add(o.SoNgayNghi__c, 'day');
    
              // console.log(moment().format('YYYY-MM-DD'), ngayNghi.subtract(1, 'day').format('YYYY-MM-DD'), ngayNghi.add(o.SoNgayNghi__c + 1, 'day').format('YYYY-MM-DD'));
              // console.log(moment().isBefore(ngayNghi) && moment().isAfter(ngayNghi.add(o.SoNgayNghi__c, 'day')));
              
              // console.log(moment().format('YYYY-MM-DD'), ngayNghi.subtract(1, 'day').format('YYYY-MM-DD'), moment().isAfter(ngayNghi.subtract(1, 'day'), 'date'));
              // console.log(moment().isAfter(ngayNghi.add(o.SoNgayNghi__c + 2, 'day'), 'date'));
              
              
              return moment().isAfter(ngayNghi) && moment().isBefore(ngayKT) && o.TrangThai__c === 'ACCEPT';
            });
            setStudentNP(listData);
          }
        });

      


        // return fetch({
        //   method: 'get',
        //   url: `class/${class_id}`,
        //   configs: {
        //     timeout: 2500
        //   }
        //   // params: { ...params, per_page: 100 },
        // }).catch(() => {
        //   getStudentList();
        // }).then((res) => {
        //   const studentList = res?.data?.data[0].Student;
        //   setStudentList(studentList);
        // });
    } catch (err) {
      console.log(err);
    } finally {
      dispatch(uiActions.setLoadingPage(false));
    }
  };
  
  useEffect(() => {

    if(!studentList || !studentNP) return;

    const data = studentList.map((o: any) => ({
      ...o,
      disabled: studentNP.some((stu: any) => stu.HocSinh__c === o.Id),
      coPhep: studentNP.some((stu: any) => stu.HocSinh__c === o.Id),
      maHS: o.Ma_Hoc_Sinh__c,
      name: o.Name,
      vang: studentNP.some((stu: any) => stu.HocSinh__c === o.Id),
      note: studentNP.find((stu: any) => stu.HocSinh__c === o.Id)?.LyDo__c
    }));

    setDataStudentAbsent(data);
  }, [studentList, studentNP]);



  useEffect(() => {
    getLetter();
    // delay(100);
    getStudentList();
  }, []);  

  const CheckBoxVang = ({dataStudentAbsent, record}: {dataStudentAbsent: any[], record: any, setDataStudentAbsent: (data:any) => void}) => {

    // const [, setValue] = useState<boolean>(dataStudentAbsent.find(o => o.maHS === record.maHS).vang);

    return (
      <Checkbox
        checked={dataStudentAbsent.find(o => o.maHS === record.maHS).vang}
        onChange={() => {
          const idx = dataStudentAbsent.findIndex(o => o.maHS === record.maHS);
          if(idx === -1) return;
          const isChecked = !dataStudentAbsent[idx].vang;

          dataStudentAbsent[idx].vang = isChecked;
          setDataStudentAbsent([...dataStudentAbsent]);
          // setValue(isChecked);
        }}
        // onChange={() => handleRowSelection(record.maHS)}
        // checked={selectedRowKeys.includes(record.maHS)}
      />
    );
  };


  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(attendanceActions.getAttendanceDetail.fetch({}));
    // dispatch(studentActions.getListStudent.fetch());
  }, []);

  const attendanceDetail = attendanceSelectors.getAttendanceDetail();

  // const handleRowSelection = (key: string) => {
  //   const newSelectedRowKeys = selectedRowKeys.includes(key)
  //     ? selectedRowKeys.filter((k) => k !== key)
  //     : [...selectedRowKeys, key];
  //   setSelectedRowKeys(newSelectedRowKeys);
  //   console.log(newSelectedRowKeys);
  // };


  const handleSave = async () => {
  const class_id = storage.get('class_id');

    try {
      dispatch(uiActions.setLoadingPage(true));
      const res  = await apisLetterTeacher.saveAttendanceDay({
        ClassHeader__c: class_id ?? '',
        Date__c: moment().format('YYYY-MM-DD'),
        Status__c: 'SUCCESS',
        Student: dataStudentAbsent.map(o => ({
          HocSinh__c: o.Id,
          Status__c: !o.vang ? 'DI_HOC' : (o.coPhep ? 'PHEP' : 'KHONG_PHEP'),
          note__c: o.note ?? ''
        }))
      });
      if(res) {
        navigate(-1);
      }
    } catch(err) {
      console.log(err);
      // message.error('Đã ')
      
    } finally {
      dispatch(uiActions.setLoadingPage(false));

    }
  };

  const DropDownCell = ({record}: {dataStudentAbsent: any, record: any, show: boolean}) => {

    const [, setValue] = useState<boolean>(false);

    const options = [
      {
        value: true,
        label: 'Có phép'
      },
      {
        value: false,
        label: 'Không phép'
      }
    ];

    return  (
      <Select 
        style={{
          width: '100%',
          border: 'none',
          outline: 'none',
        }}
        disabled={!dataStudentAbsent.find((o: any) => o.maHS === record.maHS)?.vang}
        value={dataStudentAbsent?.find((o: any) => o.maHS === record.maHS)?.coPhep}
        options={options}
        onChange={(value) => {
          const idx = dataStudentAbsent.findIndex((o: any) => o.maHS === record.maHS);
          if(idx === -1) return;
          console.log(dataStudentAbsent[idx].coPhep);
          
          dataStudentAbsent[idx].coPhep = value;
          setValue(value);
        }}
      />
    );
  };

  const InputCell = ({record}: {dataStudentAbsent: any, record: any, show: boolean}) => {

    const [, setValue] = useState<string>('');

    return  (
      <Input 
        style={{
          width: '100%',
          border: 'none',
          outline: 'none',
        }}
        disabled={!dataStudentAbsent.find((o: any) => o.maHS === record.maHS)?.vang}
        value={dataStudentAbsent?.find((o: any) => o.maHS === record.maHS)?.note}
        onChange={(value) => {
          const idx = dataStudentAbsent.findIndex((o: any) => o.maHS === record.maHS);
          if(idx === -1) return;
          console.log(dataStudentAbsent[idx].coPhep);
          
          dataStudentAbsent[idx].note = value.target.value;
          setValue(value.target.value);
        }}
      />
    );
  };

  const data: DataType[] = attendanceDetail.map(o => ({
    coPhep: o.CoPhep__c,
    maHS: o.MaHocSinh__c,
    name: o.Name,
    vang: o.VangMat__c
  }));

  const columns: ColumnsType<DataType> = useMemo(() => [
    
    {
      title: 'Mã HS',
      dataIndex: 'maHS',
      key: 'msHS',
    },
    {
      title: 'Tên HS',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Vắng',
      dataIndex: 'vang',
      key: 'vang',
      render: (val, record) => {
        if(record.vang) console.log(record.vang, record.name);
          console.log(dataStudentAbsent);
          
          return (
            <CheckBoxVang setDataStudentAbsent={setDataStudentAbsent} record={record} dataStudentAbsent={dataStudentAbsent}/>
          );
        // } 
        // else {
        //   return (
        //     <Checkbox disabled />
        //   );
        // }
      },
    },
    {
      title: 'Trạng thái',
      rowSpan: 4,
      dataIndex: 'status',
      render: (val, record) => {

        return (
          <DropDownCell dataStudentAbsent={dataStudentAbsent} record={record} show={dataStudentAbsent?.find((o: any) => o.maHS === record.maHS)?.vang ?? true} />
        );
      }
    },
    {
      title: 'Lí do',
      rowSpan: 4,
      dataIndex: 'note',
      fixed: true,
      render: (val, record) => {
        return (
          <InputCell dataStudentAbsent={dataStudentAbsent} record={record} show={dataStudentAbsent?.find((o: any) => o.maHS === record.maHS)?.vang ?? true} />
        );
      }
    },
  ], [dataStudentAbsent]);

  // const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const searchText = e.target.value;
  //   setSearchText(searchText);

  //   if (!searchText) {
  //     setFilteredData(null);
  //     return;
  //   }

  //   const filtered = data.filter((item) =>
  //     item.name.includes(searchText)
  //   );
  //   setFilteredData(filtered);
  // };

  return (
    <AttendanceTodayStyled  style={{ maxHeight: '600px' }}>
      {/* <Filter></Filter> */}
      <div>
        <Space>
          <h2 style={{marginBottom: '30px'}}>Điểm danh ngày:  {formattedDate}</h2> <span />
          {/* <Input
          placeholder="Tìm kiếm theo tên"
          onChange={handleSearch}
          value={searchText}
        /> */}
        </Space>
        
        <DataTable  style={{ height: '480px' }}  scroll={{ x: 300 }} 
      dataSource={ dataStudentAbsent || data }
      columns={columns}
      rowClassName={record => record.disabled ? 'disabled-row' : ''}
    />
      </div>
      <br />
      <ActionFormStyled style={{
        marginTop: '100px'
      }} justify={'end'} >
        <ButtonOutline style={{color:'gray'}} label='Hủy' onClick={()=> navigate('/attendance')}/>
        {/* <ButtonOutline style={{marginRight:10}}  label='Lưu Nháp'/> */}
        <ButtonPrimary onClick={handleSave} label={'Lưu'}/>
      </ActionFormStyled>
      <div style={{
        height: '20px'
      }}></div>
    </AttendanceTodayStyled>
  );
};

export default AttendanceTodayPage;

const AttendanceTodayStyled = styled.div`
  .disabled-row {
    opacity: 0.5;
    pointer-events: none;
  }
`;





// const TextField = ({dataStudentAbsent, record}: {dataStudentAbsent: any[], record: any}) => {

//   const [, setValue] = useState<boolean>(dataStudentAbsent.find(o => o.maHS === record.maHS).vang);

//   return (
//     <Checkbox
//       checked={dataStudentAbsent.find(o => o.maHS === record.maHS).vang}
//       onChange={(value) => {
//         const idx = dataStudentAbsent.findIndex(o => o.maHS === record.maHS);
//         if(idx === -1) return;
//         console.log(dataStudentAbsent[idx].vang);
        
//         const isChecked = !dataStudentAbsent[idx].vang;

//         dataStudentAbsent[idx].vang = isChecked;
//         setValue(isChecked);
//       }}
//       // onChange={() => handleRowSelection(record.maHS)}
//       // checked={selectedRowKeys.includes(record.maHS)}
//     />
//   );
// };