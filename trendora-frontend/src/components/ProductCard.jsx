import { Link } from "react-router-dom";

import { FaArrowRight, FaHeart } from "react-icons/fa";
import toast from "react-hot-toast";
import { addWishlistItem } from "../redux/slices/wishlistSlice";
import { useDispatch, useSelector } from "react-redux";

const ProductCard = ({ product }) => {
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.auth);

  const wishlistHandler = async () => {
    if (!userInfo?.token) {
      toast.error("Please login to add items to your wishlist.");
      return;
    }

    try {
      await dispatch(
        addWishlistItem({
          productId: product._id,
          token: userInfo.token,
        }),
      ).unwrap();

      toast.success("Added to wishlist.");
    } catch (error) {
      toast.error(error || "Unable to add item to wishlist.");
    }
  };
  return (
    <div className="group overflow-hidden rounded-2xl border border-white/80 bg-white shadow-xl shadow-rose-100/70 transition duration-300 hover:-translate-y-2 hover:shadow-2xl hover:shadow-rose-200/80 dark:border-slate-700 dark:bg-slate-900 dark:shadow-slate-950">
      <div className="relative overflow-hidden bg-slate-100 dark:bg-slate-800">
        <img
          src={product.image}
          alt={product.title}
          className="h-72 w-full object-cover transition duration-500 group-hover:scale-110"
        />

        <button
          type="button"
          className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-white/90 text-rose-600 shadow-md transition hover:bg-rose-600 hover:text-white dark:bg-slate-950/90 dark:text-rose-300 dark:hover:bg-rose-600 dark:hover:text-white"
          aria-label="Add to wishlist"
          onClick={wishlistHandler}
        >
          <FaHeart />
        </button>

        <span className="absolute left-4 top-4 rounded-full bg-slate-950/85 px-3 py-1 text-xs font-bold uppercase tracking-wide text-white backdrop-blur dark:bg-white/90 dark:text-slate-950">
          {product.category}
        </span>
      </div>

      <div className="p-5">
        <h2 className="mb-3 line-clamp-2 min-h-14 text-xl font-extrabold text-slate-950 dark:text-white">
          {product.title}
        </h2>

        <div className="flex items-center justify-between gap-4">
          <span className="text-2xl font-extrabold text-rose-600 dark:text-rose-400">
            Rs. {product.price}
          </span>
          <Link
            to={`/product/${product._id}`}
            className="inline-flex items-center gap-2 rounded-full bg-slate-950 px-4 py-2 text-sm font-bold text-white transition hover:bg-rose-700 dark:bg-rose-600 dark:hover:bg-rose-500"
          >
            View
            <FaArrowRight className="text-xs" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
