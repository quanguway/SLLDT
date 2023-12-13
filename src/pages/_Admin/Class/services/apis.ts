import fetch from '../../../../services/request';


const saveclass = (body : any) => {
  console.log(body);
  
  return fetch({
    method: 'post',
    url: 'class/save',
    body,
  });
};
// api here
const apisclassAdmin= {
  saveclass
};

export default apisclassAdmin;
