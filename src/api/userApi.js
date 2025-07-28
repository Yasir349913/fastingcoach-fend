import axios from 'axios';

const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/v1';

const addUser = async (userData) => {
  try {
    console.log('Sending user data:', userData);

    const response = await axios.post(`${BASE_URL}/user`, userData, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    return response.data;
  } catch (error) {
    console.error('Error adding user:', error.response?.data || error.message);
    throw error;
  }
};

export default addUser;
