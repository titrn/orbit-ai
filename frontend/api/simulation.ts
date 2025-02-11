// this frontend api sends a request to our backend simulate api and waits for a response to come back
import axios from 'axios'; // used for making requests

const API_BASE_URL = 'http://localhost:8000';

export const runSimulation = async (params: any) => {
  try {
    console.log(`inside here ${API_BASE_URL}`)
    const response = await axios.post(`${API_BASE_URL}/simulate`, params, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
    console.log("response received:", response);
    return response.data;
  } catch (error) {
    console.error('Error fetching simulation:', error);
    throw error;
  }
};
