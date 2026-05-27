import { useEffect, useState } from "react";

import { FaEdit, FaTrash } from "react-icons/fa";

import { getProducts } from "../services/productService";

const AdminDashboard = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getProducts();

        setProducts(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="min-h-screen bg-slate-100 p-6 dark:bg-slate-950">
      <div className="mx-auto max-w-7xl">
        {/* HEADER */}
        <div className="mb-10 flex items-center justify-between">
          <div>
            <p className="text-sm font-bold uppercase tracking-widest text-rose-500">
              Trendora Admin
            </p>

            <h1 className="text-5xl font-extrabold text-slate-900 dark:text-white">
              Dashboard
            </h1>
          </div>

          <button className="rounded-2xl bg-black px-6 py-3 font-semibold text-white">
            + Add Product
          </button>
        </div>

        {/* TABLE */}
        <div className="overflow-x-auto rounded-3xl bg-white shadow-xl dark:bg-slate-900">
          <table className="w-full">
            <thead className="border-b dark:border-slate-700">
              <tr className="text-left">
                <th className="p-5">Image</th>

                <th className="p-5">Product</th>

                <th className="p-5">Category</th>

                <th className="p-5">Price</th>

                <th className="p-5">Stock</th>

                <th className="p-5">Actions</th>
              </tr>
            </thead>

            <tbody>
              {products.map((product) => (
                <tr
                  key={product._id}
                  className="border-b dark:border-slate-800"
                >
                  <td className="p-5">
                    <img
                      src={product.image}
                      alt={product.title}
                      className="h-20 w-20 rounded-xl object-cover"
                    />
                  </td>

                  <td className="p-5 font-bold dark:text-white">
                    {product.title}
                  </td>

                  <td className="p-5 dark:text-slate-300">
                    {product.category}
                  </td>

                  <td className="p-5 dark:text-slate-300">₹{product.price}</td>

                  <td className="p-5 dark:text-slate-300">{product.stock}</td>

                  <td className="p-5">
                    <div className="flex gap-3">
                      <button className="rounded-lg bg-blue-500 p-3 text-white">
                        <FaEdit />
                      </button>

                      <button className="rounded-lg bg-red-500 p-3 text-white">
                        <FaTrash />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
