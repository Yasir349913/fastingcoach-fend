import axios from 'axios';

const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/v1';

export const getPlans = async () => {
  const res = await axios.get(`${BASE_URL}/payment-plans`);
  return res.data;
};
