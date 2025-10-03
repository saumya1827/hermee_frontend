// src/components/Cart.jsx
import React, { useState } from "react";
import { API_URL } from "../config";

export default function Cart({ cart, remove, go }) {
  const [loading, setLoading] = useState(false);

  const total = cart.reduce((s, i) => s + (i.price || 0), 0);

  const handleCheckout = async () => {
    const user = JSON.parse(localStorage.getItem("htl_user"));
    const token = user?.token;

    if (!token) {
      alert("Please sign in first!");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(`${API_URL}/orders`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ items: cart, total }),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.error || "Checkout failed");

      alert(data.message);
      go("home");
    } catch (err) {
      console.error(err);
      alert(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>Your Cart</h2>
      <div className="card" style={{ maxWidth: 420 }}>
        {cart.length === 0 ? (
          <div className="empty">Your cart is empty</div>
        ) : (
          <>
            <ul style={{ listStyle: "none", padding: 0 }}>
              {cart.map((item, idx) => (
                <li key={idx} style={{ marginBottom: 10 }}>
                  {item.name} - ${item.price || 0}{" "}
                  <button onClick={() => remove(idx)}>Remove</button>
                </li>
              ))}
            </ul>
            <div style={{ marginTop: 10 }}>
              <strong>Total: ${total}</strong>
            </div>
            <button
              className="btn"
              onClick={handleCheckout}
              disabled={loading}
              style={{ marginTop: 10 }}
            >
              {loading ? "Processing..." : "Checkout"}
            </button>
          </>
        )}
      </div>
    </div>
  );
}
