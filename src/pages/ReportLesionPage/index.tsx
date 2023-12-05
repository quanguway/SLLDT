import { styled } from 'styled-components';
import DataTable from '../../component/molecule/DataTable';
import ButtonPrimary from '../../component/atom/Button/ButtonPrimary';
import FormLayout, { ActionFormStyled } from '../../component/organism/FormLayout';
import { useEffect, useState } from 'react';
import { ColumnsType } from 'antd/es/table';
import ActionTable from '../../component/molecule/DataTable/ActionTables';
import { CalendarOutlined, DeleteOutlined, EditOutlined, LeftOutlined, RightOutlined } from '@ant-design/icons';
import dayjs from 'dayjs';
import { Button, Checkbox, DatePicker, Form, Modal, Space, Tag, Tooltip, message } from 'antd';
import InputText from '../../component/atom/Input/InputText';
import ButtonOutline from '../../component/atom/Button/ButtonOutline';
import { useForm } from 'antd/es/form/Form';
import lesionSelectors from './services/selectors';
import { AxiosResponse } from 'axios';
import apisLesion from './services/apis';
import storage from '../../utils/sessionStorage';
import { ReportLesion } from './services/types/reportLession';
import moment, { Moment } from 'moment';
import advancedFormat from 'dayjs/plugin/advancedFormat';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import localeData from 'dayjs/plugin/localeData';
import weekday from 'dayjs/plugin/weekday';
import weekOfYear from 'dayjs/plugin/weekOfYear';
import weekYear from 'dayjs/plugin/weekYear';

import ButtonImport from './widgets/ButtonImport';
import { socket } from '../../utils/socket';
import 'react-quill/dist/quill.snow.css';
import InputTextEditor from '../../component/atom/Input/InputTextEditor';
import { useAppDispatch } from '../../store/hooks';
import lesionActions from './services/actions';
import RowH from '../../component/atom/Row/RowH';
import { getTimeToString } from '../../utils/unit';
import ButtonExport from './widgets/ButtonExport';
import TimePickerAutoChange from '../../component/atom/Input/TimePickerAutoChange';
import uiActions from '../../services/UI/actions';
import FormBlock from '../../component/organism/FormLayout/FormBlock';



dayjs.extend(customParseFormat);
dayjs.extend(advancedFormat);
dayjs.extend(weekday);
dayjs.extend(localeData);
dayjs.extend(weekOfYear);
dayjs.extend(weekYear);


