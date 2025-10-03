export const loginUser = async (email, password) => {
  const res = await fetch("http://localhost:5000/api/users", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password })
  });
  return await res.json();
};

export const registerUser = async (name, email, password) => {
  const res = await fetch("http://localhost:5000/api/users/register", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, email, password })
  });
  return await res.json();
};
