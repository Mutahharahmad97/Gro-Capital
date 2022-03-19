import axios from 'axios';

export default function setAuthToken() {
  axios.defaults.headers.common['Authorization'] = '';
  delete axios.defaults.headers.common['Authorization'];
  const token = localStorage.getItem('authToken');
  if (token) {
    axios.defaults.headers.common['Auth-Token'] = `${token}`;
  }
}