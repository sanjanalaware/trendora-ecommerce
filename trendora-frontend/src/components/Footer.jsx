import { useState } from "react";

import { Link } from "react-router-dom";

import {
  FaArrowRight,
  FaEnvelope,
  FaFacebookF,
  FaInstagram,
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaPinterestP,
  FaTwitter,
} from "react-icons/fa";
import toast from "react-hot-toast";

const socialLinks = [
  { label: "Instagram", icon: FaInstagram },
  { label: "Facebook", icon: FaFacebookF },
  { label: "Twitter", icon: FaTwitter },
  { label: "Pinterest", icon: FaPinterestP },
];

const quickLinks = [
  { label: "Home", to: "/" },
  { label: "Shop", to: "/shop" },
  { label: "Cart", to: "/cart" },
  { label: "Wishlist", to: "/wishlist" },
];

const supportLinks = ["Contact Us", "FAQs", "Shipping Policy", "Return Policy"];

const Footer = () => {
  const [email, setEmail] = useState("");

  const subscribeHandler = (event) => {
    event.preventDefault();

    if (!email.trim()) {
      toast.error("Please enter your email address.");
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      toast.error("Please enter a valid email address.");
      return;
    }

    toast.success("Thanks for subscribing to Trendora.");
    setEmail("");
  };

  return (
    <footer className="bg-slate-950 px-5 pt-16 text-white md:px-10">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-10 rounded-2xl border border-white/10 bg-white/[0.04] p-6 shadow-2xl shadow-slate-950 md:grid-cols-[minmax(0,1.1fr)_minmax(280px,0.9fr)] md:p-8">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.3em] text-rose-300">
              Stay in style
            </p>
            <h2 className="mt-3 text-3xl font-black md:text-4xl">
              Get new drops, private offers, and style edits.
            </h2>
          </div>

          <form onSubmit={subscribeHandler} className="flex flex-col gap-3">
            <div className="relative">
              <FaEnvelope className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-500" />
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                className="h-14 w-full rounded-full border border-slate-700 bg-slate-900 pl-12 pr-5 text-sm text-white outline-none transition placeholder:text-slate-500 focus:border-rose-400 focus:ring-4 focus:ring-rose-950"
              />
            </div>
            <button
              type="submit"
              className="inline-flex h-14 items-center justify-center gap-2 rounded-full bg-rose-600 px-6 text-sm font-bold text-white transition hover:bg-rose-500"
            >
              Subscribe
              <FaArrowRight className="text-xs" />
            </button>
          </form>
        </div>

        <div className="grid gap-12 py-14 md:grid-cols-2 lg:grid-cols-[minmax(0,1.25fr)_0.7fr_0.8fr_1fr]">
          <div>
            <Link
              to="/"
              className="text-3xl font-extrabold tracking-normal text-white"
            >
              Tren<span className="text-rose-500">dora</span>
            </Link>

            <p className="mt-5 max-w-sm text-sm leading-7 text-slate-400">
              A modern fashion destination for premium streetwear, everyday
              essentials, and collections curated for every season.
            </p>

            <div className="mt-6 flex items-center gap-3">
              {socialLinks.map((item) => {
                const Icon = item.icon;

                return (
                  <a
                    key={item.label}
                    href="#"
                    aria-label={item.label}
                    className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-900 text-slate-300 transition hover:bg-rose-600 hover:text-white"
                  >
                    <Icon />
                  </a>
                );
              })}
            </div>
          </div>

          <div>
            <h3 className="text-sm font-black uppercase tracking-widest text-white">
              Quick Links
            </h3>

            <ul className="mt-6 space-y-4 text-sm text-slate-400">
              {quickLinks.map((link) => (
                <li key={link.to}>
                  <Link to={link.to} className="transition hover:text-rose-300">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-black uppercase tracking-widest text-white">
              Customer Support
            </h3>

            <ul className="mt-6 space-y-4 text-sm text-slate-400">
              {supportLinks.map((link) => (
                <li key={link}>
                  <button
                    type="button"
                    onClick={() => toast("Support pages are coming soon.")}
                    className="transition hover:text-rose-300"
                  >
                    {link}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-black uppercase tracking-widest text-white">
              Contact
            </h3>

            <div className="mt-6 space-y-4 text-sm text-slate-400">
              <p className="flex items-center gap-3">
                <FaMapMarkerAlt className="text-rose-400" />
                Hadapsar pune, India
              </p>
              <p className="flex items-center gap-3">
                <FaEnvelope className="text-rose-400" />
                support@trendora.com
              </p>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-3 border-t border-slate-800 py-6 text-sm text-slate-500 sm:flex-row sm:items-center sm:justify-between">
          <p>Copyright 2026 Trendora. All rights reserved.</p>
          <div className="flex gap-5">
            <button
              type="button"
              onClick={() => toast("Privacy policy page is coming soon.")}
              className="transition hover:text-rose-300"
            >
              Privacy
            </button>
            <button
              type="button"
              onClick={() => toast("Terms page is coming soon.")}
              className="transition hover:text-rose-300"
            >
              Terms
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
