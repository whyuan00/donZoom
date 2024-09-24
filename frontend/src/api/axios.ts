import axios from 'axios';
// import {BASE_URL, EC2} from '@env';

const axiosInstance = axios.create({
  baseURL: 'https://j11a108.p.ssafy.io/api',
  withCredentials: true,
});

export default axiosInstance;
