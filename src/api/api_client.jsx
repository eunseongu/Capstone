import axios from 'axios';
import { setToken } from '../components/interceptor/interceptor';

export const axiosClient = axios.create({
  headers: {
    'Content-Type': 'application/json',
  },
  baseURL: 'http://172.30.1.86:8080',
  withCredentials: true,
  timeout: 30000,
}); 

//axiosClient.interceptors.request.use(setToken);
