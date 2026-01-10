import api from "./api";
const API_URL = "http://localhost:5000/api"; // твой backend

/* ===== PUBLIC ===== */

export const getProducts = async () => {
  const res = await api.get(`${API_URL}/products`);
  return res.data;
};

export const getProduct = async (id) => {
  const res = await api.get(`${API_URL}/products/${id}`);
  return res.data;
};

/* ===== DEALER ===== */

export const getDealerProducts = async () => {
  const res = await api.get("/dealer/products");
  return res.data;
};

export const createProduct = async (data) => {
  const res = await api.post("/products", data);
  return res.data;
};

/* ===== ADMIN ===== */

export const approveProduct = async (id) => {
  const res = await api.patch(`/admin/products/${id}/approve`);
  return res.data;
};

export const deleteProduct = async (id) => {
  const res = await api.delete(`/admin/products/${id}`);
  return res.data;
};
