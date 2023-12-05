import fetch from '../../../services/request';
import { IApiLoginBody } from './types/auth';

export const login = (body: IApiLoginBody) => {  
  return fetch({
    method: 'post',
    url: '/login',
    body,
  });
};

// api here
const apisAuth = {
  login,
};

export default apisAuth;
