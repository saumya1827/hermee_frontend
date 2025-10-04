const API_BASE = "https://hermee-backend.onrender.com";

// Create order
export async function createOrder(data) {
  const res = await fetch(`${API_BASE}/api/orders`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  });
  return res.json();
}
