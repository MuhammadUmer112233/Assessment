import axios from 'axios';

export const baseUrl = 'http://localhost:8000';

const API = axios.create({
  baseURL: baseUrl,
});

export default API;
