import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { FaArrowLeft, FaLock, FaShoppingBag, FaTrash } from "react-icons/fa";

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
  const totalItems = cartItems.reduce((acc, item) => acc + item.qty, 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-white to-emerald-50 px-5 py-12 transition-colors dark:from-slate-950 dark:via-slate-900 dark:to-emerald-950 md:px-10">
      <div className="mx-auto max-w-7xl">
        <div className="mb-10 flex flex-col gap-3">
          <p className="text-sm font-bold uppercase tracking-widest text-rose-600 dark:text-rose-400">
            Your bag
          </p>
          <h1 className="text-4xl font-extrabold text-slate-950 dark:text-white md:text-6xl">
            Shopping Cart
          </h1>
          <div className="h-1.5 w-28 rounded-full bg-rose-600 dark:bg-rose-400" />
        </div>

        {cartItems.length === 0 ? (
          <div className="flex min-h-[420px] flex-col items-center justify-center rounded-2xl border border-dashed border-rose-200 bg-white/85 px-6 py-16 text-center shadow-xl shadow-rose-100/70 dark:border-slate-700 dark:bg-slate-900/85 dark:shadow-slate-950">
            <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-rose-100 text-3xl text-rose-600 dark:bg-rose-950 dark:text-rose-300">
              <FaShoppingBag />
            </div>
            <h2 className="text-3xl font-extrabold text-slate-950 dark:text-white">
              Your cart is empty
            </h2>
            <p className="mt-3 max-w-md text-slate-600 dark:text-slate-400">
              Add your favorite Trendora picks and they will appear here ready
              for checkout.
            </p>
            <Link
              to="/shop"
              className="mt-8 inline-flex items-center gap-2 rounded-full bg-slate-950 px-6 py-3 text-sm font-bold text-white transition hover:bg-rose-700 dark:bg-rose-600 dark:hover:bg-rose-500"
            >
              <FaArrowLeft className="text-xs" />
              Continue Shopping
            </Link>
          </div>
        ) : (
          <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_360px]">
            <div className="grid gap-5">
              {cartItems.map((item) => (
                <div
                  key={item._id}
                  className="grid gap-5 rounded-2xl border border-white/80 bg-white p-4 shadow-xl shadow-rose-100/70 transition hover:-translate-y-1 hover:shadow-2xl hover:shadow-rose-200/80 dark:border-slate-700 dark:bg-slate-900 dark:shadow-slate-950 sm:grid-cols-[128px_minmax(0,1fr)_auto] sm:items-center"
                >
                  <img
                    src={item.image}
                    alt={item.title}
                    className="h-40 w-full rounded-xl object-cover sm:h-32 sm:w-32"
                  />

                  <div className="min-w-0">
                    <p className="mb-2 text-xs font-bold uppercase tracking-widest text-rose-600 dark:text-rose-400">
                      {item.category}
                    </p>
                    <h2 className="line-clamp-2 text-2xl font-extrabold text-slate-950 dark:text-white">
                      {item.title}
                    </h2>
                    <div className="mt-3 flex flex-wrap items-center gap-3 text-sm font-semibold text-slate-500 dark:text-slate-400">
                      <span>Qty: {item.qty}</span>
                      <span className="h-1.5 w-1.5 rounded-full bg-slate-300 dark:bg-slate-600" />
                      <span>Rs. {item.price} each</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between gap-4 sm:flex-col sm:items-end">
                    <p className="text-2xl font-extrabold text-rose-600 dark:text-rose-400">
                      Rs. {item.price * item.qty}
                    </p>
                    <button
                      type="button"
                      onClick={() => removeHandler(item._id)}
                      className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-rose-50 text-rose-600 transition hover:bg-rose-600 hover:text-white dark:bg-slate-800 dark:text-rose-300 dark:hover:bg-rose-600"
                      aria-label={`Remove ${item.title} from cart`}
                    >
                      <FaTrash />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <aside className="h-fit rounded-2xl border border-white/80 bg-white p-6 shadow-xl shadow-rose-100/70 dark:border-slate-700 dark:bg-slate-900 dark:shadow-slate-950">
              <h2 className="text-2xl font-extrabold text-slate-950 dark:text-white">
                Order Summary
              </h2>
              <div className="mt-6 space-y-4 text-sm font-semibold text-slate-600 dark:text-slate-400">
                <div className="flex justify-between">
                  <span>Items</span>
                  <span>{totalItems}</span>
                </div>
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>Rs. {totalPrice}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span className="text-emerald-600 dark:text-emerald-400">
                    Free
                  </span>
                </div>
              </div>
              <div className="my-6 h-px bg-slate-200 dark:bg-slate-700" />
              <div className="flex items-center justify-between">
                <span className="text-lg font-bold text-slate-600 dark:text-slate-400">
                  Total
                </span>
                <span className="text-3xl font-extrabold text-slate-950 dark:text-white">
                  Rs. {totalPrice}
                </span>
              </div>
              <button
                type="button"
                className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-slate-950 px-6 py-3 text-sm font-bold text-white transition hover:bg-rose-700 dark:bg-rose-600 dark:hover:bg-rose-500"
              >
                <FaLock className="text-xs" />
                Checkout
              </button>
              <Link
                to="/shop"
                className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-full border border-slate-200 px-6 py-3 text-sm font-bold text-slate-700 transition hover:border-rose-300 hover:text-rose-600 dark:border-slate-700 dark:text-slate-300 dark:hover:border-rose-500 dark:hover:text-rose-300"
              >
                Continue Shopping
              </Link>
            </aside>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
