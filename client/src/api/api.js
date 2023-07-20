import axios from 'axios';

const baseURL = axios.create({
  baseURL: 'http://localhost:9001/api', 
  // baseURL: 'http://localhost:8000/inventory/api', 
});

export default baseURL;


