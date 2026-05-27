import { useEffect, useState } from "react";

import { FaSpinner } from "react-icons/fa";

import ProductCard from "../components/ProductCard";

import { getProducts } from "../services/productService";

const Shop = () => {
  const [products, setProducts] = useState([]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getProducts();

        setProducts(data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

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

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-white to-emerald-50 px-5 py-12 transition-colors dark:from-slate-950 dark:via-slate-900 dark:to-emerald-950 md:px-10">
      <div className="mx-auto max-w-7xl">
        <div className="mb-10 flex flex-col gap-3">
          <p className="text-sm font-bold uppercase tracking-widest text-rose-600 dark:text-rose-400">
            Trendora picks
          </p>
          <h1 className="text-4xl font-extrabold text-slate-950 dark:text-white md:text-6xl">
            Shop Collection
          </h1>
          <div className="h-1.5 w-28 rounded-full bg-rose-600 dark:bg-rose-400" />
          <p className="max-w-2xl text-base text-slate-600 dark:text-slate-400">
            Explore fresh styles, everyday essentials, and wishlist-worthy
            finds curated for your next look.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {products.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Shop;
