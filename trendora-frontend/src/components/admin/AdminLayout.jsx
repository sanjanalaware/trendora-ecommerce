import AdminSidebar from "./AdminSidebar";
import { NavLink } from "react-router-dom";

const mobileLinks = [
  { label: "Dashboard", to: "/admin" },
  { label: "Products", to: "/admin/products" },
  { label: "Add", to: "/admin/add-product" },
  { label: "Orders", to: "/admin/orders" },
];

const AdminLayout = ({ children }) => {
  return (
    <div className="min-h-screen bg-slate-100 text-slate-950 dark:bg-slate-950 dark:text-white">
      <div className="flex min-h-screen">
        <AdminSidebar />

        <main className="min-w-0 flex-1 px-5 py-6 md:px-8 lg:px-10">
          <div className="mb-6 rounded-2xl border border-white bg-white p-4 shadow-lg shadow-slate-200/70 dark:border-slate-800 dark:bg-slate-900 dark:shadow-slate-950 lg:hidden">
            <p className="mb-3 text-xs font-black uppercase tracking-[0.25em] text-rose-600 dark:text-rose-300">
              Trendora Admin
            </p>
            <div className="flex gap-2 overflow-x-auto pb-1">
              {mobileLinks.map((link) => (
                <NavLink
                  key={link.to}
                  to={link.to}
                  end={link.to === "/admin"}
                  className={({ isActive }) =>
                    `shrink-0 cursor-pointer rounded-full px-4 py-2 text-sm font-bold transition ${
                      isActive
                        ? "bg-rose-600 text-white"
                        : "bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-200"
                    }`
                  }
                >
                  {link.label}
                </NavLink>
              ))}
            </div>
          </div>

          <div className="mx-auto max-w-7xl">{children}</div>
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
