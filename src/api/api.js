const API_BASE = "https://hermee-backend.onrender.com";

fetch(`${API_BASE}/api/users/login`, {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ email, password })
});
