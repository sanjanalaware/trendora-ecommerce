import { useEffect, useMemo, useState } from "react";

import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import {
  FaBoxOpen,
  FaCalendarAlt,
  FaMoneyBillWave,
  FaShoppingBag,
  FaSpinner,
  FaTruck,
} from "react-icons/fa";
import toast from "react-hot-toast";

import { getMyOrders } from "../services/orderService";

const statusStyles = {
  Pending: "bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-300",
  Processing: "bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-300",
  Shipped:
    "bg-indigo-100 text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300",
  Delivered:
    "bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300",
  Cancelled: "bg-rose-100 text-rose-700 dark:bg-rose-950 dark:text-rose-300",
};

const formatDate = (value) => {
  if (!value) {
    return "Recently";
  }

  return new Intl.DateTimeFormat("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(new Date(value));
};

const MyOrders = () => {
  const navigate = useNavigate();
  const { userInfo } = useSelector((state) => state.auth);

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!userInfo?.token) {
      toast.error("Please login to view your orders.");
      navigate("/login", { replace: true });
      return;
    }

    const fetchOrders = async () => {
      try {
        const data = await getMyOrders(userInfo.token);
        setOrders(data);
      } catch (error) {
        toast.error(error.response?.data?.message || "Unable to load orders.");
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [navigate, userInfo]);

  const totalSpent = useMemo(() => {
    return orders.reduce(
      (total, order) => total + Number(order.totalAmount || 0),
      0,
    );
  }, [orders]);

  if (loading) {
    return (
      <div className="flex min-h-[calc(100vh-88px)] items-center justify-center bg-gradient-to-br from-rose-50 via-white to-emerald-50 px-5 transition-colors dark:from-slate-950 dark:via-slate-900 dark:to-emerald-950">
        <div className="flex flex-col items-center gap-4 rounded-2xl border border-white/80 bg-white/90 px-10 py-8 shadow-2xl shadow-rose-100 dark:border-slate-700 dark:bg-slate-900/95 dark:shadow-slate-950">
          <FaSpinner className="animate-spin text-5xl text-rose-600 dark:text-rose-300" />
          <p className="text-sm font-bold uppercase tracking-widest text-slate-500 dark:text-slate-400">
            Loading orders
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-white to-emerald-50 px-5 py-12 transition-colors dark:from-slate-950 dark:via-slate-900 dark:to-emerald-950 md:px-10">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.3em] text-rose-600 dark:text-rose-300">
              Account
            </p>
            <h1 className="mt-3 text-4xl font-black text-slate-950 dark:text-white md:text-6xl">
              My Orders
            </h1>
            <p className="mt-3 max-w-2xl text-slate-600 dark:text-slate-400">
              Track your Cash on Delivery orders and check the current order
              status from your account.
            </p>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            <div className="rounded-2xl border border-white/80 bg-white p-5 shadow-xl shadow-rose-100/70 dark:border-slate-700 dark:bg-slate-900 dark:shadow-slate-950">
              <p className="text-xs font-black uppercase tracking-widest text-slate-500">
                Orders
              </p>
              <p className="mt-2 text-3xl font-black text-slate-950 dark:text-white">
                {orders.length}
              </p>
            </div>
            <div className="rounded-2xl border border-white/80 bg-white p-5 shadow-xl shadow-rose-100/70 dark:border-slate-700 dark:bg-slate-900 dark:shadow-slate-950">
              <p className="text-xs font-black uppercase tracking-widest text-slate-500">
                Total
              </p>
              <p className="mt-2 text-3xl font-black text-slate-950 dark:text-white">
                Rs. {totalSpent}
              </p>
            </div>
          </div>
        </div>

        {orders.length === 0 ? (
          <div className="flex min-h-[420px] flex-col items-center justify-center rounded-2xl border border-dashed border-rose-200 bg-white/85 px-6 py-16 text-center shadow-xl shadow-rose-100/70 dark:border-slate-700 dark:bg-slate-900/85 dark:shadow-slate-950">
            <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-rose-100 text-3xl text-rose-600 dark:bg-rose-950 dark:text-rose-300">
              <FaShoppingBag />
            </div>
            <h2 className="text-3xl font-extrabold text-slate-950 dark:text-white">
              No orders yet
            </h2>
            <p className="mt-3 max-w-md text-slate-600 dark:text-slate-400">
              Buy a product with Cash on Delivery and your order status will
              appear here.
            </p>
            <Link
              to="/shop"
              className="mt-8 inline-flex items-center gap-2 rounded-full bg-slate-950 px-6 py-3 text-sm font-bold text-white transition hover:bg-rose-700 dark:bg-rose-600 dark:hover:bg-rose-500"
            >
              Start Shopping
            </Link>
          </div>
        ) : (
          <div className="grid gap-5">
            {orders.map((order) => {
              const status = order.status || "Pending";
              const products = order.products || [];

              return (
                <article
                  key={order._id}
                  className="overflow-hidden rounded-2xl border border-white/80 bg-white shadow-xl shadow-rose-100/70 dark:border-slate-700 dark:bg-slate-900 dark:shadow-slate-950"
                >
                  <div className="flex flex-col gap-4 border-b border-slate-100 bg-slate-50 p-5 dark:border-slate-800 dark:bg-slate-950 sm:flex-row sm:items-center sm:justify-between">
                    <div className="min-w-0">
                      <p className="text-xs font-black uppercase tracking-widest text-slate-500 dark:text-slate-400">
                        Order ID
                      </p>
                      <p className="mt-1 truncate font-mono text-sm font-bold text-slate-950 dark:text-white">
                        {order._id}
                      </p>
                    </div>

                    <span
                      className={`inline-flex w-fit items-center gap-2 rounded-full px-4 py-2 text-sm font-black ${
                        statusStyles[status] || statusStyles.Pending
                      }`}
                    >
                      <FaTruck className="text-xs" />
                      {status}
                    </span>
                  </div>

                  <div className="grid gap-5 p-5 lg:grid-cols-[minmax(0,1fr)_260px]">
                    <div className="space-y-3">
                      {products.map((product) => (
                        <div
                          key={product._id || product.productId}
                          className="flex items-center gap-4 rounded-xl border border-slate-100 bg-white p-4 dark:border-slate-800 dark:bg-slate-950"
                        >
                          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-rose-100 text-rose-600 dark:bg-rose-950 dark:text-rose-300">
                            <FaBoxOpen />
                          </div>
                          <div className="min-w-0 flex-1">
                            <h3 className="line-clamp-1 font-extrabold text-slate-950 dark:text-white">
                              {product.name || "Product"}
                            </h3>
                            <p className="mt-1 text-sm font-semibold text-slate-500 dark:text-slate-400">
                              Qty {product.qty || 1} x Rs. {product.price || 0}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="rounded-xl border border-slate-100 bg-slate-50 p-5 dark:border-slate-800 dark:bg-slate-950">
                      <div className="flex items-center gap-3 text-slate-600 dark:text-slate-400">
                        <FaCalendarAlt className="text-rose-600 dark:text-rose-300" />
                        <span className="text-sm font-bold">
                          {formatDate(order.createdAt)}
                        </span>
                      </div>
                      <div className="mt-4 flex items-center gap-3 text-slate-600 dark:text-slate-400">
                        <FaMoneyBillWave className="text-emerald-600 dark:text-emerald-300" />
                        <span className="text-sm font-bold">
                          Cash on Delivery
                        </span>
                      </div>
                      <div className="mt-5 border-t border-slate-200 pt-5 dark:border-slate-800">
                        <p className="text-xs font-black uppercase tracking-widest text-slate-500">
                          Total
                        </p>
                        <p className="mt-2 text-3xl font-black text-slate-950 dark:text-white">
                          Rs. {order.totalAmount}
                        </p>
                      </div>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyOrders;
