import React, { useState } from "react";
import { API_URL } from "../config";

export default function SignIn({ go }) {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");

  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(`${API_URL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, name }),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.error || "Something went wrong");

      localStorage.setItem("htl_user", JSON.stringify({ ...data.user, token: data.token }));
      alert("Welcome back — " + data.user.name);
      go("home");
    } catch (err) {
      alert(err.message);
      console.error(err);
    }
  };

  return (
    <div>
      <h2>Sign In</h2>
      <div className="card" style={{ maxWidth: 420 }}>
        <form onSubmit={onSubmit}>
          <div style={{ marginBottom: 10 }}>
            <label className="small">Email</label><br />
            <input
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={{ width: "100%", padding: 10, borderRadius: 8, border: "1px solid #eee" }}
            />
          </div>
          <div style={{ marginBottom: 10 }}>
            <label className="small">Name</label><br />
            <input
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              style={{ width: "100%", padding: 10, borderRadius: 8, border: "1px solid #eee" }}
            />
          </div>
          <div style={{ display: "flex", gap: 8 }}>
            <button className="btn" type="submit">Sign In</button>
            <button className="btn" type="button" onClick={() => go("home")}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
}
