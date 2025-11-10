import axios from 'axios';

const api = axios.create({
  baseURL: 'https://scania-clube-homolog.azurewebsites.net/api'
});

export default api;