import fetch from '../../../../services/request';
import { IApiNotificationBody } from './types/auth';

export const getAllNotification = (body: IApiNotificationBody) => {  
  return fetch({
    method: 'post',
    url: '/notification',
    body,
  });
};

// api here
const apisNotification = {
  getAllNotification,
};

export default apisNotification;