const ReportLesionPage = () => {

  const isAccepted = (item: ReportLesion) => {    
    if(!item) return false;

    return item.Status__c === 'Accepted';
  };

  const columns: ColumnsType<ReportLesion>= [
    {
      title: 'Tiêu đề',
      dataIndex: 'Title__c',
      key: 'Title__c',
    },
    {
      title: 'Ngày gửi',
      dataIndex: 'SentDay__c',
      key: 'SentDay__c',
      render: (value) => (dayjs(value).format('DD/MM/YYYY'))
    },{
      title: 'Thời gian gửi',
      render: (item: ReportLesion) => getTimeToString(item.SendTime__c, item.SendMinute__c)
    },
    {
      title: 'Trạng thái',
      dataIndex: 'Status__c',
      key: 'Status__c',
      render: (value) => {
        switch(value) {
          case 'Accepted':
            return <Tag color='green'>Đã gửi</Tag>;
          case 'Draft':
            return <Tag color='red'>Lưu nháp</Tag>;
          case 'Pending':
            return <Tag color='blue'>Đang gửi</Tag>;
          default:
            return <Tag color='blue'>Đang gửi</Tag>;
        }
      }
    },
    {
      title: 'Hành động',
      align: 'right',
      render: (item) => 
     (<ActionTable  actions={[
          {
            handle: () => {setFormData(item); setOpen(true);},
            icon: <EditOutlined />,
            label: 'Chỉnh sửa',
            color: '#faad14'
          },
          {
            handle: async () => {
              await apisLesion.deleteLesion({id: item.Id});              
              dispatch(lesionActions.getListLesion.fetch());
            },
            icon: <DeleteOutlined />,
            label: 'Xoá',
            color: '#f5222d'
          }
        ]}/>)
    }
  ];


  const classId = storage.get('class_id');
  const [content, setContent] = useState<any>();
  const [errContent, setErrContent] = useState<string>();
  const dataReportLesion = lesionSelectors.getLesionList();
  const [data, setData] = useState<ReportLesion[]>([]);
  const [isDraff, setIsDraff] = useState<boolean>(false);
  const [open, setOpen] = useState<boolean>(false);
  const [timeActive, setTimeActive] = useState<boolean>(false);
  const [form] = useForm();
  const [formData, setFormData] = useState<any>();
  const dispatch = useAppDispatch();

  const getWeekDate = (date: Moment) => {
    return [date.clone().startOf('isoWeek'), date.clone().endOf('isoWeek')];
  };
  const [date, setDate] = useState<Moment[]>(getWeekDate(moment()));

  useEffect(() => {
    dispatch(lesionActions.getListLesion.fetch());
  }, []);


  useEffect(() => {
    setData(dataReportLesion.filter(o => moment(o.SentDay__c).isSameOrAfter(date[0]) && moment(o.SentDay__c).isSameOrBefore(date[1])));
  },[dataReportLesion]);

  const handleClose = () => {
    setOpen(false);
    setFormData(undefined);
  };

  useEffect(() => {
    if(!formData) return;    

    form.setFieldsValue({
      title: formData.Title__c,
      sentDay: dayjs(formData.SentDay__c),
      time: dayjs().set('hour', formData.SendTime__c ?? 16).set('minute', formData.SendMinute__c),
      isAutoSent: formData.IsAutoSent__c,
      lessionID: formData.Id,
      status: formData.Status__c,
      content: formData.Content__c
    });
    setContent(formData.Content__c);
    setTimeActive(formData.IsAutoSent__c);
  },[formData]);

  useEffect(() => {    
    const dataSource = dataReportLesion.filter(o => moment(o.SentDay__c).isSameOrAfter(date[0]) && moment(o.SentDay__c).isSameOrBefore(date[1]));
    setData(dataSource);
  },[date]);

  const submit = async (values: any) => {  
    
    if(content === '') {
      setErrContent('Nội dung không được đề trống');
      return;
    }
    let hasError = false;  
    try {
      await dispatch(uiActions.setLoadingPage(true));
      const rest: AxiosResponse = await apisLesion.saveLesion([{
        ...values,
        lessonID: formData ? formData.Id : undefined,
        sentDay: values.sentDay.format('YYYY-MM-DD'),
        sendTime: dayjs(values.time).get('hour'),
        sendMinute: dayjs(values.time).get('minute'),
        isAutoSent: !!values.isAutoSent,
        classID: classId,
        status: isDraff ? 'Draft' : undefined,
        time: undefined,
        content: content
      }]);      
      
      const data = rest.data.data;

      if(data) {
        if(data[0].Status__c === 'Accepted'){
          socket.emit('add-lesson-complete', {classId, lessonId: data[0].Id, dataLesson: data[0]});
        }
        setOpen(false);
        await dispatch(lesionActions.getListLesion.fetch());
      }
    } catch (error: any) {
      hasError = true;
    } finally {
      form.resetFields();
      handleClose();
      setIsDraff(false);
      await dispatch(uiActions.setLoadingPage(false));
      hasError ? message.error('Đã có lỗi xảy ra, vui lòng thử lại') : message.success('Lưu bài thành công');
    }
      
  };  

  const datePickerChange = (value: any) => {
    setDate(getWeekDate(moment(value?.format())));
  };

  return (
    <ReportLesionPageStyled>
      <div className='table-container'>

        <div className='filter'>
          <ButtonExport />
          <ButtonImport />
          <ButtonPrimary onClick={() => {
            form.resetFields();
            setContent('');
            setErrContent('');
            setTimeActive(false);
            setOpen(true);
            }} label='Thêm báo bài'/>
        </div>
        {/* <div style={{height: '12px'}}></div> */}


        <RowH className='date-picker-range'>
          <Tooltip title="Tuần trước">
            <Button icon={<LeftOutlined />} size='large' type='default' shape='circle' onClick={() => setDate(getWeekDate(date[0].subtract(7, 'day')))}></Button>
          </Tooltip>
          <Space.Compact block style={{width: 'auto'}}>
            <DatePicker suffixIcon={<></>} onChange={datePickerChange} value={dayjs(date[0].format())} format='DD-MM-YYYY' defaultValue={dayjs()} picker='week' style={{backgroundColor: 'white'}} />
            <Tooltip title="Tuần hiện tại">
              <Button icon={<CalendarOutlined />} onClick={() => setDate(getWeekDate(moment()))} size='large' type='default'></Button>
            </Tooltip>
            
          </Space.Compact>
          <Tooltip title="Tuần sau">
            <Button icon={<RightOutlined />} size='large' type='default' shape='circle' onClick={() => setDate(getWeekDate(date[1].add(7, 'day')))}></Button>
          </Tooltip>
        </RowH>

        <DataTable size='large' bordered={false} columns={columns} dataSource={data}/>

      </div>


      {open && <ModalStyled footer={null}
        onCancel={handleClose}
        forceRender 
        open={open} 
        title={'Báo bài'}>
          <FormLayout form={form} renderButton={() => <></>} 
        onSubmit={submit}>
            <FormBlock label='Điều chỉnh thời gian'>

              <Form.Item rules={[
                {required: true, message: 'Ngày gửi không được đề trống'}
              ]} label='Ngày gửi' name='sentDay'>
                <DatePicker disabledDate={(d) => {
                  return (!d || d.isBefore(dayjs().subtract(1, 'day')));
                }} onChange={(d) => {
                  form.setFieldValue('title', `Báo bài ngày ${d?.format('DD/MM/YYYY')}`);
                }} disabled={isAccepted(formData)} size='large' style={{width: '100%'}} placeholder='Chọn ngày gửi'/>
              </Form.Item>

              <Form.Item valuePropName='checked' name={'isAutoSent'}>
                <Checkbox disabled={isAccepted(formData)} onChange={(e: any) => setTimeActive(e.target.checked)} style={{fontWeight: 600}}>{'Tự động gửi'}</Checkbox>
              </Form.Item>

              {timeActive && <p style={{ color: 'gray', fontSize: '14px', marginTop: '-28px' }}><i>* Báo bài sẽ được gửi tự động đến phụ huynh *</i></p>}
              
              {timeActive ? <Form.Item rules={[
                {required: true, message: 'Thời gian gửi không được đề trống'}
              ]} label='Thời gian gửi' name='time'>
                <TimePickerAutoChange 
                  disabled={isAccepted(formData)}
                  format={'HH:mm'} size='large' 
                  style={{width: '100%'}} 
                  placeholder='Chọn thời gian'
                  defaultValue={dayjs().set('minute',0).set('hour', 16)}
                />
              </Form.Item> : <></> }
            </FormBlock>
            

            <FormBlock label='Điều chỉnh nội dung'>

              <InputText disabled={isAccepted(formData)} rules={[
                {required: true, message: 'Tiêu đề không được đề trống'}
              ]} label={'Tiêu đề'} name={'title'}/>

              
              <InputTextEditor 
                  value={content} 
                  onChange={setContent} />

              {errContent && <p style={{color: 'red'}}>* Nội dung không được để trống</p>}
                
            </FormBlock>

            <ActionFormStyled justify={'center'} style={{marginTop: '16px'}} >
              {!isAccepted(formData) && <ButtonOutline onClick={() => {setIsDraff(true); form.submit();}} label='Lưu Nháp'/>}
              <ButtonPrimary htmlType='submit' label={timeActive ? 'Lưu' : 'Gửi'}/>
            </ActionFormStyled>
        </FormLayout>
      </ModalStyled>}
    </ReportLesionPageStyled>
  );
};
export default ReportLesionPage;

const ReportLesionPageStyled = styled.div`

  .filter {
    display: flex;
    justify-content: end;
    gap: 8px;
    border-bottom: 1px solid #F1F1F1;
    padding: 8px;
  }

  .table-container {
    background-color: white;
    padding: 0px 16px;
    .date-picker-range {
      height: auto;
      display: flex;
      justify-content: center;
      gap: 16px;
      padding: 8px 16px;
      border-radius: 8px;
      margin: 12px 0px;
    }
  }
`;

const ModalStyled =styled(Modal)`
  .editorEditor {
    border: 1px solid #F1F1F1;
    border-radius: '2px';
    margin-top: 12px;
    max-height: 160px;
  }

  .ant-modal-title {
    font-size: 24px;
    text-align: center;
  }
  
`;