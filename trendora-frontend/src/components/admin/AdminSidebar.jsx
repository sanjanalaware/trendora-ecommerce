import { NavLink } from "react-router-dom";

import {
  FaBoxOpen,
  FaClipboardList,
  FaPlus,
  FaTachometerAlt,
} from "react-icons/fa";

const adminLinks = [
  { label: "Dashboard", to: "/admin", icon: FaTachometerAlt },
  { label: "Products", to: "/admin/products", icon: FaBoxOpen },
  { label: "Add Product", to: "/admin/add-product", icon: FaPlus },
  { label: "Orders", to: "/admin/orders", icon: FaClipboardList },
];

const AdminSidebar = () => {
  return (
    <aside className="sticky top-0 hidden h-screen w-72 shrink-0 border-r border-slate-800 bg-slate-950 px-5 py-6 text-white lg:block">
      <NavLink to="/admin" className="block cursor-pointer">
        <h2 className="text-3xl font-extrabold tracking-normal">
          Tren<span className="text-rose-500">dora</span>
        </h2>
        <p className="mt-1 text-xs font-bold uppercase tracking-[0.25em] text-rose-300">
          Admin Console
        </p>
      </NavLink>

      <nav className="mt-10 grid gap-2">
        {adminLinks.map((link) => {
          const Icon = link.icon;

          return (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.to === "/admin"}
              className={({ isActive }) =>
                `flex cursor-pointer items-center gap-3 rounded-xl px-4 py-3 text-sm font-bold transition ${
                  isActive
                    ? "bg-rose-600 text-white shadow-lg shadow-rose-950/40"
                    : "text-slate-300 hover:bg-slate-900 hover:text-white"
                }`
              }
            >
              <Icon className="text-base" />
              {link.label}
            </NavLink>
          );
        })}
      </nav>

      <div className="absolute bottom-6 left-5 right-5 rounded-2xl border border-slate-800 bg-slate-900 p-4">
        <p className="text-xs font-bold uppercase tracking-widest text-slate-500">
          Workspace
        </p>
        <p className="mt-2 text-sm font-semibold text-slate-300">
          Manage products, inventory, and store operations from one place.
        </p>
      </div>
    </aside>
  );
};

export default AdminSidebar;
