import { useEffect, useState } from "react";

import { Link } from "react-router-dom";

import {
  FaArrowRight,
  FaCheckCircle,
  FaHeadset,
  FaLock,
  FaShippingFast,
  FaSpinner,
  FaTags,
} from "react-icons/fa";
import toast from "react-hot-toast";

import ProductCard from "../components/ProductCard";

import { getProducts } from "../services/productService";

const categories = [
  {
    title: "Hoodies",
    image: "https://images.unsplash.com/photo-1503341504253-dff4815485f1",
  },
  {
    title: "Shoes",
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff",
  },
  {
    title: "Jackets",
    image: "https://images.unsplash.com/photo-1523398002811-999ca8dec234",
  },
  {
    title: "Accessories",
    image: "https://images.unsplash.com/photo-1523170335258-f5ed11844a49",
  },
];

const benefits = [
  {
    title: "Fast Delivery",
    description: "Quick and secure delivery across the country.",
    icon: FaShippingFast,
  },
  {
    title: "Secure Payments",
    description: "Safe and encrypted payment experience.",
    icon: FaLock,
  },
  {
    title: "Best Offers",
    description: "Exclusive discounts on trending collections.",
    icon: FaTags,
  },
  {
    title: "24/7 Support",
    description: "Dedicated support for a smooth shopping experience.",
    icon: FaHeadset,
  },
];

