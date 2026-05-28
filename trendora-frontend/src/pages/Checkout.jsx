import { useEffect, useMemo, useState } from "react";

import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import {
  FaArrowLeft,
  FaBoxOpen,
  FaCheckCircle,
  FaMoneyBillWave,
  FaSpinner,
  FaTruck,
} from "react-icons/fa";
import toast from "react-hot-toast";

import { createOrder } from "../services/orderService";
import { deleteCartItem } from "../redux/slices/cartSlice";

const getCheckoutDataFromStorage = () => {
  try {
    const data = sessionStorage.getItem("checkoutData");

    if (data) {
      return JSON.parse(data);
    }

    const item = sessionStorage.getItem("checkoutItem");

    return item ? { source: "buy-now", items: [JSON.parse(item)] } : null;
  } catch {
    return null;
  }
};

const Checkout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.auth);

  const [checkoutData] = useState(
    location.state?.checkoutData ||
      (location.state?.checkoutItem
        ? { source: "buy-now", items: [location.state.checkoutItem] }
        : getCheckoutDataFromStorage()),
  );
  const [placingOrder, setPlacingOrder] = useState(false);
  const [order, setOrder] = useState(null);
  const checkoutItems = useMemo(() => checkoutData?.items || [], [checkoutData]);
  const isCartCheckout = checkoutData?.source === "cart";

  useEffect(() => {
    if (!userInfo?.token) {
      toast.error("Please login to checkout.");
      navigate("/login", { replace: true });
      return;
    }

    if (checkoutItems.length === 0) {
      toast.error("No items selected for checkout.");
      navigate("/shop", { replace: true });
    }
  }, [checkoutItems.length, navigate, userInfo]);

  useEffect(() => {
    if (location.state?.checkoutData) {
      sessionStorage.setItem(
        "checkoutData",
        JSON.stringify(location.state.checkoutData),
      );
      return;
    }

    if (location.state?.checkoutItem) {
      const data = {
        source: "buy-now",
        items: [location.state.checkoutItem],
      };

      sessionStorage.setItem("checkoutData", JSON.stringify(data));
      sessionStorage.setItem(
        "checkoutItem",
        JSON.stringify(location.state.checkoutItem),
      );
    }
  }, [location.state]);

  const totalAmount = useMemo(() => {
    return checkoutItems.reduce(
      (total, item) => total + Number(item.price || 0) * Number(item.qty || 1),
      0,
    );
  }, [checkoutItems]);

  const totalQty = useMemo(() => {
    return checkoutItems.reduce(
      (total, item) => total + Number(item.qty || 1),
      0,
    );
  }, [checkoutItems]);

  const placeOrderHandler = async () => {
    if (checkoutItems.length === 0) {
      toast.error("No items selected for checkout.");
      return;
    }

    setPlacingOrder(true);

    try {
      const data = await createOrder(
        {
          products: checkoutItems.map((item) => ({
            productId: item.productId,
            name: item.name,
            price: item.price,
            qty: item.qty,
          })),
          totalAmount,
        },
        userInfo.token,
      );

      setOrder(data);
      if (isCartCheckout) {
        await Promise.allSettled(
          checkoutItems
            .filter((item) => item.cartItemId)
            .map((item) =>
              dispatch(
                deleteCartItem({
                  id: item.cartItemId,
                  token: userInfo.token,
                }),
              ).unwrap(),
            ),
        );
      }

      navigate("/my-orders");
      sessionStorage.removeItem("checkoutData");
      sessionStorage.removeItem("checkoutItem");
      toast.success("Order placed successfully.");
    } catch (error) {
      toast.error(error.response?.data?.message || "Unable to place order.");
    } finally {
      setPlacingOrder(false);
    }
  };

  if (checkoutItems.length === 0) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-white to-emerald-50 px-5 py-12 transition-colors dark:from-slate-950 dark:via-slate-900 dark:to-emerald-950 md:px-10">
      <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[minmax(0,1fr)_380px]">
        <section className="overflow-hidden rounded-2xl border border-white/80 bg-white shadow-2xl shadow-rose-100/70 dark:border-slate-700 dark:bg-slate-900 dark:shadow-slate-950">
          <div className="bg-slate-950 px-6 py-8 text-white">
            <p className="text-sm font-black uppercase tracking-[0.3em] text-rose-300">
              Checkout
            </p>
            <h1 className="mt-3 text-4xl font-black">Cash on Delivery</h1>
            <p className="mt-3 max-w-2xl text-slate-300">
              Review your items and place the order. Payment will be collected
              when your order is delivered.
            </p>
          </div>

          <div className="space-y-4 p-6">
            <div className="grid gap-4">
              {checkoutItems.map((item) => (
                <div
                  key={item.cartItemId || item.productId}
                  className="grid gap-5 rounded-2xl border border-slate-100 bg-slate-50 p-4 dark:border-slate-800 dark:bg-slate-950 sm:grid-cols-[120px_minmax(0,1fr)_auto] sm:items-center"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="h-36 w-full rounded-xl object-cover sm:h-28 sm:w-28"
                  />

                  <div className="min-w-0">
                    <p className="text-xs font-black uppercase tracking-widest text-rose-600 dark:text-rose-300">
                      {item.category || "Selected item"}
                    </p>
                    <h2 className="mt-2 text-2xl font-black text-slate-950 dark:text-white">
                      {item.name}
                    </h2>
                    <p className="mt-3 text-sm text-slate-600 dark:text-slate-400">
                      Quantity: {item.qty} x Rs. {item.price}
                    </p>
                  </div>

                  <p className="text-2xl font-black text-rose-600 dark:text-rose-300">
                    Rs. {Number(item.price || 0) * Number(item.qty || 1)}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-6 grid gap-4 md:grid-cols-3">
              <div className="rounded-2xl border border-slate-100 bg-white p-4 dark:border-slate-800 dark:bg-slate-900">
                <FaMoneyBillWave className="text-2xl text-emerald-600 dark:text-emerald-300" />
                <h3 className="mt-3 font-black text-slate-950 dark:text-white">
                  COD Only
                </h3>
                <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                  No UPI or online payment required.
                </p>
              </div>
              <div className="rounded-2xl border border-slate-100 bg-white p-4 dark:border-slate-800 dark:bg-slate-900">
                <FaBoxOpen className="text-2xl text-rose-600 dark:text-rose-300" />
                <h3 className="mt-3 font-black text-slate-950 dark:text-white">
                  {isCartCheckout ? "Cart Order" : "Buy Now"}
                </h3>
                <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                  {isCartCheckout
                    ? "All selected cart items are included."
                    : "This order is created from Buy Now."}
                </p>
              </div>
              <div className="rounded-2xl border border-slate-100 bg-white p-4 dark:border-slate-800 dark:bg-slate-900">
                <FaTruck className="text-2xl text-blue-600 dark:text-blue-300" />
                <h3 className="mt-3 font-black text-slate-950 dark:text-white">
                  Track Status
                </h3>
                <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                  Status appears after order placement.
                </p>
              </div>
            </div>
          </div>
        </section>

        <aside className="h-fit rounded-2xl border border-white/80 bg-white p-6 shadow-2xl shadow-rose-100/70 dark:border-slate-700 dark:bg-slate-900 dark:shadow-slate-950">
          <h2 className="text-2xl font-black text-slate-950 dark:text-white">
            Order Summary
          </h2>

          <div className="mt-6 space-y-4 text-sm font-semibold text-slate-600 dark:text-slate-400">
            <div className="flex justify-between">
              <span>Items</span>
              <span className="text-right text-slate-950 dark:text-white">
                {checkoutItems.length}
              </span>
            </div>
            <div className="flex justify-between">
              <span>Total Quantity</span>
              <span>{totalQty}</span>
            </div>
            <div className="flex justify-between">
              <span>Payment</span>
              <span className="text-emerald-600 dark:text-emerald-300">
                Cash on Delivery
              </span>
            </div>
            <div className="flex justify-between">
              <span>Shipping</span>
              <span className="text-emerald-600 dark:text-emerald-300">
                Free
              </span>
            </div>
          </div>

          <div className="my-6 h-px bg-slate-200 dark:bg-slate-700" />

          <div className="flex items-center justify-between">
            <span className="text-lg font-bold text-slate-600 dark:text-slate-400">
              Total
            </span>
            <span className="text-3xl font-black text-slate-950 dark:text-white">
              Rs. {totalAmount}
            </span>
          </div>

          {order ? (
            <div className="mt-6 rounded-2xl bg-emerald-50 p-5 text-center dark:bg-emerald-950/50">
              <FaCheckCircle className="mx-auto text-4xl text-emerald-600 dark:text-emerald-300" />
              <h3 className="mt-3 text-xl font-black text-slate-950 dark:text-white">
                Order Placed
              </h3>
              <p className="mt-2 text-sm font-semibold text-slate-600 dark:text-slate-300">
                Status: {order.status || "Pending"}
              </p>
              <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                Order ID: {order._id}
              </p>
              <Link
                to="/shop"
                className="mt-5 inline-flex items-center gap-2 rounded-full bg-slate-950 px-5 py-3 text-sm font-bold text-white transition hover:bg-rose-700 dark:bg-rose-600 dark:hover:bg-rose-500"
              >
                <FaArrowLeft className="text-xs" />
                Continue Shopping
              </Link>
            </div>
          ) : (
            <button
              type="button"
              onClick={placeOrderHandler}
              disabled={placingOrder}
              className="mt-6 inline-flex w-full cursor-pointer items-center justify-center gap-2 rounded-full bg-rose-600 px-6 py-3 text-sm font-bold text-white transition hover:bg-rose-500 disabled:cursor-not-allowed disabled:opacity-70"
            >
              {placingOrder ? (
                <FaSpinner className="animate-spin text-xs" />
              ) : (
                <FaMoneyBillWave className="text-xs" />
              )}
              {placingOrder ? "Placing Order..." : "Place COD Order"}
            </button>
          )}
        </aside>
      </div>
    </div>
  );
};

export default Checkout;
