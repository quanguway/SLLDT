import { Card, DatePicker, Form, Input } from 'antd';
import { styled } from 'styled-components';
import FormLayout, { ActionFormStyled } from '../../../../component/organism/FormLayout';
import FormBlock from '../../../../component/organism/FormLayout/FormBlock';
import { useForm } from 'antd/es/form/Form';
import {  useState } from 'react';
import dayjs, { Dayjs } from 'dayjs';
import {  getDatesBetween } from '../../../../utils/unit';
import { useAppDispatch } from '../../../../store/hooks';
import uiActions from '../../../../services/UI/actions';
import apisAbsence from '../../service/apis';
import storage from '../../../../utils/sessionStorage';
import moment from 'moment';
import ButtonPrimary from '../../../../component/atom/Button/ButtonPrimary';
import absenceAction from '../../service/actions';

const { RangePicker } = DatePicker;

const { TextArea } = Input;

const LeaveOfAbsence = () => {

  const [form] = useForm();
  const [, setListLesion] = useState<Dayjs[]>([]);
  const dispatch = useAppDispatch();

  // useEffect(() => {    
  //   setListLesion();
  // },[form.getFieldValue('time_absence')]);
  
  const handleRangPicker = (values: any) => {
    if(!values?.[0] || !values?.[1]) return;
    setListLesion(getDatesBetween(values[0], values[1]));
  };

  const handleSubmit = async (values: {time_absence: Dayjs[], reason: string}) => {
    dispatch(uiActions.setLoadingPage(true));
    await apisAbsence.saveAbsenceParent({
      ClassHeader__c: storage.get('class_id') ?? '',
      HocSinh__c: storage.get('student_id') ?? '',
      LyDo__c: values.reason,
      NgayNghi__c: values.time_absence[0].format('YYYY-MM-DD'),
      NgayNop__c: moment().format('YYYY-MM-DD'),
      SoNgayNghi__c: values.time_absence[1].diff(values.time_absence[0], 'day'),
      TrangThai__c: 'PENDING'

    });
    dispatch(absenceAction.getAbsenceParent.fetch());

    dispatch(uiActions.setLoadingPage(false));
    form.resetFields();

  };

  return (
    <LeaveOfAbsenceStyled>
      {/* <Card style={{width: '30%'}} className='profile-avatar'>
        <AvatarSidebar collapsed={false} />
        <h3>About</h3>
        <p>Là một giáo viên có kiến thức chuyên môn vững vàng mà còn là một người mang trong mình niềm đam mê mãnh liệt với việc dạy và hướng dẫn học sinh.</p>
      </Card> */}
      <Card title='Đơn xin nghỉ phép' style={{width: '100%', justifyContent:'center'}}>
        <FormLayout<any> 
          layout='horizontal'
          form={form}
          renderButton={<ActionFormStyled justify={'center'} >
          <ButtonPrimary htmlType='submit' label='Xin nghỉ'/>
        </ActionFormStyled>}
          onSubmit={handleSubmit} >
            <FormBlock style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }} label='Thời gian nghỉ: '>
              <Form.Item name={'time_absence'} rules={[
                {required: true}
              ]}>
                <RangePicker 
                    disabledDate={(current) => {
                    const customDate = dayjs().format('YYYY-MM-DD');
                    return current && current < dayjs(customDate, 'YYYY-MM-DD');
                  }} 
                  onChange={handleRangPicker} />
              </Form.Item>
            </FormBlock>
            {/* <FormBlock label='Danh sách buổi học'>
              {listLesion.length > 0 ? <div className='list-lesion'>
                {listLesion.map((o, index) => (
                  <>
                    <Form.Item initialValue={true} name={[index, 'lesion', 0]}>
                      <InputCheckbox key={index} labelCheckbox={`${o.format(DATE_FORMAT)} - Sáng`}/>
                    </Form.Item>
                    <Form.Item initialValue={true} name={[index, 'lesion', 1]}>
                      <InputCheckbox key={index} labelCheckbox={`${o.format(DATE_FORMAT)} - Chiều`}/>
                    </Form.Item> 
                  </>
                ))}
              </div> : <Empty description='Không có buổi học nào được chọn'/>}
            </FormBlock> */}
            <FormBlock label='Lý do xin nghỉ:'>
              <Form.Item  rules={[
                {required: true}
              ]} name={'reason'} >
                <TextArea rows={4} />
              </Form.Item>
            </FormBlock>
        </FormLayout>
      </Card>
    </LeaveOfAbsenceStyled>
  );
};

export default LeaveOfAbsence;

const LeaveOfAbsenceStyled = styled.div`
  display: flex;
  gap: 50px;
  .ant-card-head-title {
    display: flex;
    justify-content: center;
  }

  .list-lesion {
    height: 200px;
    overflow-y: scroll;
    .ant-form-item {
      margin-bottom: 0px;
    }
  }

  .ant-picker-range {
    margin-top: 24px;
  }
`;