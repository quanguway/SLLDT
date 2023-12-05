import {
  Button,
  Card,
  Col,
  Form,
  Input,
  Modal,
  Row,
  Select,
  Space,
  Tag,
} from 'antd';
import { styled } from 'styled-components';
import Table, { ColumnsType } from 'antd/es/table';
import {  PlusOutlined } from '@ant-design/icons';
import { useEffect, useState } from 'react';
import { SizeType } from 'antd/es/config-provider/SizeContext';
import { Option } from 'antd/es/mentions';
import { ActionFormStyled } from '../../component/organism/FormLayout';
import ButtonOutline from '../../component/atom/Button/ButtonOutline';
import ButtonPrimary from '../../component/atom/Button/ButtonPrimary';
import { useDispatch } from 'react-redux';
import studentActions from '../StudentPage/services/actions';
interface DataType {
  key: string;
  startDay: string;
  endDay: string;
  dayOff: number;
  timeOff: string;
  headerOff: number;
  content: string;
  status: React.ReactNode;
}
const columns: ColumnsType<DataType> = [
  {
    title: 'Từ ngày',
    dataIndex: 'startDay',
    fixed: true,
    width: 120,
  },
  {
    title: 'Đến ngày',
    dataIndex: 'endDay',
    fixed: true,
    width: 100,
  },
  {
    title: 'Số ngày nghỉ',
    dataIndex: 'dayOff',
    fixed: true,
    width: 100,
  },
  {
    title: 'Số giờ nghỉ',
    rowSpan: 4,
    dataIndex: 'timeOff',
    fixed: true,
    width: 300,
  },
  {
    title: 'Loại nghỉ',
    rowSpan: 4,
    dataIndex: 'headerOff',
    fixed: true,
    width: 300,
  },
  {
    title: 'Lý do nghỉ',
    rowSpan: 4,
    dataIndex: 'content',
    fixed: true,
    width: 300,
  },
  {
    title: 'Trạng thái',
    rowSpan: 4,
    dataIndex: 'status',
    fixed: true,
    width: 300,
  },
];

const data: DataType[] = [
  {
    key: '1',
    startDay: '10/10/2023',
    endDay: '',
    dayOff: 32,
    timeOff: '',
    headerOff: 0,
    content: '',
    status: <Tag color='blue'>Đã duyệt</Tag>,
  },
  {
    key: '2',
    startDay: '10/10/2023',
    endDay: '',
    timeOff: '',
    headerOff: 0,
    dayOff: 42,
    content: '',
    status: <Tag color='blue'>Đã duyệt</Tag>,
  },
  {
    key: '3',
    startDay: '10/10/2023',
    endDay: '',
    dayOff: 32,
    timeOff: '0',
    headerOff: 0,
    content: '',
    status: <Tag color='blue'>Đã duyệt</Tag>,
  },
  {
    key: '4',
    startDay: '10/10/2023',
    endDay: '',
    dayOff: 0,
    timeOff: '',
    headerOff: 0,
    content: '',
    status: <Tag color='blue'>Đã duyệt</Tag>,
  },
  {
    key: '5',
    startDay: '10/10/2023',
    endDay: '',
    dayOff: 0,
    timeOff: '',
    headerOff: 0,
    content: '',
    status: <Tag color='blue'>Đã duyệt</Tag>,
  },
  {
    key: '5',
    startDay: '10/10/2023',
    endDay: '',
    dayOff: 0,
    timeOff: '',
    headerOff: 0,
    content: '',
    status: <Tag color='blue'>Đã duyệt</Tag>,
  },
  {
    key: '5',
    startDay: '10/10/2023',
    endDay: '',
    dayOff: 0,
    timeOff: '0',
    headerOff: 0,
    content: '',
    status: <Tag color='blue'>Đã duyệt</Tag>,
  },
  {
    key: '5',
    startDay: '10/10/2023',
    endDay: '',
    dayOff: 0,
    timeOff: '0',
    headerOff: 0,
    content: '',
    status: <Tag color='blue'>Đã duyệt</Tag>,
  },
  {
    key: '5',
    startDay: '10/10/2023',
    endDay: '',
    dayOff: 0,
    timeOff: '0',
    headerOff: 0,
    content: '',
    status: <Tag color='blue'>Đã duyệt</Tag>,
  },
  {
    key: '5',
    startDay: '10/10/2023',
    endDay: '',
    dayOff: 0,
    timeOff: '0',
    headerOff: 0,
    content: '',
    status: <Tag color='blue'>Đã duyệt</Tag>,
  },
];

