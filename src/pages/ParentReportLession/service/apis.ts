import fetch from '../../../services/request';
import storage from '../../../utils/sessionStorage';
import { configTimeout } from '../../../utils/unit';

const getListLessonParent = () => {
  const class_id = storage.get('class_id');
  return fetch({
    method: 'get',
    url: `lesson/${class_id}`,
    configs: {
      ...configTimeout
    }
  }).catch(() => {
    getListLessonParent();
  });
};
// api here
const apisLessonParent= {
  getListLessonParent,
};

export default apisLessonParent;
