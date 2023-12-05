import fetch from '../../../../services/request';
import { configTimeout } from '../../../../utils/unit';

const getListParent = () => {
  return fetch({
    method: 'get',
    url: 'parent',
    configs: {
      ...configTimeout
    }
  }).catch(() => {
    getListParent();
  });
};
const saveParent = (body : any) => {
  return fetch({
    method: 'post',
    url: 'parent/save',
    body,
    configs: {
      ...configTimeout
    }
  }).catch(() => {
    saveParent(body);
  });
};
// api here
const apisParent= {
  getListParent, 
  saveParent
};

export default apisParent;
