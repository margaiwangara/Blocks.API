import axios from 'axios';

function apiService(method, path, payload) {
  return new Promise((resolve, reject) => {
    axios[method.toLowerCase()](`http://localhost:5000${path}`, payload)
      .then(res => resolve(res.data))
      .catch(error => reject(error.response.data.error));
  });
}

export { apiService };
