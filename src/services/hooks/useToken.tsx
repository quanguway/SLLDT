import { useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import storage from '../../utils/sessionStorage';
import authSelectors from '../../pages/AuthPage/service/selectors';
import { useAppDispatch } from '../../store/hooks';
import authActions from '../../pages/AuthPage/service/actions';

type ShieldComponent = ((props: any) => JSX.Element) | React.LazyExoticComponent<() => JSX.Element>;

export const useToken = () => {
  const token = storage.get('token');
  const access_token =  authSelectors.getToken();
  const dispatch = useAppDispatch();


  useEffect(() => { 
      const href = window.location.href;
      const fileNamePart = location?.pathname !== '/' ? href.slice(href.search(location?.pathname)) : '';
      dispatch(authActions.refreshToken({ pathname: fileNamePart }));
      // dispatch(authActions.setToken(token ?? ''));

      // redirect(storage.get('path_name') ?? '');
      

      // delay(() => {
      //   console.log(fileNamePart);
        
      //   redirect(fileNamePart);

      // }, 100);
      storage.set('path_name', fileNamePart);
    // const href = window.location.href;
    
  }, []);

  const shield = (Component: ShieldComponent) => {
    if (!token) return <Navigate to={'/auth/sign-in'} replace />;
    // else if (token) return <Navigate to={storage.get('path_name') ?? ''} replace />;
    return <Component  />;
  };
  return {shield, access_token};
};
