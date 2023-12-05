import fetch from '../../../services/request';
import storage from '../../../utils/sessionStorage';
import { configTimeout } from '../../../utils/unit';

const getTimeTable = (params: {
  day?: 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday' | 'Saturday' | 'Sunday'
  date?: string // YYYY-MM-DD
}) => {

  const class_id = storage.get('class_id');
 try{

   return fetch({
    method: 'get',
    url: 'schedule',
    params: {
      ...params,
      idClass: class_id
    } as any,
    configs:{
      ...configTimeout
    }
  }).catch(() => {
    getTimeTable(params);    
  });

 } catch(err) {
    getTimeTable(params);
 }
};

const saveTimeTable = (body: any) => {
  return fetch({
    method: 'post',
    url: '/schedule/save',
    body: body,
  });
};




const apisTimetable = {
  getTimeTable,
  saveTimeTable
};

export default apisTimetable;
