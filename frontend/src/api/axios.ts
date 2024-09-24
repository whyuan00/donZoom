import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://j11a108.p.ssafy.io/api',
  withCredentials: true,
});

export default axiosInstance;
