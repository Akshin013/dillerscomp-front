import api from "./api";

/* ===== USERS ===== */

export const getUsers = async () => {
  const res = await api.get("/admin/users");
  return res.data;
};

export const blockUser = async (id) => {
  const res = await api.patch(`/admin/users/${id}/block`);
  return res.data;
};

export const unblockUser = async (id) => {
  const res = await api.patch(`/admin/users/${id}/unblock`);
  return res.data;
};

/* ===== PRODUCTS ===== */

export const getAllProducts = async () => {
  const res = await api.get("/admin/products");
  return res.data;
};

/* ===== DEALERS ===== */

export const getAllDealers = async () => {
  const res = await api.get("/admin/dealers");
  return res.data;
};
