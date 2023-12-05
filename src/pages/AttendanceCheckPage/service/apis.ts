import fetch from '../../../services/request';
import storage from '../../../utils/sessionStorage';
import { configTimeout } from '../../../utils/unit';

interface IBodyAttendance {
  ClassHeader__c: string;
  Date__c: string;
  Status__c: string;
  Student: Student[];
}

interface Student {
  HocSinh__c: string;
  Status__c: string;
  note__c: string;
}

const getListLetter = () => {
  const class_id = storage.get('class_id');
  return fetch({
    method: 'get',
    url: `letter/${class_id}`,
    configs: {
      ...configTimeout
    }
  }).catch(() => {
    getListLetter();
  });
};
const updateLetter = (body : any) => {
  return fetch({
    method: 'post',
    url: 'letter/save',
    body,
    configs: {
      ...configTimeout
    }
  }).catch(() => {
    updateLetter(body);
  });
};

const getListAttendance = () => {
  const class_id = storage.get('class_id');
  return fetch({
    method: 'get',
    url: `/attendanceDay/classId/${class_id}`,
    configs: {
      ...configTimeout
    }
  }).catch(() => {
    getListAttendance();
  });
};

const saveAttendanceDay = (body: IBodyAttendance) => {
  return fetch({
    method: 'post',
    url: '/attendanceDay/save',
    body: body as any,
  });
};
// api here
const apisLetterTeacher= {
  getListLetter, 
  updateLetter,
  getListAttendance,
  saveAttendanceDay
};

export default apisLetterTeacher;
