import fetch from '../../../services/request';
import storage from '../../../utils/sessionStorage';
import { configTimeout } from '../../../utils/unit';

const getListLesion = (isParent: boolean) => {

  const class_id = storage.get('class_id');

  return fetch({
    method: 'get',
    url: isParent ? `lesson/parent/${class_id}` : `lesson/${class_id}`,
    configs: {
      ...configTimeout
    }
    // params: { ...params, per_page: 100 },
  }).catch(() => {
    getListLesion(isParent);
  });
};

const saveLesion = (body: any) => {
  return fetch({
    method: 'post',
    url: 'lesson/save',
    body
  });
};

const deleteLesion = (body: any) => {
  return fetch({
    method: 'post',
    url: 'lesson/delete',
    body
  });
};

// const getDetailStudent = (id: string) => {
//   return fetch({
//     method: 'get',
//     url: `student/${id}`
//     // params: { ...params, per_page: 100 },
//   });
// };

// const getListCustomersPaginate = (params?: any) => {
//   return fetch({
//     method: 'get',
//     url: 'api/v1/merchants/:merchant_code/customers',
//     params: { ...params },
//   });
// };


const apisLesion = {
  getListLesion,
  deleteLesion,
  saveLesion
};

export default apisLesion;