const Home = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [email, setEmail] = useState("");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getProducts();

        setProducts(data.slice(0, 8));
      } catch (error) {
        toast.error(
          error.response?.data?.message || "Unable to load featured products.",
        );
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const newsletterHandler = (event) => {
    event.preventDefault();

    if (!email.trim()) {
      toast.error("Please enter your email address.");
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      toast.error("Please enter a valid email address.");
      return;
    }

    toast.success("You are subscribed to Trendora updates.");
    setEmail("");
  };

  if (loading) {
    return (
      <div className="flex min-h-[calc(100vh-88px)] items-center justify-center bg-gradient-to-br from-rose-50 via-white to-emerald-50 px-5 transition-colors dark:from-slate-950 dark:via-slate-900 dark:to-emerald-950">
        <div className="flex flex-col items-center gap-4 rounded-2xl border border-white/80 bg-white/90 px-10 py-8 shadow-2xl shadow-rose-100 dark:border-slate-700 dark:bg-slate-900/95 dark:shadow-slate-950">
          <FaSpinner className="animate-spin text-5xl text-rose-600 dark:text-rose-400" />
          <p className="text-sm font-bold uppercase tracking-widest text-slate-500 dark:text-slate-400">
            Loading Trendora
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-slate-950">
      <section className="relative overflow-hidden bg-slate-950 px-5 py-16 text-white md:px-10 lg:py-20">
        <img
          src="https://images.unsplash.com/photo-1529139574466-a303027c1d8b"
          alt="Fashion Banner"
          className="absolute inset-0 h-full w-full object-cover opacity-55"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/75 to-slate-950/15" />

        <div className="relative mx-auto grid max-w-7xl gap-12 lg:min-h-[620px] lg:grid-cols-[minmax(0,0.95fr)_minmax(360px,0.55fr)] lg:items-center">
          <div>
            <p className="mb-4 text-sm font-black uppercase tracking-[0.3em] text-rose-300">
              Trendora 2026
            </p>

            <h1 className="max-w-4xl text-5xl font-black leading-tight md:text-7xl">
              Modern fashion for everyday confidence
            </h1>

            <p className="mt-6 max-w-2xl text-lg font-medium text-slate-200">
              Discover premium streetwear, oversized essentials, refined
              basics, and statement pieces curated for your next look.
            </p>

            <div className="mt-10 flex flex-wrap gap-4">
              <Link
                to="/shop"
                className="inline-flex items-center gap-2 rounded-full bg-rose-600 px-7 py-4 text-sm font-bold text-white transition hover:bg-rose-500"
              >
                Shop Now
                <FaArrowRight />
              </Link>

              <Link
                to="/wishlist"
                className="rounded-full border border-white/40 px-7 py-4 text-sm font-bold text-white transition hover:border-white hover:bg-white/10"
              >
                View Wishlist
              </Link>
            </div>
          </div>

          <div className="grid gap-4 rounded-2xl border border-white/20 bg-white/10 p-5 shadow-2xl backdrop-blur md:grid-cols-3 lg:grid-cols-1">
            {["New drops weekly", "Free shipping", "Secure checkout"].map(
              (label) => (
                <div key={label} className="flex items-center gap-3">
                  <FaCheckCircle className="text-rose-300" />
                  <span className="text-sm font-bold">{label}</span>
                </div>
              ),
            )}
          </div>
        </div>
      </section>

      <section className="px-5 py-20 md:px-10">
        <div className="mx-auto max-w-7xl">
          <div className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-sm font-black uppercase tracking-[0.3em] text-rose-600 dark:text-rose-400">
                Featured
              </p>

              <h2 className="mt-3 text-4xl font-black text-slate-950 dark:text-white">
                Trending Products
              </h2>
            </div>

            <Link
              to="/shop"
              className="inline-flex items-center gap-2 text-sm font-bold text-rose-600 hover:text-rose-500"
            >
              View All
              <FaArrowRight className="text-xs" />
            </Link>
          </div>

          {products.length === 0 ? (
            <div className="flex min-h-72 items-center justify-center rounded-2xl border border-dashed border-slate-300 text-center dark:border-slate-700">
              <p className="text-lg font-bold text-slate-600 dark:text-slate-300">
                Featured products will appear here soon.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
              {products.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
            </div>
          )}
        </div>
      </section>

      <section className="bg-slate-50 px-5 py-20 dark:bg-slate-900 md:px-10">
        <div className="mx-auto max-w-7xl">
          <div className="mb-12 text-center">
            <p className="text-sm font-black uppercase tracking-[0.3em] text-rose-600 dark:text-rose-400">
              Categories
            </p>

            <h2 className="mt-4 text-4xl font-black text-slate-950 dark:text-white">
              Shop By Category
            </h2>
          </div>

          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {categories.map((category) => (
              <Link
                to="/shop"
                key={category.title}
                className="group relative block overflow-hidden rounded-2xl shadow-xl shadow-slate-200/70 dark:shadow-slate-950"
              >
                <img
                  src={category.image}
                  alt={category.title}
                  className="h-[390px] w-full object-cover transition duration-500 group-hover:scale-110"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                <div className="absolute bottom-6 left-6 right-6">
                  <h3 className="text-3xl font-black text-white">
                    {category.title}
                  </h3>
                  <p className="mt-2 inline-flex items-center gap-2 text-sm font-bold text-rose-100">
                    Explore
                    <FaArrowRight className="text-xs" />
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="px-5 py-20 md:px-10">
        <div className="mx-auto grid max-w-7xl overflow-hidden rounded-2xl bg-slate-950 text-white shadow-2xl lg:grid-cols-[minmax(0,0.8fr)_minmax(360px,0.6fr)]">
          <div className="px-8 py-16 md:px-12">
            <p className="text-sm font-black uppercase tracking-[0.3em] text-rose-300">
              Limited Offer
            </p>

            <h2 className="mt-5 text-5xl font-black">Flat 50% Off</h2>

            <p className="mt-4 max-w-xl text-lg text-slate-300">
              Upgrade your wardrobe with fresh styles, premium textures, and
              everyday pieces designed to last beyond the season.
            </p>

            <Link
              to="/shop"
              className="mt-10 inline-flex items-center gap-2 rounded-full bg-white px-8 py-4 text-sm font-black text-slate-950 transition hover:bg-rose-100"
            >
              Shop Sale
              <FaArrowRight className="text-xs" />
            </Link>
          </div>

          <img
            src="https://images.unsplash.com/photo-1483985988355-763728e1935b"
            alt="Sale collection"
            className="h-80 w-full object-cover lg:h-full"
          />
        </div>
      </section>

      <section className="bg-slate-50 px-5 py-20 dark:bg-slate-900 md:px-10">
        <div className="mx-auto max-w-7xl">
          <div className="mb-14 text-center">
            <p className="text-sm font-black uppercase tracking-[0.3em] text-rose-600 dark:text-rose-400">
              Why Trendora
            </p>

            <h2 className="mt-4 text-4xl font-black text-slate-950 dark:text-white">
              Premium Shopping Experience
            </h2>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {benefits.map((benefit) => {
              const Icon = benefit.icon;

              return (
                <div
                  key={benefit.title}
                  className="rounded-2xl bg-white p-8 shadow-xl shadow-slate-200/70 transition hover:-translate-y-1 dark:bg-slate-800 dark:shadow-slate-950"
                >
                  <div className="flex h-14 w-14 items-center justify-center rounded-full bg-rose-100 text-2xl text-rose-600 dark:bg-rose-950 dark:text-rose-300">
                    <Icon />
                  </div>

                  <h3 className="mt-6 text-2xl font-black text-slate-950 dark:text-white">
                    {benefit.title}
                  </h3>

                  <p className="mt-3 text-slate-600 dark:text-slate-400">
                    {benefit.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="px-5 py-20 md:px-10">
        <form
          onSubmit={newsletterHandler}
          className="mx-auto max-w-4xl rounded-2xl bg-slate-950 px-8 py-16 text-center shadow-2xl dark:bg-slate-900 md:px-10"
        >
          <p className="text-sm font-black uppercase tracking-[0.3em] text-rose-400">
            Newsletter
          </p>

          <h2 className="mt-5 text-4xl font-black text-white">
            Stay Updated With Trendora
          </h2>

          <p className="mt-4 text-slate-400">
            Get the latest fashion drops, exclusive offers, and seasonal
            collections directly to your inbox.
          </p>

          <div className="mt-10 flex flex-col gap-4 sm:flex-row">
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              className="h-14 flex-1 rounded-full border border-slate-700 bg-slate-800 px-6 text-white outline-none transition placeholder:text-slate-500 focus:border-rose-400 focus:ring-4 focus:ring-rose-950"
            />

            <button
              type="submit"
              className="rounded-full bg-rose-600 px-8 py-4 font-bold text-white transition hover:bg-rose-500"
            >
              Subscribe
            </button>
          </div>
        </form>
      </section>
    </div>
  );
};

export default Home;
