import fetch from '../../../services/request';
import storage from '../../../utils/sessionStorage';
import { configTimeout } from '../../../utils/unit';

const getListLessonParent = () => {
  const ClassID = storage.get('class_id');
  return fetch({
    method: 'post',
    url: 'lesson/get-week',
    body: {ClassID},
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
