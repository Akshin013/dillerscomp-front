import api from "./api";

/* ===== PUBLIC ===== */

export const getDealers = async () => {
  const res = await api.get("/dealers");
  return res.data;
};

export const getDealerBySlug = async (slug) => {
  const res = await api.get(`/dealers/${slug}`);
  return res.data;
};

/* ===== USER ===== */

export const applyDealer = async (data) => {
  const res = await api.post("/dealers", data);
  return res.data;
};

/* ===== ADMIN ===== */

export const approveDealer = async (id) => {
  const res = await api.patch(`/admin/dealers/${id}/approve`);
  return res.data;
};

export const rejectDealer = async (id) => {
  const res = await api.patch(`/admin/dealers/${id}/reject`);
  return res.data;
};
