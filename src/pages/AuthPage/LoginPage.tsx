import InputText from '../../component/atom/Input/InputText';
import { styled } from 'styled-components';
import FormLayout from '../../component/organism/FormLayout';
import ButtonPrimary from '../../component/atom/Button/ButtonPrimary';
import InputTextPassword from '../../component/atom/Input/InputPassword';
import authActions from './service/actions';
import { useAppDispatch } from '../../store/hooks';
import { useNavigate } from 'react-router-dom';
import storage from '../../utils/sessionStorage';
import apisAuth from './service/apis';
import { IApiLoginResData } from './service/types/auth';
import uiActions from '../../services/UI/actions';

interface AuthForm {
  phone: string,
  password: string
}

// enum ERole {
//   TEACHER = 'TEACHER',
//   PARENT = 'PARENT'
// }

const LoginPage = () => {

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  
  const onSubmit = async (values: AuthForm) => {

    // parent
    // 0375767857
    // ksvchainamtest

    // teacher
    // 0333007630
    // ksvchainamtest
    
    try {
      await dispatch(uiActions.setLoadingPage(true));
      // const res = await dispatch(authActions.login.fetch({
      //   phone: values.phone ?? '0333007630',
      //   password: values.password ?? 'ksvchainamtest'
      // }));
      // navigate('/student');
      const res = await apisAuth.login({
        phone: values.phone ?? '0375767857',
        password: values.password ?? 'ksvchainamtest'
      });
      if(res.status === 200){
        const resData = res?.data as (IApiLoginResData | null);
        if (!resData) throw 'fail';
        
        storage.set('token', resData?.token);
        storage.set('user_name', resData?.UserName__c);
        storage.set('class_id', resData?.Class?.Id);
        storage.set('class_name', resData?.Class?.Name);   
        storage.set('role', resData.Role.Title__c);
        storage.set('user_id', resData?.Id);
        storage.set('student_id', resData?.Student?.Id);
        storage.set('student_name', resData?.Student?.Name);


        if(resData.Role.Title__c === 'PARENT'){
          navigate('/app/home');
        } else if(resData.Role.Title__c === 'ADMIN') {
          navigate('/class');

        }
        else{
          navigate('/attendance');
        }
        dispatch(authActions.login.success(resData));
      } else {
        console.log('Fail login:  ' + res);
      }
      dispatch(uiActions.setLoadingPage(false));
    } catch(err) {
      dispatch(uiActions.setLoadingPage(false));
      console.log('Fail login:  ' + err);
    }
  };

  // 0375767857(Phụ huynh) - 0333007630(Giáo Viên)
  // ksvchainamtest

  return (
    <LoginPageStyled>
      <h3>Xin chào!</h3>
      <FormLayout<AuthForm>
        onSubmit={onSubmit}
        renderButton={<ButtonLoginStyled htmlType='submit' label='Login'/>}>

        <InputText name='phone' placeholder='Nhập số điện thoại' label={'Số điện thoại'}/>
        <InputTextPassword name='password' placeholder='Nhập mật khẩu' label={'Mật Khẩu'} />

        </FormLayout>
    </LoginPageStyled>
  );
};

export default LoginPage;
const LoginPageStyled = styled.div`
  h3 {
    text-align: center;
    font-size: 38px;
  }
`;

const ButtonLoginStyled = styled(ButtonPrimary)`
  width: 100%;
`;