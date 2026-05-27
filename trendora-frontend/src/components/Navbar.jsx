import { Link, NavLink } from "react-router-dom";

import { FaMoon, FaSun } from "react-icons/fa";

const Navbar = ({ isDarkMode, onToggleTheme }) => {
  const linkClass = ({ isActive }) =>
    `rounded-full px-4 py-2 text-sm font-semibold transition ${
      isActive
        ? "bg-rose-600 text-white shadow-sm"
        : "text-slate-700 hover:bg-rose-50 hover:text-rose-700 dark:text-slate-200 dark:hover:bg-slate-800 dark:hover:text-rose-300"
    }`;

  return (
    <nav className="sticky top-0 z-50 border-b border-rose-100 bg-white/90 px-5 py-4 shadow-sm backdrop-blur transition-colors dark:border-slate-800 dark:bg-slate-950/90 md:px-10">
      <div className="mx-auto flex max-w-7xl flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <Link
          to="/"
          className="text-3xl font-extrabold tracking-normal text-slate-950 transition-colors dark:text-white"
        >
          Tren<span className="text-rose-600">dora</span>
        </Link>

        <div className="flex flex-wrap items-center gap-2">
          <NavLink to="/" className={linkClass}>
            Home
          </NavLink>
          <NavLink to="/shop" className={linkClass}>
            Shop
          </NavLink>

          <NavLink to="/cart" className={linkClass}>
            Cart
          </NavLink>

          <NavLink to="/wishlist" className={linkClass}>
            Wishlist
          </NavLink>

          <NavLink to="/login" className={linkClass}>
            Login
          </NavLink>

          <NavLink
            to="/register"
            className={({ isActive }) =>
              `rounded-full px-5 py-2 text-sm font-bold transition ${
                isActive
                  ? "bg-slate-950 text-white shadow-sm"
                  : "bg-slate-950 text-white shadow-sm hover:bg-rose-700 dark:bg-white dark:text-slate-950 dark:hover:bg-rose-100"
              }`
            }
          >
            Register
          </NavLink>

          <button
            type="button"
            onClick={onToggleTheme}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-rose-100 bg-white text-amber-500 shadow-sm transition hover:border-rose-200 hover:bg-rose-50 dark:border-slate-700 dark:bg-slate-900 dark:text-cyan-300 dark:hover:bg-slate-800"
            aria-label={
              isDarkMode ? "Switch to light theme" : "Switch to dark theme"
            }
          >
            {isDarkMode ? <FaSun /> : <FaMoon />}
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
