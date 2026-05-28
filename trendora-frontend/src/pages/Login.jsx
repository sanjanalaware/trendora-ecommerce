import { useState } from "react";

import { useDispatch } from "react-redux";

import { useNavigate } from "react-router-dom";

import { FaEye, FaEyeSlash, FaSpinner } from "react-icons/fa";
import toast from "react-hot-toast";

import { loginUser } from "../services/authService";

import { setCredentials } from "../redux/slices/authSlice";

const Login = () => {
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isSubmitting) {
      return;
    }

    setIsSubmitting(true);

    try {
      const data = await loginUser(formData);

      dispatch(setCredentials(data));

      toast.success("Logged in successfully.");

      if (data.isAdmin) {
        navigate("/admin");
      } else {
        navigate("/");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Invalid credentials.");
    } finally {
      setIsSubmitting(false);
    }
  };
  return (
    <div className="flex min-h-[calc(100vh-88px)] items-center justify-center bg-gradient-to-br from-rose-50 via-white to-emerald-50 px-5 transition-colors dark:from-slate-950 dark:via-slate-900 dark:to-emerald-950">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md rounded-2xl border border-white/80 bg-white/95 p-8 shadow-2xl shadow-rose-100 transition-colors dark:border-slate-700 dark:bg-slate-900/95 dark:shadow-slate-950"
      >
        <div className="mb-8 text-center">
          <p className="mb-2 text-sm font-bold uppercase tracking-widest text-rose-600">
            Welcome back
          </p>
          <h1 className="text-4xl font-extrabold text-slate-950 dark:text-white">
            Login
          </h1>
          <p className="mt-3 text-sm text-slate-500 dark:text-slate-400">
            Continue shopping your favorite Trendora picks.
          </p>
        </div>

        <label className="mb-2 block text-sm font-semibold text-slate-700 dark:text-slate-200">
          Email
        </label>
        <input
          type="email"
          name="email"
          placeholder="you@example.com"
          value={formData.email}
          onChange={handleChange}
          disabled={isSubmitting}
          className="mb-5 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-rose-400 focus:bg-white focus:ring-4 focus:ring-rose-100 dark:border-slate-700 dark:bg-slate-800 dark:text-white dark:placeholder:text-slate-500 dark:focus:border-rose-500 dark:focus:bg-slate-800 dark:focus:ring-rose-950"
        />

        <label className="mb-2 block text-sm font-semibold text-slate-700 dark:text-slate-200">
          Password
        </label>
        <div className="relative mb-6">
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            placeholder="Enter your password"
            value={formData.password}
            onChange={handleChange}
            disabled={isSubmitting}
            className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 pr-12 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-rose-400 focus:bg-white focus:ring-4 focus:ring-rose-100 dark:border-slate-700 dark:bg-slate-800 dark:text-white dark:placeholder:text-slate-500 dark:focus:border-rose-500 dark:focus:bg-slate-800 dark:focus:ring-rose-950"
          />
          <button
            type="button"
            onClick={() => setShowPassword((value) => !value)}
            disabled={isSubmitting}
            className="absolute right-3 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full text-slate-500 transition hover:bg-rose-50 hover:text-rose-700 dark:text-slate-300 dark:hover:bg-slate-700 dark:hover:text-rose-300"
            aria-label={showPassword ? "Hide password" : "Show password"}
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </button>
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-slate-950 py-3 font-bold text-white shadow-lg shadow-slate-200 transition hover:bg-rose-700 disabled:cursor-not-allowed disabled:opacity-70 dark:bg-rose-600 dark:shadow-slate-950 dark:hover:bg-rose-500"
        >
          {isSubmitting && <FaSpinner className="animate-spin" />}
          {isSubmitting ? "Logging in..." : "Login"}
        </button>
      </form>
    </div>
  );
};

export default Login;
