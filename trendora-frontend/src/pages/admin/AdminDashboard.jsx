import { Link } from "react-router-dom";

import {
  FaArrowRight,
  FaBoxOpen,
  FaClipboardList,
  FaPlus,
  FaStore,
} from "react-icons/fa";

const stats = [
  {
    label: "Catalog",
    value: "Products",
    description: "Edit pricing, images, stock, and product details.",
    icon: FaBoxOpen,
  },
  {
    label: "Orders",
    value: "Sales",
    description: "Track new orders and customer purchase activity.",
    icon: FaClipboardList,
  },
  {
    label: "Store",
    value: "Admin",
    description: "Keep Trendora inventory ready for shoppers.",
    icon: FaStore,
  },
];

const AdminDashboard = () => {
  return (
    <div className="space-y-8">
      <section className="overflow-hidden rounded-2xl bg-slate-950 text-white shadow-2xl shadow-slate-300/60 dark:shadow-slate-950">
        <div className="grid gap-8 p-8 lg:grid-cols-[minmax(0,1fr)_320px] lg:p-10">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.3em] text-rose-300">
              Admin Dashboard
            </p>
            <h1 className="mt-4 text-4xl font-black md:text-5xl">
              Manage Trendora with clarity.
            </h1>
            <p className="mt-4 max-w-2xl text-slate-300">
              Keep product data, inventory, and orders organized from a focused
              admin workspace.
            </p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/10 p-5">
            <p className="text-sm font-bold text-slate-300">Quick action</p>
            <Link
              to="/admin/add-product"
              className="mt-5 inline-flex w-full cursor-pointer items-center justify-center gap-2 rounded-full bg-rose-600 px-5 py-3 text-sm font-bold text-white transition hover:bg-rose-500"
            >
              <FaPlus className="text-xs" />
              Add New Product
            </Link>
          </div>
        </div>
      </section>

      <section className="grid gap-5 md:grid-cols-3">
        {stats.map((item) => {
          const Icon = item.icon;

          return (
            <div
              key={item.label}
              className="rounded-2xl border border-white bg-white p-6 shadow-xl shadow-slate-200/70 dark:border-slate-800 dark:bg-slate-900 dark:shadow-slate-950"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-rose-100 text-rose-600 dark:bg-rose-950 dark:text-rose-300">
                <Icon />
              </div>
              <p className="mt-5 text-sm font-black uppercase tracking-widest text-slate-500">
                {item.label}
              </p>
              <h2 className="mt-2 text-2xl font-black text-slate-950 dark:text-white">
                {item.value}
              </h2>
              <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-400">
                {item.description}
              </p>
            </div>
          );
        })}
      </section>

      <section className="rounded-2xl border border-white bg-white p-6 shadow-xl shadow-slate-200/70 dark:border-slate-800 dark:bg-slate-900 dark:shadow-slate-950">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm font-black uppercase tracking-widest text-rose-600 dark:text-rose-300">
              Products
            </p>
            <h2 className="mt-2 text-2xl font-black text-slate-950 dark:text-white">
              Review your live catalog
            </h2>
          </div>

          <Link
            to="/admin/products"
            className="inline-flex cursor-pointer items-center justify-center gap-2 rounded-full bg-slate-950 px-5 py-3 text-sm font-bold text-white transition hover:bg-rose-700 dark:bg-rose-600 dark:hover:bg-rose-500"
          >
            Open Products
            <FaArrowRight className="text-xs" />
          </Link>
        </div>
      </section>
    </div>
  );
};

export default AdminDashboard;
