import { useEffect, useMemo, useState } from "react";

import {
  FaChevronDown,
  FaFilter,
  FaSearch,
  FaSlidersH,
  FaSortAmountDown,
  FaSpinner,
  FaTimes,
} from "react-icons/fa";

import ProductCard from "../components/ProductCard";

import { getProducts } from "../services/productService";

const Shop = () => {
  const [products, setProducts] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [search, setSearch] = useState("");

  const [category, setCategory] = useState("All");

  const [sort, setSort] = useState("");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getProducts();

        setProducts(data);
        setError("");
      } catch (error) {
        setError(error.response?.data?.message || "Unable to load products.");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const categories = useMemo(() => {
    return ["All", ...new Set(products.map((product) => product.category))];
  }, [products]);

  const filteredProducts = useMemo(() => {
    let updatedProducts = [...products];

    // SEARCH
    if (search) {
      updatedProducts = updatedProducts.filter((product) =>
        product.title.toLowerCase().includes(search.toLowerCase()),
      );
    }

    // CATEGORY
    if (category !== "All") {
      updatedProducts = updatedProducts.filter(
        (product) => product.category === category,
      );
    }

    // SORT
    if (sort === "low") {
      updatedProducts.sort((a, b) => a.price - b.price);
    }

    if (sort === "high") {
      updatedProducts.sort((a, b) => b.price - a.price);
    }

    return updatedProducts;
  }, [products, search, category, sort]);

  const hasActiveFilters = search || category !== "All" || sort;

  const resetFilters = () => {
    setSearch("");
    setCategory("All");
    setSort("");
  };

  if (loading) {
    return (
      <div className="flex min-h-[calc(100vh-88px)] items-center justify-center bg-gradient-to-br from-rose-50 via-white to-emerald-50 px-5 dark:from-slate-950 dark:via-slate-900 dark:to-emerald-950">
        <div className="flex flex-col items-center gap-4 rounded-2xl border border-white/80 bg-white/90 px-10 py-8 shadow-2xl shadow-rose-100 dark:border-slate-700 dark:bg-slate-900/95 dark:shadow-slate-950">
          <FaSpinner className="animate-spin text-5xl text-rose-600 dark:text-rose-400" />

          <p className="text-sm font-bold uppercase tracking-widest text-slate-500 dark:text-slate-400">
            Loading collection
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-[calc(100vh-88px)] items-center justify-center bg-gradient-to-br from-rose-50 via-white to-emerald-50 px-5 dark:from-slate-950 dark:via-slate-900 dark:to-emerald-950">
        <h1 className="text-center text-3xl font-bold text-slate-900 dark:text-white">
          {error}
        </h1>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-white to-emerald-50 px-5 py-12 transition-colors dark:from-slate-950 dark:via-slate-900 dark:to-emerald-950 md:px-10">
      <div className="mx-auto max-w-7xl">
        {/* HEADING */}
        <div className="mb-10 flex flex-col gap-3">
          <p className="text-sm font-bold uppercase tracking-widest text-rose-600 dark:text-rose-400">
            Trendora picks
          </p>

          <h1 className="text-4xl font-extrabold text-slate-950 dark:text-white md:text-6xl">
            Shop Collection
          </h1>

          <div className="h-1.5 w-28 rounded-full bg-rose-600 dark:bg-rose-400" />

          <p className="max-w-2xl text-base text-slate-600 dark:text-slate-400">
            Explore fresh styles, everyday essentials, and wishlist-worthy finds
            curated for your next look.
          </p>
        </div>

        {/* FILTER SECTION */}
        <div className="mb-8 rounded-2xl border border-white/80 bg-white p-4 shadow-xl shadow-rose-100/70 dark:border-slate-700 dark:bg-slate-900 dark:shadow-slate-950">
          <div className="mb-4 flex flex-col gap-3 border-b border-slate-100 pb-4 dark:border-slate-800 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-full bg-rose-100 text-rose-600 dark:bg-rose-950 dark:text-rose-300">
                <FaSlidersH />
              </div>
              <div>
                <h2 className="text-lg font-extrabold text-slate-950 dark:text-white">
                  Find Your Fit
                </h2>
                <p className="text-sm font-medium text-slate-500 dark:text-slate-400">
                  {filteredProducts.length} of {products.length} products
                </p>
              </div>
            </div>

            {hasActiveFilters && (
              <button
                type="button"
                onClick={resetFilters}
                className="inline-flex items-center justify-center gap-2 rounded-full border border-rose-200 px-4 py-2 text-sm font-bold text-rose-600 transition hover:bg-rose-600 hover:text-white dark:border-rose-900 dark:text-rose-300 dark:hover:border-rose-600 dark:hover:bg-rose-600 dark:hover:text-white"
              >
                <FaTimes className="text-xs" />
                Clear Filters
              </button>
            )}
          </div>

          <div className="grid gap-4 lg:grid-cols-[minmax(0,1.5fr)_minmax(180px,0.7fr)_minmax(190px,0.8fr)]">
            {/* SEARCH */}
            <label className="group block">
              <span className="mb-2 block text-xs font-bold uppercase tracking-widest text-slate-500 dark:text-slate-400">
                Search
              </span>
              <div className="relative">
                <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 transition group-focus-within:text-rose-500" />

                <input
                  type="text"
                  placeholder="Search by product name"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="h-14 w-full rounded-xl border border-slate-200 bg-slate-50 py-3 pl-12 pr-4 text-sm font-semibold text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-rose-400 focus:bg-white focus:ring-4 focus:ring-rose-100 dark:border-slate-700 dark:bg-slate-950 dark:text-white dark:focus:border-rose-500 dark:focus:bg-slate-900 dark:focus:ring-rose-950"
                />
              </div>
            </label>

            {/* CATEGORY */}
            <label className="group block">
              <span className="mb-2 block text-xs font-bold uppercase tracking-widest text-slate-500 dark:text-slate-400">
                Category
              </span>
              <div className="relative">
                <FaFilter className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 transition group-focus-within:text-rose-500" />
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="h-14 w-full appearance-none rounded-xl border border-slate-200 bg-slate-50 py-3 pl-12 pr-10 text-sm font-semibold text-slate-800 outline-none transition focus:border-rose-400 focus:bg-white focus:ring-4 focus:ring-rose-100 dark:border-slate-700 dark:bg-slate-950 dark:text-white dark:focus:border-rose-500 dark:focus:bg-slate-900 dark:focus:ring-rose-950"
                >
                  {categories.map((cat) => (
                    <option key={cat}>{cat}</option>
                  ))}
                </select>
                <FaChevronDown className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-xs text-slate-400" />
              </div>
            </label>

            {/* SORT */}
            <label className="group block">
              <span className="mb-2 block text-xs font-bold uppercase tracking-widest text-slate-500 dark:text-slate-400">
                Sort
              </span>
              <div className="relative">
                <FaSortAmountDown className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 transition group-focus-within:text-rose-500" />
                <select
                  value={sort}
                  onChange={(e) => setSort(e.target.value)}
                  className="h-14 w-full appearance-none rounded-xl border border-slate-200 bg-slate-50 py-3 pl-12 pr-10 text-sm font-semibold text-slate-800 outline-none transition focus:border-rose-400 focus:bg-white focus:ring-4 focus:ring-rose-100 dark:border-slate-700 dark:bg-slate-950 dark:text-white dark:focus:border-rose-500 dark:focus:bg-slate-900 dark:focus:ring-rose-950"
                >
                  <option value="">Recommended</option>

                  <option value="low">Price: Low To High</option>

                  <option value="high">Price: High To Low</option>
                </select>
                <FaChevronDown className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-xs text-slate-400" />
              </div>
            </label>
          </div>
        </div>

        {/* EMPTY STATE */}
        {filteredProducts.length === 0 ? (
          <div className="flex flex-col items-center justify-center rounded-3xl border border-dashed border-slate-300 py-24 dark:border-slate-700">
            <h2 className="mb-3 text-3xl font-bold text-slate-800 dark:text-white">
              No Products Found
            </h2>

            <p className="text-slate-500 dark:text-slate-400">
              Try another search or category.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {filteredProducts.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Shop;
