import {  CheckCircleOutlined, CloseCircleOutlined, PlusOutlined } from '@ant-design/icons';
import DataTable from '../../component/molecule/DataTable';
import ActionTable from '../../component/molecule/DataTable/ActionTables';
import { styled } from 'styled-components';
import { Button, Card, Col, Radio, RadioChangeEvent, Row, Select, Space, Table, Tag, message } from 'antd';
import { useNavigate } from 'react-router';
import { SizeType } from 'antd/es/config-provider/SizeContext';
import { useEffect, useMemo, useState } from 'react';
import dayjs from 'dayjs';
import { ColumnsType } from 'antd/es/table';
import { useAppDispatch } from '../../store/hooks';
import uiActions from '../../services/UI/actions';
import apisLetterTeacher from './service/apis';
import InputDatePicker from '../../component/atom/Input/InputDatePicker';
import { DrawerStyled } from '../_Admin/Class';
import fetch from '../../services/request';
import { configTimeout } from '../../utils/unit';
import storage from '../../utils/sessionStorage';

interface DataType {
  ClassHeader__c: string;
  CreatedDate: Date;
  HocSinh__c: string;
  Id: string;
  LastModifiedDate: Date;
  LyDo__c: string;
  Name: string;
  NgayNghi__c: string;
  NgayNop__c: string;
  SoNgayNghi__c: number;
  TrangThai__c: string;
  key: string;
  endDay: string;
  studentName: string;
}

interface IAttandance {
  Id: string;
  Name: string;
  CreatedDate: string;
  LastModifiedDate: string;
  ClassHeader__c: string;
  Date__c: string;
  Status__c: string;
  SL_DI_HOC__c: number;
  SL_PHEP__c: number;
  SL_KHONG_PHEP__c: number;
}

