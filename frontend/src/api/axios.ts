import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://j11a108.p.ssafy.io',
  withCredentials: true,
});

export default axiosInstance;
