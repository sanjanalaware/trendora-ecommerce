import { useState } from "react";

import { Link, NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import {
  FaBars,
  FaMoon,
  FaSignOutAlt,
  FaSun,
  FaTimes,
  FaUserCircle,
} from "react-icons/fa";
import toast from "react-hot-toast";

import { logout } from "../redux/slices/authSlice";

const navLinks = [
  { label: "Home", to: "/" },
  { label: "Shop", to: "/shop" },
  { label: "Cart", to: "/cart" },
  { label: "Wishlist", to: "/wishlist" },
  { label: "My Orders", to: "/my-orders" },
];

const Navbar = ({ isDarkMode, onToggleTheme }) => {
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.auth);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const userName =
    userInfo?.name || userInfo?.user?.name || userInfo?.email || "User";
  const greetingName = userInfo ? userName : "user";

  const linkClass = ({ isActive }) =>
    `rounded-full px-4 py-2 text-sm font-semibold transition md:inline-flex ${
      isActive
        ? "bg-rose-600 text-white shadow-sm"
        : "text-slate-700 hover:bg-rose-50 hover:text-rose-700 dark:text-slate-200 dark:hover:bg-slate-800 dark:hover:text-rose-300"
    }`;

  const registerClass = ({ isActive }) =>
    `rounded-full px-5 py-2 text-sm font-bold transition ${
      isActive
        ? "bg-slate-950 text-white shadow-sm dark:bg-white dark:text-slate-950"
        : "bg-slate-950 text-white shadow-sm hover:bg-rose-700 dark:bg-white dark:text-slate-950 dark:hover:bg-rose-100"
    }`;

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const toggleTheme = () => {
    onToggleTheme();
    closeMenu();
  };

  const logoutHandler = () => {
    dispatch(logout());
    closeMenu();
    toast.success("Logged out successfully.");
  };

  return (
    <nav className="sticky top-0 z-50 border-b border-rose-100 bg-white/95 shadow-sm backdrop-blur transition-colors dark:border-slate-800 dark:bg-slate-950/95">
      <div className="border-b border-rose-100 bg-gradient-to-r from-rose-50 via-white to-emerald-50 px-5 py-2 dark:border-slate-800 dark:from-slate-950 dark:via-slate-900 dark:to-emerald-950 md:px-10">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4">
          <div className="flex min-w-0 items-center gap-2 text-sm font-bold text-slate-700 dark:text-slate-200">
            <FaUserCircle className="shrink-0 text-lg text-rose-600 dark:text-rose-300" />
            <span className="truncate">
              Hi,{" "}
              <span className="font-extrabold text-slate-950 dark:text-white">
                {greetingName}
              </span>
            </span>
          </div>

          {userInfo && (
            <button
              type="button"
              onClick={logoutHandler}
              className="cursor-pointer hidden items-center gap-2 rounded-full bg-slate-950 px-4 py-2 text-xs font-bold text-white shadow-sm transition hover:bg-rose-700 dark:bg-rose-600 dark:hover:bg-rose-500 md:inline-flex"
            >
              <FaSignOutAlt className="text-xs" />
              Logout
            </button>
          )}
        </div>
      </div>

      <div className="px-5 py-4 md:px-10">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4">
          <Link
            to="/"
            onClick={closeMenu}
            className="text-3xl font-extrabold tracking-normal text-slate-950 transition-colors dark:text-white"
          >
            Tren<span className="text-rose-600">dora</span>
          </Link>

          <div className="hidden items-center gap-2 md:flex">
            {navLinks.map((link) => (
              <NavLink key={link.to} to={link.to} className={linkClass}>
                {link.label}
              </NavLink>
            ))}

            {!userInfo && (
              <>
                <NavLink to="/login" className={linkClass}>
                  Login
                </NavLink>

                <NavLink to="/register" className={registerClass}>
                  Register
                </NavLink>
              </>
            )}

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

          <button
            type="button"
            onClick={() => setIsMenuOpen((current) => !current)}
            className="cursor-pointer flex h-11 w-11 items-center justify-center rounded-full border border-rose-100 bg-white text-slate-800 shadow-sm transition hover:border-rose-200 hover:bg-rose-50 dark:border-slate-700 dark:bg-slate-900 dark:text-white dark:hover:bg-slate-800 md:hidden"
            aria-label={
              isMenuOpen ? "Close navigation menu" : "Open navigation menu"
            }
            aria-expanded={isMenuOpen}
          >
            {isMenuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>

        {isMenuOpen && (
          <div className="mx-auto mt-4 grid max-w-7xl gap-2 border-t border-rose-100 pt-4 dark:border-slate-800 md:hidden">
            <div className="mb-2 flex items-center gap-3 rounded-2xl border border-rose-100 bg-rose-50 p-4 shadow-sm dark:border-slate-700 dark:bg-slate-900">
              <FaUserCircle className="shrink-0 text-3xl text-rose-600 dark:text-rose-300" />
              <div className="min-w-0">
                <p className="text-xs font-black uppercase tracking-widest text-rose-600 dark:text-rose-300">
                  {userInfo ? "Logged in" : "Welcome"}
                </p>
                <p className="truncate text-lg font-extrabold text-slate-950 dark:text-white">
                  Hi, {greetingName}
                </p>
              </div>
            </div>

            {navLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                onClick={closeMenu}
                className={linkClass}
              >
                {link.label}
              </NavLink>
            ))}

            {!userInfo && (
              <>
                <NavLink to="/login" onClick={closeMenu} className={linkClass}>
                  Login
                </NavLink>

                <NavLink
                  to="/register"
                  onClick={closeMenu}
                  className={registerClass}
                >
                  Register
                </NavLink>
              </>
            )}

            <button
              type="button"
              onClick={toggleTheme}
              className="mt-2 inline-flex items-center justify-center gap-2 rounded-full border border-rose-100 bg-white px-5 py-3 text-sm font-bold text-slate-700 shadow-sm transition hover:border-rose-200 hover:bg-rose-50 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800"
            >
              {isDarkMode ? <FaSun /> : <FaMoon />}
              {isDarkMode ? "Light Mode" : "Dark Mode"}
            </button>

            {userInfo && (
              <button
                type="button"
                onClick={logoutHandler}
                className="cursor-pointer mt-2 inline-flex w-full items-center justify-center gap-2 rounded-full bg-slate-950 px-5 py-3 text-sm font-bold text-white transition hover:bg-rose-700 dark:bg-rose-600 dark:hover:bg-rose-500"
              >
                <FaSignOutAlt className="text-xs" />
                Logout
              </button>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
