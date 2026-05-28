import { FaClipboardList } from "react-icons/fa";

const AdminOrders = () => {
  return (
    <div className="rounded-2xl border border-white bg-white p-8 text-center shadow-xl shadow-slate-200/70 dark:border-slate-800 dark:bg-slate-900 dark:shadow-slate-950">
      <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-rose-100 text-2xl text-rose-600 dark:bg-rose-950 dark:text-rose-300">
        <FaClipboardList />
      </div>
      <h1 className="mt-5 text-3xl font-black text-slate-950 dark:text-white">
        Orders
      </h1>
      <p className="mx-auto mt-3 max-w-xl text-slate-600 dark:text-slate-400">
        Order management is ready for the next backend endpoint. New customer
        purchases will appear here once order APIs are connected.
      </p>
    </div>
  );
};

export default AdminOrders;
