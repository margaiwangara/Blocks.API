import axios from 'axios';

// set token
function setTokenHeader(token) {
  if (token) axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  else delete axios.defaults.headers.common['Authorization'];
}

function apiService(method, path, payload) {
  return new Promise((resolve, reject) => {
    axios[method.toLowerCase()](`http://localhost:5000${path}`, payload)
      .then(res => resolve(res.data))
      .catch(error => reject(error.response.data.error));
  });
}

export { apiService, setTokenHeader };
