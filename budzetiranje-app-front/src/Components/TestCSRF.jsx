import React from 'react';
import axios from 'axios';

const testCSRF = async () => {
  const res = await axios.get('/sanctum/csrf-cookie');
  console.log('CSRF request done - ', res);
};

export default testCSRF;
