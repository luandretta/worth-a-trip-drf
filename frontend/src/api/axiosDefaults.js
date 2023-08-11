import axios from 'axios';

axios.defaults.baseURL = 'https://worth-a-trip-drf-40e2fa952827.herokuapp.com/';
axios.defaults.headers.post['Content-Type'] = 'multipart/form-data';
axios.defaults.withCredentials = true;

export const axiosReq = axios.create();
export const axiosRes = axios.create();