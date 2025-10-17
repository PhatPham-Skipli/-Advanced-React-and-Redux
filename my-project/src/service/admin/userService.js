import api from "../../config/axios";

export const getAccounts = async ({
  page = 1,
  limit = 10,
  search = "",
  order = "DESC",
  isActive = ""
} = {}) => {
  const params = {
    page,
    limit,
    search,
    order,
  };
  if (isActive !== "") params.isActive = isActive;

  const response = await api.get("/account", { params });
  return response.data;
};

export const deleteAccount = async (id) => {
  const response = await api.delete(`/account/${id}`);
  return response.data;
}

export const restoreAccount = async (id) => {
  const response = await api.put(`/account/restore/${id}`);
  return response.data;
}