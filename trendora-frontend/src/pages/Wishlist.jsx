import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  FaArrowLeft,
  FaArrowRight,
  FaHeart,
  FaShoppingBag,
  FaTrash,
} from "react-icons/fa";

import { addToCart } from "../redux/slices/cartSlice";
import { removeFromWishlist } from "../redux/slices/wishlistSlice";

const Wishlist = () => {
  const dispatch = useDispatch();

  const { wishlistItems } = useSelector((state) => state.wishlist);

  const removeHandler = (id) => {
    dispatch(removeFromWishlist(id));
  };

  const moveToCartHandler = (item) => {
    dispatch(addToCart({ ...item, qty: item.qty || 1 }));
    dispatch(removeFromWishlist(item._id));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-white to-emerald-50 px-5 py-12 transition-colors dark:from-slate-950 dark:via-slate-900 dark:to-emerald-950 md:px-10">
      <div className="mx-auto max-w-7xl">
        <div className="mb-10 flex flex-col gap-3">
          <p className="text-sm font-bold uppercase tracking-widest text-rose-600 dark:text-rose-400">
            Saved styles
          </p>
          <h1 className="text-4xl font-extrabold text-slate-950 dark:text-white md:text-6xl">
            Wishlist
          </h1>
          <div className="h-1.5 w-28 rounded-full bg-rose-600 dark:bg-rose-400" />
        </div>

        {wishlistItems.length === 0 ? (
          <div className="flex min-h-[420px] flex-col items-center justify-center rounded-2xl border border-dashed border-rose-200 bg-white/85 px-6 py-16 text-center shadow-xl shadow-rose-100/70 dark:border-slate-700 dark:bg-slate-900/85 dark:shadow-slate-950">
            <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-rose-100 text-3xl text-rose-600 dark:bg-rose-950 dark:text-rose-300">
              <FaHeart />
            </div>
            <h2 className="text-3xl font-extrabold text-slate-950 dark:text-white">
              Your wishlist is empty
            </h2>
            <p className="mt-3 max-w-md text-slate-600 dark:text-slate-400">
              Tap the heart on any product card to save it here for later.
            </p>
            <Link
              to="/shop"
              className="mt-8 inline-flex items-center gap-2 rounded-full bg-slate-950 px-6 py-3 text-sm font-bold text-white transition hover:bg-rose-700 dark:bg-rose-600 dark:hover:bg-rose-500"
            >
              <FaArrowLeft className="text-xs" />
              Explore Products
            </Link>
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {wishlistItems.map((item) => (
              <div
                key={item._id}
                className="group overflow-hidden rounded-2xl border border-white/80 bg-white shadow-xl shadow-rose-100/70 transition duration-300 hover:-translate-y-2 hover:shadow-2xl hover:shadow-rose-200/80 dark:border-slate-700 dark:bg-slate-900 dark:shadow-slate-950"
              >
                <div className="relative overflow-hidden bg-slate-100 dark:bg-slate-800">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="h-72 w-full object-cover transition duration-500 group-hover:scale-110"
                  />
                  <button
                    type="button"
                    onClick={() => removeHandler(item._id)}
                    className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-white/90 text-rose-600 shadow-md transition hover:bg-rose-600 hover:text-white dark:bg-slate-950/90 dark:text-rose-300 dark:hover:bg-rose-600 dark:hover:text-white"
                    aria-label={`Remove ${item.title} from wishlist`}
                  >
                    <FaTrash />
                  </button>
                  <span className="absolute left-4 top-4 rounded-full bg-slate-950/85 px-3 py-1 text-xs font-bold uppercase tracking-wide text-white backdrop-blur dark:bg-white/90 dark:text-slate-950">
                    {item.category}
                  </span>
                </div>

                <div className="p-5">
                  <h2 className="mb-3 line-clamp-2 min-h-14 text-xl font-extrabold text-slate-950 dark:text-white">
                    {item.title}
                  </h2>

                  <div className="mb-5 flex items-center justify-between gap-4">
                    <span className="text-2xl font-extrabold text-rose-600 dark:text-rose-400">
                      Rs. {item.price}
                    </span>
                    <Link
                      to={`/product/${item._id}`}
                      className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 text-slate-700 transition hover:border-rose-300 hover:text-rose-600 dark:border-slate-700 dark:text-slate-300 dark:hover:border-rose-500 dark:hover:text-rose-300"
                      aria-label={`View ${item.title}`}
                    >
                      <FaArrowRight className="text-sm" />
                    </Link>
                  </div>

                  <button
                    type="button"
                    onClick={() => moveToCartHandler(item)}
                    className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-slate-950 px-5 py-3 text-sm font-bold text-white transition hover:bg-rose-700 dark:bg-rose-600 dark:hover:bg-rose-500"
                  >
                    <FaShoppingBag className="text-xs" />
                    Move To Cart
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Wishlist;
