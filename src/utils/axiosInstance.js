import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://api.factran.tech/api/v1',
});

export default instance;
