
type IKeyStore = 'token' | 'user_name' | 'role' | 'user_code' | 'class_id' | 'class_name' | 'user_id' | 'path_name' | 'student_id' | 'student_name';

const session = {
  set: (keyValue: IKeyStore, value: string) => {
    return sessionStorage.setItem(keyValue, value);
  },

  get: (keyValue: IKeyStore) => {
    return sessionStorage.getItem(keyValue);
  },
};

const local = {
  set: (keyValue: IKeyStore, value: string) => {
    return localStorage.setItem(keyValue, value);
  },

  get: (keyValue: IKeyStore) => {
    return localStorage.getItem(keyValue);
  },
};

const genGetSetKeyLocal = (key: IKeyStore) => ({
  get: () => local.get(key) ?? '',
  set: (value: string) => local.set(key, value),
});

// const genGetSetKeySession = (key: IKeyStore) => ({
//   get: () => session.get(key) ?? '',
//   set: (value: string) => session.set(key, value),
// });

const storage = {
  get: session.get,
  set: session.set,
  token: genGetSetKeyLocal('token'),
  userName: genGetSetKeyLocal('user_name'),
  role: genGetSetKeyLocal('role'),
  userCode: genGetSetKeyLocal('user_code'),
  classId: genGetSetKeyLocal('class_id'),
  className: genGetSetKeyLocal('class_name'),
  userId: genGetSetKeyLocal('user_id'),
  student_id: genGetSetKeyLocal('student_id'),
  student_name: genGetSetKeyLocal('student_name')
};

export default storage;
