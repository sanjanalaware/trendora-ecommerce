import { Link } from "react-router-dom";

const AdminSidebar = () => {
  return (
    <div className="min-h-screen w-64 bg-slate-900 p-5 text-white">
      <h2 className="mb-10 text-2xl font-bold">Trendora Admin</h2>

      <div className="flex flex-col gap-5">
        <Link to="/admin">Dashboard</Link>

        <Link to="/admin/products">Products</Link>

        <Link to="/admin/orders">Orders</Link>
        <Link to="/admin/add-product">Add Product</Link>
      </div>
    </div>
  );
};

export default AdminSidebar;
