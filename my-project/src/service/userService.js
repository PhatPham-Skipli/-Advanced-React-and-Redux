import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

export const getProfile = async (token) => {
  const response = await axios.get(`${API_URL}/account/me`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};