const AttendanceCheckPage = () => {
  const [size,] = useState<SizeType>('middle');
  // const [, setSelectedDate] = useState<string | null>(null);
  const navigate = useNavigate();
  const [tab, setTab] = useState('DIEMDANH');
  const [dataDonXinNghi, setDataDonXinNghi] = useState<DataType[]>([]);
  const [dataDonXinNghiOrigin, setDataDonXinNghiOrigin] = useState<DataType[]>([]);
  const [cntTotal, setCntTotal] = useState<number>(0);
  const [cntTotalAccept, setCntTotalAccept] = useState<number>(0);
  const [cntTotalPending, setCntTotalPending] = useState<number>(0);
  const [cbxStatus, setcbxStatus] = useState<String>('PENDING');

  const [dataAttendance, setDataAttendance] = useState<IAttandance[]>();
  const dispatch = useAppDispatch();

  // const [detail, setDetail] = useState();

  const handleChange = (value: string) => {
    setcbxStatus(value);
  };

  const onChangeTab = ({ target: { value } }: RadioChangeEvent) => {
    setTab(value);
  };

  const fetchApi = async () => {

    try {
      dispatch(uiActions.setLoadingPage(true));
      // const res: any= await apisLetterTeacher.getListAttendance().then(value => {
        
      //   setDataAttendance(value?.data.data);
      // });


      const class_id = storage.get('class_id');
      await fetch({
        method: 'get',
        url: `/attendanceDay/classId/${class_id}`,
        configs: {
          ...configTimeout
        }
      }).catch(() => {
        fetchApi();
      }).then((res) => {
        setDataAttendance(res?.data.data);
      });
      
      

      // if(res?.data?.data) {
        
      // } else {
      //   setDataAttendance(undefined);
      // }
    } catch(err) {
      message.error('Đã có lỗi xảy ra');
    } finally {
      dispatch(uiActions.setLoadingPage(false));
    }
  };

  console.log(dataAttendance);
  

  useEffect(() => {
    if(dataAttendance) return;
    try {
      fetchApi();
    } catch(err) {
      fetchApi();

    }
  }, [dataAttendance]);

  const dataSource = useMemo(() => {

    if(!dataAttendance) return [];

    return dataAttendance?.map(o => ({
      date: o.Date__c,
      present: o.SL_DI_HOC__c,
      absent: o.SL_PHEP__c,
      noAbsent: o.SL_KHONG_PHEP__c
    }));
  }, [dataAttendance]) ;

  const columns = [
    {
      title: 'Ngày',
      dataIndex: 'date',
      key: 'date',
    },
    {
      title: 'Có mặt',
      dataIndex: 'present',
      key: 'present',
    },
    {
      title: 'Nghỉ có phép',
      dataIndex: 'absent',
      key: 'absent',
    },
    {
      title: 'Nghỉ không phép',
      dataIndex: 'noAbsent',
      key: 'absent',
    },
    // {
    //   title: 'Thao tác',
    //   dataIndex: 'actions',
    //   key: 'actions',
    //   render: () => {
    //     return (
    //       <ActionTable actions={[
    //         {
    //           handle: () => undefined,
    //           icon: <EyeOutlined />,
    //           label: 'Xem chi tiết',
    //           color: '#2f54eb'
    //         },
    //       ]}/>
    //     );
    //   },
    // },
  ];

  // const handleDateChange = (date: any, dateString: string) => {
  //   setSelectedDate(dateString);
  // };

  const getLetter = async () => {
    try {
      await dispatch(uiActions.setLoadingPage(true));
      const res = await apisLetterTeacher.getListLetter();
      if(res?.data?.data){
        const data = res.data.data;
        let cntPending = 0;
        let cntAccept = 0;
        const listData = data.map((item : any, index : number) => {
          cntPending += (item.TrangThai__c === 'PENDING' ? 1 : 0);
          cntAccept += (item.TrangThai__c === 'ACCEPT' ? 1 : 0);
          return {
            ...item,
            key: index + 1,
            endDay: dayjs(item.NgayNghi__c).add(item.SoNgayNghi__c, 'day'),
            studentName: item.HocSinh?.Name
          };
        });
        // console.log(listData);
        // setDataDonXinNghi([...listData]);
        setDataDonXinNghiOrigin([...listData]);
        setCntTotal(listData.length);
        setCntTotalAccept(cntAccept);
        setCntTotalPending(cntPending);
      }
    } catch (err) {
      console.log(err);
    } finally {
      dispatch(uiActions.setLoadingPage(false));
    }
  };

  const updateLetter = async (id : string, status: string) => {
    try {
      await dispatch(uiActions.setLoadingPage(true));
     await apisLetterTeacher.updateLetter(
        {
          TrangThai__c: status,
          Id: id
        }
      );
      const letter = dataDonXinNghiOrigin.findIndex((item) => item.Id === id);
      if(letter >= 0) {
        const listData = [...dataDonXinNghiOrigin];
        listData[letter].TrangThai__c = 'ACCEPT';
        setDataDonXinNghiOrigin([...dataDonXinNghiOrigin]);
        setCntTotalAccept(cntTotalAccept + 1);
        setCntTotalPending(cntTotalPending - 1);
      }
    } catch (err) {
      console.log(err);
    } finally {
      dispatch(uiActions.setLoadingPage(false));
    }
  };

  const columnsDonXinNghi: ColumnsType<DataType> = [
    {
      title: 'Tên học sinh',
      dataIndex: 'studentName',
      fixed: true,
      width: 200,
    },
    {
      title: 'Từ ngày',
      dataIndex: 'NgayNop__c',
      fixed: true,
      width: 120,
      align: 'center' as const,
      render: (value) => (dayjs(value).format('DD/MM/YYYY'))
    },
    {
      title: 'Đến ngày',
      dataIndex: 'endDay',
      fixed: true,
      width: 120,
      align: 'center' as const,
      render: (value) => (dayjs(value).format('DD/MM/YYYY'))
    },
    {
      title: 'Số ngày',
      dataIndex: 'SoNgayNghi__c',
      fixed: true,
      width: 90,
      align: 'center' as const
    },
    {
      title: 'Lý do nghỉ',
      rowSpan: 4,
      dataIndex: 'LyDo__c',
      fixed: true,
    },
    {
      title: 'Trạng thái',
      rowSpan: 4,
      dataIndex: 'TrangThai__c',
      fixed: true,
      width: 100,
      align: 'center' as const,
      render: (value) => {
        if (value === 'PENDING') 
          return <Tag color='yellow'>Chờ duyệt</Tag>;
        else if (value === 'DRAFT')
          return <Tag color='red'>Từ chối</Tag>;
        else if (value === 'ACCEPT')
          return <Tag color='green'>Đã duyệt</Tag>;
        else
          return <Tag color='green'>Đã duyệt</Tag>;
      }
    },
    {
      title: 'Thao tác',
      width: 100,
      align: 'center' as const,
      render: (item) => {
        return (
          item.TrangThai__c === 'PENDING' 
          ? <ActionTable
            actions={[
              {
                handle: () => {
                  updateLetter(item.Id, 'ACCEPT');
                },
                icon: <CheckCircleOutlined/>,
                label: 'Xác nhận đơn',
                color: '#4caf50',
              },
              {
                handle: () => {
                  updateLetter(item.Id, 'DRAFT');
                },
                icon: <CloseCircleOutlined />,
                label: 'Từ chối đơn',
                color: 'red',
              },
            ]}
          />
          : <></>
        );
      },
    },
  ];

  useEffect(() => {
    getLetter();
  }, []);

  useEffect(() => {
    if(cbxStatus === 'ALL') {
      setDataDonXinNghi([...dataDonXinNghiOrigin]);
    } else {
      const listData = dataDonXinNghiOrigin.filter((item) => item.TrangThai__c === cbxStatus);
      setDataDonXinNghi([...listData]);
    }
  }, [cbxStatus, dataDonXinNghiOrigin]);


  return (
    <AttendanceCheckPageStyled>
      {/* <Filter></Filter> */}
      <div style={{ position: 'relative'}}>
        <Radio.Group buttonStyle="solid" className='radio-tab' onChange={onChangeTab} value={tab}>
          <Radio.Button value="DIEMDANH">Điểm danh</Radio.Button>
          <Radio.Button value="NGHIPHEP">Đơn nghỉ phép</Radio.Button>
        </Radio.Group>
      </div>
      {tab === 'DIEMDANH' ? (
        <>
          <div style={{ position: 'relative', margin: '12px 0px'}}>
            <Space>
              <span
                className='mock-block'
              >
                <Button
                  // onClick={showModal}
                  onClick={() => navigate('/attendance/create-today')}
                  type='primary'
                  icon={<PlusOutlined />}
                  size={size}
                >
                  Điểm danh hôm nay
                </Button>
              </span>
            </Space>
          </div>
          {/* <div style={{ position: 'relative', padding: '1rem 0px'}}>
            <Space>
              <h4>Từ ngày</h4>
              <DatePicker
              onChange={handleDateChange}
              format="YYYY-MM-DD"
              defaultValue={dayjs()}
              placeholder="Chọn ngày"
            />
            </Space>
            <Space style={{marginLeft:10}}>
              <h4>Đến ngày</h4>
              <DatePicker onChange={handleDateChange}
              format="YYYY-MM-DD"
              defaultValue={dayjs()}
              placeholder="Chọn ngày"/>
            </Space>
          </div> */}
          <DataTable bordered={false} columns={columns} dataSource={dataSource} />
        </>
      ) : (
        <>
          <Row gutter={16} justify="space-between">
            <Col span={8}>
              <Card style={{width: '100%'}} bordered={false}>
                Tổng số đơn xin nghỉ phép
                <p className='summary'>{cntTotal}</p>
              </Card>
            </Col>
            <Col span={8}>
              <Card bordered={false}>
                Tổng số đơn chưa duyệt
                <p className='summary'>{cntTotalPending}</p>
              </Card>
            </Col>
            <Col span={8}>
              <Card bordered={false}>
                Tổng số đơn đã duyệt
                <p className='summary'>{cntTotalAccept}</p>
              </Card>
            </Col>
            {/* <Col span={6}>
              <Card bordered={false}>
                Tổng số đơn từ chối
                <p className='summary'>{cntTotalAccept}</p>
              </Card>
            </Col> */}
          </Row>
          <br />
          <Card className='col-2' bordered={false}>
            <div style={{ position: 'relative', paddingBottom: '1rem'}}>
              <Space>
                <Select
                  size={size}
                  defaultValue='PENDING'
                  style={{ width: 130 }}
                  onChange={handleChange}
                  options={[
                    { value: 'ALL', label: 'Tất cả' },
                    { value: 'PENDING', label: 'Chưa duyệt' },
                    { value: 'ACCEPT', label: 'Đã duyệt' },
                    { value: 'DRAFT', label: 'Từ chối' },
                  ]}
                />
              </Space>
              {/* <div style={{marginLeft: '10px'}}></div> */}
              <InputDatePicker style={{ marginLeft: '10px'}} size='middle' />
            </div>
            <Table
              columns={columnsDonXinNghi}
              dataSource={dataDonXinNghi}
              bordered
              pagination={false}
            />
          </Card>


        </>
      )}
      <DrawerStyled>

      </DrawerStyled>
    </AttendanceCheckPageStyled>
  );
};

export default AttendanceCheckPage;

const AttendanceCheckPageStyled = styled.div`
  .radio-tab {
    width: 100%;
    display: flex;
    margin-bottom: 1rem;
    justify-content: center;
    label {
      width: 150px;
      text-align: center;
    }
  }
  .summary {
    font-weight: bold;
    font-size: 2rem;
  }
`;