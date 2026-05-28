import { useEffect, useMemo, useState } from "react";

import {
  FaCalendarAlt,
  FaClipboardList,
  FaEnvelope,
  FaMoneyBillWave,
  FaSpinner,
  FaTruck,
  FaUser,
} from "react-icons/fa";
import toast from "react-hot-toast";

import { getAllOrders, updateOrderStatus } from "../../services/orderService";

const orderStatuses = [
  "Pending",
  "Processing",
  "Shipped",
  "Delivered",
  "Cancelled",
];

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

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [updatingOrderId, setUpdatingOrderId] = useState("");

  const userInfo = JSON.parse(localStorage.getItem("userInfo"));

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const data = await getAllOrders(userInfo?.token);
        setOrders(data);
      } catch (error) {
        toast.error(error.response?.data?.message || "Unable to load orders.");
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [userInfo?.token]);

  const totalRevenue = useMemo(() => {
    return orders.reduce(
      (total, order) => total + Number(order.totalAmount || 0),
      0,
    );
  }, [orders]);

  const handleStatusChange = async (id, status) => {
    setUpdatingOrderId(id);

    try {
      const updatedOrder = await updateOrderStatus(id, status, userInfo?.token);

      setOrders((prev) =>
        prev.map((order) =>
          order._id === id
            ? {
                ...order,
                ...updatedOrder,
                user: updatedOrder.user || order.user,
              }
            : order,
        ),
      );
      toast.success("Order status updated.");
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Unable to update order status.",
      );
    } finally {
      setUpdatingOrderId("");
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="text-sm font-black uppercase tracking-[0.25em] text-rose-600 dark:text-rose-300">
            Fulfillment
          </p>
          <h1 className="mt-2 text-4xl font-black text-slate-950 dark:text-white">
            Orders
          </h1>
          <p className="mt-2 max-w-2xl text-sm text-slate-600 dark:text-slate-400">
            Review customer orders, payment type, products, totals, and update
            delivery status from one place.
          </p>
        </div>

        <div className="grid gap-3 sm:grid-cols-2">
          <div className="rounded-2xl border border-white bg-white p-5 shadow-xl shadow-slate-200/70 dark:border-slate-800 dark:bg-slate-900 dark:shadow-slate-950">
            <p className="text-xs font-black uppercase tracking-widest text-slate-500">
              Orders
            </p>
            <p className="mt-2 text-3xl font-black text-slate-950 dark:text-white">
              {orders.length}
            </p>
          </div>
          <div className="rounded-2xl border border-white bg-white p-5 shadow-xl shadow-slate-200/70 dark:border-slate-800 dark:bg-slate-900 dark:shadow-slate-950">
            <p className="text-xs font-black uppercase tracking-widest text-slate-500">
              Revenue
            </p>
            <p className="mt-2 text-3xl font-black text-slate-950 dark:text-white">
              Rs. {totalRevenue}
            </p>
          </div>
        </div>
      </div>

      <div className="overflow-hidden rounded-2xl border border-white bg-white shadow-xl shadow-slate-200/70 dark:border-slate-800 dark:bg-slate-900 dark:shadow-slate-950">
        {loading ? (
          <div className="flex min-h-80 items-center justify-center">
            <FaSpinner className="animate-spin text-5xl text-rose-600 dark:text-rose-300" />
          </div>
        ) : orders.length === 0 ? (
          <div className="flex min-h-80 flex-col items-center justify-center p-8 text-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-rose-100 text-2xl text-rose-600 dark:bg-rose-950 dark:text-rose-300">
              <FaClipboardList />
            </div>
            <h2 className="mt-5 text-2xl font-black text-slate-950 dark:text-white">
              No orders found
            </h2>
            <p className="mt-2 text-slate-600 dark:text-slate-400">
              Customer orders will appear here once purchases are placed.
            </p>
          </div>
        ) : (
          <div className="grid gap-4 p-4">
            {orders.map((order) => {
              const status = order.status || "Pending";
              const products = order.products || [];

              return (
                <article
                  key={order._id}
                  className="rounded-2xl border border-slate-100 bg-slate-50 p-4 transition hover:border-rose-200 dark:border-slate-800 dark:bg-slate-950 dark:hover:border-rose-900"
                >
                  <div className="flex flex-col gap-4 xl:flex-row xl:items-start xl:justify-between">
                    <div className="min-w-0">
                      <div className="flex flex-wrap items-center gap-3">
                        <span
                          className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-black ${
                            statusStyles[status] || statusStyles.Pending
                          }`}
                        >
                          <FaTruck className="text-xs" />
                          {status}
                        </span>
                        <span className="font-mono text-xs font-bold text-slate-500 dark:text-slate-400">
                          #{order._id}
                        </span>
                      </div>

                      <div className="mt-4 grid gap-3 sm:grid-cols-2">
                        <p className="flex items-center gap-2 text-sm font-semibold text-slate-600 dark:text-slate-400">
                          <FaUser className="text-rose-600 dark:text-rose-300" />
                          {order.user?.name || "Customer"}
                        </p>
                        <p className="flex items-center gap-2 text-sm font-semibold text-slate-600 dark:text-slate-400">
                          <FaEnvelope className="text-rose-600 dark:text-rose-300" />
                          {order.user?.email || "No email"}
                        </p>
                        <p className="flex items-center gap-2 text-sm font-semibold text-slate-600 dark:text-slate-400">
                          <FaCalendarAlt className="text-rose-600 dark:text-rose-300" />
                          {formatDate(order.createdAt)}
                        </p>
                        <p className="flex items-center gap-2 text-sm font-semibold text-slate-600 dark:text-slate-400">
                          <FaMoneyBillWave className="text-emerald-600 dark:text-emerald-300" />
                          Cash on Delivery
                        </p>
                      </div>
                    </div>

                    <div className="w-full shrink-0 xl:w-64">
                      <label className="block">
                        <span className="mb-2 block text-xs font-black uppercase tracking-widest text-slate-500 dark:text-slate-400">
                          Update Status
                        </span>
                        <select
                          value={status}
                          disabled={updatingOrderId === order._id}
                          onChange={(event) =>
                            handleStatusChange(order._id, event.target.value)
                          }
                          className="h-12 w-full cursor-pointer rounded-xl border border-slate-200 bg-white px-4 text-sm font-bold text-slate-900 outline-none transition focus:border-rose-400 focus:ring-4 focus:ring-rose-100 disabled:cursor-not-allowed disabled:opacity-70 dark:border-slate-700 dark:bg-slate-900 dark:text-white dark:focus:border-rose-500 dark:focus:ring-rose-950"
                        >
                          {orderStatuses.map((item) => (
                            <option key={item} value={item}>
                              {item}
                            </option>
                          ))}
                        </select>
                      </label>
                    </div>
                  </div>

                  <div className="mt-5 grid gap-4 lg:grid-cols-[minmax(0,1fr)_220px]">
                    <div className="grid gap-3">
                      {products.map((product) => (
                        <div
                          key={product._id || product.productId}
                          className="rounded-xl border border-slate-100 bg-white p-4 dark:border-slate-800 dark:bg-slate-900"
                        >
                          <p className="font-extrabold text-slate-950 dark:text-white">
                            {product.name || "Product"}
                          </p>
                          <p className="mt-1 text-sm font-semibold text-slate-500 dark:text-slate-400">
                            Qty {product.qty || 1} x Rs. {product.price || 0}
                          </p>
                        </div>
                      ))}
                    </div>

                    <div className="rounded-xl border border-slate-100 bg-white p-4 dark:border-slate-800 dark:bg-slate-900">
                      <p className="text-xs font-black uppercase tracking-widest text-slate-500">
                        Total Amount
                      </p>
                      <p className="mt-2 text-3xl font-black text-slate-950 dark:text-white">
                        Rs. {order.totalAmount}
                      </p>
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

export default AdminOrders;
