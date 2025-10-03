import { useEffect, useState } from "react";
import { getCart } from "../api/cartApi";
import { placeOrder } from "../api/orderApi";

export default function Checkout() {
  const user = JSON.parse(localStorage.getItem("user"));
  const [cartItems, setCartItems] = useState([]);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const fetchCart = async () => {
      const data = await getCart(user._id);
      setCartItems(data.items || []);
      const sum = (data.items || []).reduce((a, item) => a + item.price * item.quantity, 0);
      setTotal(sum);
    };
    fetchCart();
  }, []);

  const handlePlaceOrder = async () => {
    const res = await placeOrder(user._id, cartItems, total);
    if (res.success) {
      alert("Order placed successfully!");
      window.location.href = "/";
    } else {
      alert(res.message || "Order failed!");
    }
  };

  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold mb-4">Checkout</h2>
      {cartItems.map((item) => (
        <div key={item._id} className="flex justify-between mb-2">
          <span>{item.name} x {item.quantity}</span>
          <span>₹{item.price * item.quantity}</span>
        </div>
      ))}
      <h3 className="mt-4 text-xl font-bold">Total: ₹{total}</h3>
      <button
        onClick={handlePlaceOrder}
        className="mt-4 bg-black text-white py-2 px-4 rounded"
      >
        Place Order
      </button>
    </div>
  );
}
