import { styled } from 'styled-components';
import AvatarSidebar from '../../component/molecule/AvatarSidebar';
import FormLayout from '../../component/organism/FormLayout';
import { Card, Form, Input } from 'antd';
import { COLOR_PRIMARY } from '../../utils/variables/colors';
import FormBlock from '../../component/organism/FormLayout/FormBlock';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
// import { useDispatch } from 'react-redux';
import studentActions from '../StudentPage/services/actions';
import StudentSelectors from '../StudentPage/services/selectors';
import { getGender } from '../../utils/unit';
import { useAppDispatch } from '../../store/hooks';

const ProfilePage = () => {

  const {id} = useParams();
  const dispatch = useAppDispatch();
  // const id = searchParams.get('id'); 

  useEffect(() => {
    dispatch(studentActions.getDetailStudent.fetch(id ?? ''));
  },[id]);

  const studentDetail = StudentSelectors.getStudentDetail();

  return (
   <ProfilePageStyled>
      <Card className='profile-avatar'>
        <AvatarSidebar collapsed={false} name={studentDetail?.Name} />

        {/* <h3>About</h3> */}
        {/* <p>Là một giáo viên có kiến thức chuyên môn vững vàng mà còn là một người mang trong mình niềm đam mê mãnh liệt với việc dạy và hướng dẫn học sinh.</p> */}
      </Card>
      <Card className='profile-content'>
        <FormLayout<any>
          onSubmit={(values) => console.log(values)}>

              <FormBlock label='Thông tin cơ bản'>
                <Form.Item 
                  label={'Mã Học sinh'}
                  rules={[
                    {required: true}]}>

                  <Input
                    size='large'
                    defaultValue={studentDetail?.Ma_Hoc_Sinh__c}
                    value={studentDetail?.Ma_Hoc_Sinh__c}
                    name={'full_name'} 
                    disabled
                    />
                </Form.Item>
                <Form.Item 
                  label={'Tên đầy đủ'}
                  rules={[
                    {required: true}]}>

                  <Input
                    size='large'
                    defaultValue={studentDetail?.Name}
                    value={studentDetail?.Name}
                    name={'full_name'} 
                    disabled
                    />
                  </Form.Item>
                  <Form.Item 
                  label={'Giới tính'}
                  rules={[
                    {required: true}]}>

                  <Input
                    size='large'
                    defaultValue={getGender(studentDetail?.GioiTinh__c)}
                    value={getGender(studentDetail?.GioiTinh__c)}
                    name={'full_name'} 
                    disabled
                    />
                  </Form.Item>
      
              </FormBlock>

              <FormBlock label='Thông tin chi tiết'>
                <Form.Item 
                  label={'Địa chỉ'}
                  rules={[
                    {required: true}]}>

                  <Input
                    size='large'
                    defaultValue={studentDetail?.Address__c}
                    value={studentDetail?.Address__c}
                    disabled
                    />
                </Form.Item>
                <Form.Item 
                  label={'Dân tộc'}
                  rules={[
                    {required: true}]}>

                  <Input
                    size='large'
                    defaultValue={studentDetail?.DanToc__c}
                    value={studentDetail?.DanToc__c}
                    disabled
                    />
                </Form.Item>
                <Form.Item 
                  label={'Ngày vào trường'}
                  rules={[
                    {required: true}]}>

                  <Input
                    size='large'
                    defaultValue={studentDetail?.NgayVaoTruong__c}
                    value={studentDetail?.NgayVaoTruong__c}
                    disabled
                    />
                </Form.Item>
              </FormBlock>
              {/* <InputDatePicker/>
              <InputCurrency/>
              <InputSelectRange/> */}
        </FormLayout>
      </Card>
   </ProfilePageStyled>
  );
};

export default ProfilePage;

const ProfilePageStyled = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  gap: 50px;
  .profile-avatar {
    width: 30%;

    h3 {
      color: ${COLOR_PRIMARY};
    }
  }
  .profile-content {
    width: 50%;
  }
`;