import fetch from '../../../services/request';
import { configTimeout } from '../../../utils/unit';

const getListClass = (params?: {year: number}) => {

  return fetch({
    method: 'get',
    url: 'class',
    params: params as any,
    configs:{
      ...configTimeout
    }
  }).catch(() => {
    getListClass(params);    
  });
};


const apisClass = {
  getListClass,
};

export default apisClass;
