import React from "react";
import { useCart } from "../components/CartContext";

const CartPage = () => {
  const { cart, removeFromCart, updateQuantity, clearCart } = useCart();

  const handleChangeQuantity = (productId, delta) => {
    const product = cart.find((p) => p.id === productId);
    if (!product) return;
    const newQuantity = product.quantity + delta;
    if (newQuantity <= 0) removeFromCart(productId);
    else updateQuantity(productId, newQuantity);
  };

  const totalPrice = cart.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  return (
    <div className="pt-32 max-w-5xl mx-auto p-5">
      <h2 className="text-3xl font-bold mb-5">Your Cart</h2>

      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          <table className="w-full border mb-5">
            <thead>
              <tr className="bg-gray-200">
                <th className="border px-2 py-1">Product</th>
                <th className="border px-2 py-1">Price</th>
                <th className="border px-2 py-1">Quantity</th>
                <th className="border px-2 py-1">Total</th>
                <th className="border px-2 py-1">Actions</th>
              </tr>
            </thead>
            <tbody>
              {cart.map((item) => (
                <tr key={item.id}>
                  <td className="border px-2 py-1 flex items-center gap-2">
                    {item.img && (
                      <img
                        src={`http://localhost:5000${item.img}`}
                        alt={item.name}
                        className="w-16 h-16 object-contain"
                      />
                    )}
                    {item.name}
                  </td>
                  <td className="border px-2 py-1">{item.price}$</td>
                  <td className="border px-2 py-1 flex items-center gap-2">
                    <button
                      onClick={() => handleChangeQuantity(item.id, -1)}
                      className="px-2 py-1 bg-gray-300 rounded"
                    >
                      -
                    </button>
                    {item.quantity}
                    <button
                      onClick={() => handleChangeQuantity(item.id, 1)}
                      className="px-2 py-1 bg-gray-300 rounded"
                    >
                      +
                    </button>
                  </td>
                  <td className="border px-2 py-1">{item.price * item.quantity}$</td>
                  <td className="border px-2 py-1">
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="bg-red-500 text-white px-2 py-1 rounded"
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="flex justify-between items-center">
            <button
              onClick={clearCart}
              className="bg-red-500 text-white px-4 py-2 rounded"
            >
              Clear Cart
            </button>
            <h3 className="text-xl font-semibold">Total: {totalPrice}$</h3>
          </div>
        </>
      )}
    </div>
  );
};

export default CartPage;