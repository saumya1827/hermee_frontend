import { API_BASE } from "./apiBase";

export const getCart = async (userId) => {
  const res = await fetch(`${API_BASE}/api/cart/${userId}`);
  return await res.json();
};

export const addToCart = async (userId, item) => {
  const res = await fetch(`${API_BASE}/api/cart/${userId}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(item),
  });
  return await res.json();
};

export const removeFromCart = async (userId, itemId) => {
  const res = await fetch(`${API_BASE}/api/cart/${userId}/${itemId}`, {
    method: "DELETE",
  });
  return await res.json();
};
