import axiosClient from "./axiosClient";

const Comments = {
  createComment: (data) => axiosClient.post("/product/comments", data),
  updateComment: (id, data) => axiosClient.put(`/product/comments/${id}`, data),
  deleteComment: (id) => axiosClient.delete(`/product/comments/${id}`),
};

export default Comments;