const AttendancePage = () => {
  const [size] = useState<SizeType>('middle');
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  // const studentList = StudentSelectors.getStudentList();


  const handleChange = () => {
    // console.log(`selected ${value}`);
  };
  const showModal = () => {
    setOpen(true);
  };

  useEffect(() => {
    dispatch(studentActions.getListStudent.fetch());
  }, []);


  return (
    <AttendancePageStyled>
      <div style={{ position: 'relative' }}>
        <Space>
          <h2>Đơn xin nghỉ</h2>

          <span
            className='mock-block'
            style={{ position: 'absolute', top: 10, right: 0 }}
          >
            <Select
              size={size}
              defaultValue='2023'
              style={{ width: 90 }}
              onChange={handleChange}
              options={[
                { value: '2023', label: '2023' },
                { value: '2024', label: '2024' },
                { value: '2025', label: '2025' },
                { value: '2026', label: '2026' },
              ]}
            />

            <Button
              onClick={showModal}
              type='primary'
              icon={<PlusOutlined />}
              size={size}
              style={{ marginLeft: 10 }}
            >
              Thêm
            </Button>
          </span>
        </Space>
      </div>

      <Row gutter={16}>
        <Col span={8}>
          <Card title='Tổng số đơn nghỉ' bordered={false}>
            10
          </Card>
        </Col>
        <Col span={8}>
          <Card title='Tổng số ngày đã nghỉ' bordered={false}>
            5
          </Card>
        </Col>
        <Col span={8}>
          <Card title='Tổng số đơn chưa duyệt' bordered={false}>
            5
          </Card>
        </Col>
      </Row>
      <br />
      <Card className='col-2' bordered={false}>
        <Table
          columns={columns}
          dataSource={data}
          bordered
          pagination={false}
        />
      </Card>
      <Modal
        title='Thêm đơn xin nghỉ'
        centered
        footer={false}
        open={open}
        onOk={() => setOpen(false)}
        onCancel={() => setOpen(false)}
        width={1000}
      >
        <h4>Thông tin chung</h4>
        <Form
          name='basic'
          initialValues={{ remember: true }}
          // onFinish={onFinish}
          autoComplete='off'
        >
          <Row gutter={200}>
            <Col span={100}>
              <Form.Item label='Từ ngày'>
                <Space.Compact>
                  <Form.Item
                    name={'startDay'}
                    noStyle
                    rules={[
                      { required: true, message: 'Province is required' },
                    ]}
                  >
                    <Input style={{marginLeft:29}} type='date'/>

                    <Input
                      style={{ marginLeft: 10 }}
                      type='time'
                      placeholder='Input street'
                    />
                  </Form.Item>
                </Space.Compact>
              </Form.Item>
              <Form.Item label='Đến ngày'>
                <Space.Compact>
                  <Form.Item
                    name={'endDay'}
                    noStyle
                  >
                    <Input style={{marginLeft:23}} type='date' />

                    <Input
                      style={{ marginLeft: 10 }}
                      type='time'
                      placeholder='Input street'
                    />
                  </Form.Item>
                </Space.Compact>
              </Form.Item>
              <Form.Item label='Số ngày nghỉ'>
                <Form.Item
                  name={'numberDayOff'}
                  noStyle
                >
                  <Input type='number'  />
                </Form.Item>
              </Form.Item>
              <Form.Item label='Loại nghỉ'>
                <Form.Item
                  name={'headerOff'}
                  noStyle
                >
                  
                  <Select defaultValue="Option 1" style={{marginLeft:25,width:270}}>
                   <Option value="Option 1">Option 1</Option>
                   <Option value="Option 2">Option 2</Option>
                   <Option value="Option 3">Option 3</Option>
                   <Option value="Option 4">Option 4</Option>
                   </Select>
                </Form.Item>
              </Form.Item>
            </Col>
            <Col span={120}>
              <Form.Item label='Lý do nghỉ'>
                <Form.Item
                  name={'content'}
                  noStyle
                >
                  <Input style={{marginLeft:22,width:270}} type='text' />
                </Form.Item>
              </Form.Item>
              <Form.Item label='Người duyệt'>
                <Form.Item
                  name={'man'}
                  noStyle
                >
                  <Input style={{marginLeft:10,width:270}} type='text' />
                </Form.Item>
              </Form.Item>
              <Form.Item label='Ghi chú'>
                <Form.Item
                  name={'note'}
                  noStyle 
                >
                  <Input.TextArea rows={1} style={{marginLeft:37,width:270}}/>
                </Form.Item>
              </Form.Item>
              
            </Col>
          </Row>

          <ActionFormStyled justify={'center'} >
              <ButtonOutline style={{color:'gray'}} label='Hủy'onClick={()=>{setOpen(false);}}/>
              <ButtonOutline style={{marginRight:10}}  label='Lưu Nháp'/>
              <ButtonPrimary htmlType='submit' label={'Lưu'}/>
            </ActionFormStyled>
        </Form>
      </Modal>
    </AttendancePageStyled>
  );
};

export default AttendancePage;
const AttendancePageStyled = styled.div``;
