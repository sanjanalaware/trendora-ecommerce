import { Link } from "react-router-dom";

import {
  FaArrowLeft,
  FaHeart,
  FaHome,
  FaSearch,
  FaShoppingBag,
} from "react-icons/fa";

const NotFound = () => {
  return (
    <div className="relative isolate flex min-h-[calc(100vh-88px)] items-center overflow-hidden bg-slate-950 px-5 py-16 text-white md:px-10">
      <img
        src="https://images.unsplash.com/photo-1496747611176-843222e1e57c"
        alt="Fashion collection"
        className="absolute inset-0 -z-20 h-full w-full object-cover opacity-35"
      />
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-slate-950 via-slate-950/85 to-slate-950/35" />

      <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[minmax(0,0.9fr)_minmax(320px,0.6fr)] lg:items-center">
        <div>
          <p className="text-sm font-black uppercase tracking-[0.3em] text-rose-300">
            404 error
          </p>

          <h1 className="mt-5 text-6xl font-black leading-none md:text-8xl">
            This style is out of stock.
          </h1>

          <p className="mt-6 max-w-xl text-lg font-medium text-slate-300">
            The page you are looking for does not exist, moved, or the link is
            no longer available. Head back and keep browsing the collection.
          </p>

          <div className="mt-10 flex flex-wrap gap-4">
            <Link
              to="/"
              className="inline-flex items-center gap-2 rounded-full bg-rose-600 px-7 py-4 text-sm font-bold text-white transition hover:bg-rose-500"
            >
              <FaArrowLeft className="text-xs" />
              Back To Home
            </Link>

            <Link
              to="/shop"
              className="inline-flex items-center gap-2 rounded-full border border-white/40 px-7 py-4 text-sm font-bold text-white transition hover:border-white hover:bg-white/10"
            >
              Browse Shop
              <FaShoppingBag className="text-xs" />
            </Link>
          </div>
        </div>

        <div className="rounded-2xl border border-white/15 bg-white/10 p-6 shadow-2xl backdrop-blur">
          <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-rose-500/20 text-3xl text-rose-200">
            <FaSearch />
          </div>

          <h2 className="text-3xl font-black">Try these instead</h2>

          <div className="mt-6 grid gap-3">
            <Link
              to="/"
              className="flex items-center gap-3 rounded-xl bg-white/10 px-4 py-4 text-sm font-bold transition hover:bg-white/15"
            >
              <FaHome className="text-rose-300" />
              Home page
            </Link>

            <Link
              to="/shop"
              className="flex items-center gap-3 rounded-xl bg-white/10 px-4 py-4 text-sm font-bold transition hover:bg-white/15"
            >
              <FaShoppingBag className="text-rose-300" />
              Shop collection
            </Link>

            <Link
              to="/wishlist"
              className="flex items-center gap-3 rounded-xl bg-white/10 px-4 py-4 text-sm font-bold transition hover:bg-white/15"
            >
              <FaHeart className="text-rose-300" />
              Your wishlist
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
