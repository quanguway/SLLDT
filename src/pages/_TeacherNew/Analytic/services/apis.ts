import fetch from '../../../../services/request';
import storage from '../../../../utils/sessionStorage';
import { configTimeout } from '../../../../utils/unit';

const getAnalytic = (body: {eva_class_id: string, eva_type: string}) => {
  const classId = storage.get('class_id');
  return fetch({
    method: 'post',
    url: '/thongke/score',
    body: {
      ...body,
      eva_class_id: body.eva_class_id ?? classId,
    },
    configs: {
      ...configTimeout
    }
  }).catch(() => {
    getAnalytic(body);
  });
};

const apisAnalytic = {
  getAnalytic
};

export default apisAnalytic;