import api from "../config/axios";

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

  const response = await api.get("/comment/me", { params });
  return response.data;
};

export const createComment = async (content) => {
  const response = await api.post("/comment", { content });
  return response.data;
};

export const updateComment = async (id, content) => {
  const response = await api.put(`/comment/${id}`, { content });
  return response.data;
}