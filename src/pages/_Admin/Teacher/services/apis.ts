import fetch from '../../../../services/request';
import { configTimeout } from '../../../../utils/unit';

const getListTeacher = () => {
  return fetch({
    method: 'get',
    url: 'teacher',
    configs: {
      ...configTimeout
    }
  }).catch(() => {
    getListTeacher();
  });
};
const saveTeacher = (body : any) => {
  return fetch({
    method: 'post',
    url: 'teacher/save',
    body,
    configs: {
      ...configTimeout
    }
  }).catch(() => {
    saveTeacher(body);
  });
};
// api here
const apisTeacher= {
  getListTeacher, 
  saveTeacher
};

export default apisTeacher;
