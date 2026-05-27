import { useDispatch, useSelector } from "react-redux";

import { removeFromCart } from "../redux/slices/cartSlice";

const Cart = () => {
  const dispatch = useDispatch();

  const { cartItems } = useSelector((state) => state.cart);

  const removeHandler = (id) => {
    dispatch(removeFromCart(id));
  };

  const totalPrice = cartItems.reduce(
    (acc, item) => acc + item.price * item.qty,
    0,
  );

  return (
    <div className="min-h-screen px-10 py-10">
      <h1 className="text-5xl font-bold mb-10">Shopping Cart</h1>

      {cartItems.length === 0 ? (
        <h2>Your cart is empty</h2>
      ) : (
        <div className="grid gap-6">
          {cartItems.map((item) => (
            <div
              key={item._id}
              className="flex items-center justify-between shadow-md p-5 rounded-xl"
            >
              <div className="flex items-center gap-5">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-28 h-28 object-cover rounded-lg"
                />

                <div>
                  <h2 className="text-2xl font-bold">{item.title}</h2>

                  <p>₹{item.price}</p>
                </div>
              </div>

              <button
                onClick={() => removeHandler(item._id)}
                className="bg-red-500 text-white px-4 py-2 rounded-lg"
              >
                Remove
              </button>
            </div>
          ))}

          <div className="mt-10 text-right">
            <h2 className="text-4xl font-bold">Total: ₹{totalPrice}</h2>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
