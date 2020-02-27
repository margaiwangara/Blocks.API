import React, { useState, useEffect } from 'react';
import { apiService } from '../services/api';

function App() {
  const [data, setData] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await apiService(
          'GET',
          'https://devnewsbucket.margaiwangara.me/api/authors',
        );
        setData(response.data);
        console.log(response);
      } catch (error) {
        console.log(error);
      }
    }
    fetchData();
  }, []);
  return <h1>Hello World</h1>;
}

export default App;
