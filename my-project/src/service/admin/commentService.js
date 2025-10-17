import api from "../../config/axios";

export const getComments = async ({
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

  const response = await api.get("/comment", { params });
  return response.data;
};