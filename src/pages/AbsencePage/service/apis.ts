import fetch from '../../../services/request';
import storage from '../../../utils/sessionStorage';
import { TAbsenceBody } from './types/absence';

const getAbsenceParent = () => {
  const studentId = storage.get('student_id');

  return fetch({
    method: 'get',
    url: `/letter/hocsinh/${studentId}`,
  });
};

const saveAbsenceParent = (body: TAbsenceBody) => {
  return fetch({
    method: 'post',
    url: '/letter/save',
    body: body as any
  });
};


const Absenedelete = (id: string) => {
  return fetch({
    method: 'post',
    url: '/letter/delete',
    body: {
      id
    }
  });
};
// api here
const apisAbsence = {
  getAbsenceParent,
  saveAbsenceParent,
  Absenedelete
};

export default apisAbsence;
