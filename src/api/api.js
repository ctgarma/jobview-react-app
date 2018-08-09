import axios from 'axios';

const JOB_URL = 'https://geoserviceuat-api.jobtrakka.com/api/v1/job/actual';
const TOKEN_URL = 'https://geoserviceuat-api.jobtrakka.com/oauth/token';

function addJob(data, token) {
   return axios({
    method: 'post',
    url: JOB_URL,
    headers: { 'Authorization': `Bearer ${token}` },
    data: data
  }).then((res) => {
    return ('Job saved');
  }).catch((e) => {
    throw new Error(`Unable to add Job, ${e}`);
  }); 
}


function listJobs(token) {
  return axios({
    method: 'get',
    url: JOB_URL,
    headers: { 'Authorization': `Bearer ${token}` }
  }).then(results =>{return results})
    .catch((e) => {
      throw new Error(`Unable to list jobs,${e}`);
    });

}

function getToken(login, password) {
  return axios({
    method: 'post',
    url: TOKEN_URL,
    data: {
      grant_type: 'password',
      login: login,
      password: password
    }
  }).then((res) => {
    return res.data;
  }).catch((e) => {
    throw new Error(e);
  });

}
 
export { addJob, listJobs, getToken };
