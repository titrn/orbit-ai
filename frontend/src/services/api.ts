import axios from "axios";

const API_BASE_URL = "http://localhost:8000";

// axios allows developers to use CRUD requests
export const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        "Content-Type": "application/json",
    },
});

// fetch simulated flight trajectory
export const getFlightSimulation = async (params: { thrust: number; mass: number }) => {
  try {
    const response = await api.post('/simulate', params);
    return response.data;
  } catch (error) {
    console.error('Error fetching simulation:', error);
    throw error;
  }
};