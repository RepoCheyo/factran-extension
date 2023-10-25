import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://34.228.39.163/api/v1',
});

export default instance;
