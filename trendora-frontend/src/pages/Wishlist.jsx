import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import toast from "react-hot-toast";
import {
  FaArrowLeft,
  FaArrowRight,
  FaHeart,
  FaShoppingBag,
  FaTrash,
} from "react-icons/fa";

import { addCartItem } from "../redux/slices/cartSlice";
import {
  deleteWishlistItem,
  fetchWishlist,
} from "../redux/slices/wishlistSlice";

const getWishlistItemId = (item) => item?._id || item?.id;

const getWishlistProduct = (item) =>
  item?.product && typeof item.product === "object"
    ? item.product
    : item?.productId && typeof item.productId === "object"
      ? item.productId
      : item;

const getWishlistProductId = (item) => {
  const product = item?.product || item?.productId;

  return product?._id || product?.id || product || getWishlistItemId(item);
};

const Wishlist = () => {
  const dispatch = useDispatch();

  const { wishlistItems, loading, error } = useSelector(
    (state) => state.wishlist,
  );
  const { userInfo } = useSelector((state) => state.auth);

  useEffect(() => {
    if (userInfo?.token) {
      dispatch(fetchWishlist(userInfo.token));
    }
  }, [dispatch, userInfo]);

  const removeHandler = async (id) => {
    if (!userInfo?.token) {
      toast.error("Please login to manage your wishlist.");
      return;
    }

    try {
      await dispatch(
        deleteWishlistItem({
          id,
          token: userInfo.token,
        }),
      ).unwrap();
      toast.success("Removed from wishlist.");
    } catch (error) {
      toast.error(error || "Unable to remove item from wishlist.");
    }
  };

  const moveToCartHandler = async (item) => {
    if (!userInfo?.token) {
      toast.error("Please login to move items to your cart.");
      return;
    }

    try {
      await dispatch(
        addCartItem({
          productId: getWishlistProductId(item),
          qty: item.qty || 1,
          token: userInfo.token,
        }),
      ).unwrap();

      await dispatch(
        deleteWishlistItem({
          id: getWishlistItemId(item),
          token: userInfo.token,
        }),
      ).unwrap();
      toast.success("Moved to cart.");
    } catch (error) {
      toast.error(error || "Unable to move item to cart.");
    }
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

        {!userInfo?.token ? (
          <div className="flex min-h-[420px] flex-col items-center justify-center rounded-2xl border border-dashed border-rose-200 bg-white/85 px-6 py-16 text-center shadow-xl shadow-rose-100/70 dark:border-slate-700 dark:bg-slate-900/85 dark:shadow-slate-950">
            <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-rose-100 text-3xl text-rose-600 dark:bg-rose-950 dark:text-rose-300">
              <FaHeart />
            </div>
            <h2 className="text-3xl font-extrabold text-slate-950 dark:text-white">
              Login to view your wishlist
            </h2>
            <p className="mt-3 max-w-md text-slate-600 dark:text-slate-400">
              Your wishlist is saved to your account, so please login before
              adding or viewing items.
            </p>
            <Link
              to="/login"
              className="mt-8 inline-flex items-center gap-2 rounded-full bg-slate-950 px-6 py-3 text-sm font-bold text-white transition hover:bg-rose-700 dark:bg-rose-600 dark:hover:bg-rose-500"
            >
              Login
            </Link>
          </div>
        ) : loading ? (
          <div className="flex min-h-[420px] items-center justify-center rounded-2xl border border-white/80 bg-white/85 px-6 py-16 text-center shadow-xl shadow-rose-100/70 dark:border-slate-700 dark:bg-slate-900/85 dark:shadow-slate-950">
            <h2 className="text-3xl font-extrabold text-slate-950 dark:text-white">
              Loading wishlist...
            </h2>
          </div>
        ) : error ? (
          <div className="flex min-h-[420px] flex-col items-center justify-center rounded-2xl border border-dashed border-rose-200 bg-white/85 px-6 py-16 text-center shadow-xl shadow-rose-100/70 dark:border-slate-700 dark:bg-slate-900/85 dark:shadow-slate-950">
            <h2 className="text-3xl font-extrabold text-slate-950 dark:text-white">
              {error}
            </h2>
            <button
              type="button"
              onClick={() => dispatch(fetchWishlist(userInfo.token))}
              className="mt-8 inline-flex items-center gap-2 rounded-full bg-slate-950 px-6 py-3 text-sm font-bold text-white transition hover:bg-rose-700 dark:bg-rose-600 dark:hover:bg-rose-500"
            >
              Try Again
            </button>
          </div>
        ) : wishlistItems.length === 0 ? (
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
            {wishlistItems.map((item) => {
              const itemId = getWishlistItemId(item);
              const product = getWishlistProduct(item);
              const productId = getWishlistProductId(item);
              const title = product?.title || "Product unavailable";

              return (
                <div
                  key={itemId}
                  className="group overflow-hidden rounded-2xl border border-white/80 bg-white shadow-xl shadow-rose-100/70 transition duration-300 hover:-translate-y-2 hover:shadow-2xl hover:shadow-rose-200/80 dark:border-slate-700 dark:bg-slate-900 dark:shadow-slate-950"
                >
                  <div className="relative overflow-hidden bg-slate-100 dark:bg-slate-800">
                    {product?.image ? (
                      <img
                        src={product.image}
                        alt={title}
                        className="h-72 w-full object-cover transition duration-500 group-hover:scale-110"
                      />
                    ) : (
                      <div className="flex h-72 w-full items-center justify-center bg-slate-100 text-sm font-semibold text-slate-500 dark:bg-slate-800 dark:text-slate-400">
                        No image
                      </div>
                    )}
                    <button
                      type="button"
                      onClick={() => removeHandler(itemId)}
                      className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-white/90 text-rose-600 shadow-md transition hover:bg-rose-600 hover:text-white dark:bg-slate-950/90 dark:text-rose-300 dark:hover:bg-rose-600 dark:hover:text-white"
                      aria-label={`Remove ${title} from wishlist`}
                    >
                      <FaTrash />
                    </button>
                    <span className="absolute left-4 top-4 rounded-full bg-slate-950/85 px-3 py-1 text-xs font-bold uppercase tracking-wide text-white backdrop-blur dark:bg-white/90 dark:text-slate-950">
                      {product?.category || "Wishlist item"}
                    </span>
                  </div>

                  <div className="p-5">
                    <h2 className="mb-3 line-clamp-2 min-h-14 text-xl font-extrabold text-slate-950 dark:text-white">
                      {title}
                    </h2>

                    <div className="mb-5 flex items-center justify-between gap-4">
                      <span className="text-2xl font-extrabold text-rose-600 dark:text-rose-400">
                        Rs. {product?.price ?? 0}
                      </span>
                      <Link
                        to={`/product/${productId}`}
                        className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 text-slate-700 transition hover:border-rose-300 hover:text-rose-600 dark:border-slate-700 dark:text-slate-300 dark:hover:border-rose-500 dark:hover:text-rose-300"
                        aria-label={`View ${title}`}
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
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default Wishlist;
