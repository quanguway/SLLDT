import fetch from '../../../../services/request';
import { configTimeout } from '../../../../utils/unit';

const saveStudent = (body : any) => {
  return fetch({
    method: 'post',
    url: 'student/save',
    body,
  });
};
// api here
const apisStudentAdmin = {
  saveStudent
};

export default apisStudentAdmin ;
