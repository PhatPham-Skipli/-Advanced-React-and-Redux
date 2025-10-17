import api from "../config/axios";

export const getProfile = async () => {
  const response = await api.get("/account/me");
  return response.data;
};