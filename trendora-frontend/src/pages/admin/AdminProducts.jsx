import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { FaEdit, FaPlus, FaSpinner, FaTrash } from "react-icons/fa";
import toast from "react-hot-toast";

import API from "../../services/api";
import DeleteModal from "../../components/admin/DeleteModal";
import EditProductModal from "../../components/admin/EditProductModal";

const AdminProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState(null);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const fetchProducts = async () => {
    const { data } = await API.get("/products");

    setProducts(data);
  };

  useEffect(() => {
    const loadProducts = async () => {
      try {
        await fetchProducts();
      } catch (error) {
        toast.error(
          error.response?.data?.message || "Unable to load products.",
        );
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, []);

  const openDeleteModal = (id) => {
    setSelectedProductId(id);
    setIsModalOpen(true);
  };

  const openEditModal = (product) => {
    setSelectedProduct(product);
    setIsEditOpen(true);
  };

  const handleEditChange = (event) => {
    setSelectedProduct({
      ...selectedProduct,
      [event.target.name]: event.target.value,
    });
  };

  const handleUpdate = async () => {
    try {
      await API.put(`/products/${selectedProduct._id}`, selectedProduct);

      toast.success("Product updated successfully.");
      setIsEditOpen(false);
      setSelectedProduct(null);
      await fetchProducts();
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to update product.");
    }
  };

  const handleDelete = async () => {
    try {
      await API.delete(`/products/${selectedProductId}`);

      toast.success("Product deleted successfully.");
      await fetchProducts();
      setIsModalOpen(false);
      setSelectedProductId(null);
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to delete product.");
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm font-black uppercase tracking-[0.25em] text-rose-600 dark:text-rose-300">
            Inventory
          </p>
          <h1 className="mt-2 text-4xl font-black text-slate-950 dark:text-white">
            Products
          </h1>
          <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
            Manage product details, pricing, stock, and product media.
          </p>
        </div>

        <Link
          to="/admin/add-product"
          className="inline-flex cursor-pointer items-center justify-center gap-2 rounded-full bg-slate-950 px-5 py-3 text-sm font-bold text-white transition hover:bg-rose-700 dark:bg-rose-600 dark:hover:bg-rose-500"
        >
          <FaPlus className="text-xs" />
          Add Product
        </Link>
      </div>

      <div className="overflow-hidden rounded-2xl border border-white bg-white shadow-xl shadow-slate-200/70 dark:border-slate-800 dark:bg-slate-900 dark:shadow-slate-950">
        {loading ? (
          <div className="flex min-h-80 items-center justify-center">
            <FaSpinner className="animate-spin text-5xl text-rose-600 dark:text-rose-300" />
          </div>
        ) : products.length === 0 ? (
          <div className="flex min-h-80 flex-col items-center justify-center p-8 text-center">
            <h2 className="text-2xl font-black text-slate-950 dark:text-white">
              No products yet
            </h2>
            <p className="mt-2 text-slate-600 dark:text-slate-400">
              Add your first product to start building the catalog.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[840px]">
              <thead className="bg-slate-950 text-left text-xs font-black uppercase tracking-widest text-white">
                <tr>
                  <th className="px-5 py-4">Product</th>
                  <th className="px-5 py-4">Category</th>
                  <th className="px-5 py-4">Price</th>
                  <th className="px-5 py-4">Stock</th>
                  <th className="px-5 py-4 text-right">Actions</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {products.map((product) => (
                  <tr
                    key={product._id}
                    className="transition hover:bg-rose-50/70 dark:hover:bg-slate-800/70"
                  >
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-4">
                        <img
                          src={product.image}
                          alt={product.title}
                          className="h-16 w-16 rounded-xl object-cover shadow-md"
                        />
                        <div className="min-w-0">
                          <p className="line-clamp-1 font-extrabold text-slate-950 dark:text-white">
                            {product.title}
                          </p>
                          <p className="line-clamp-1 text-sm text-slate-500 dark:text-slate-400">
                            {product.description}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-4">
                      <span className="rounded-full bg-rose-100 px-3 py-1 text-xs font-bold text-rose-700 dark:bg-rose-950 dark:text-rose-300">
                        {product.category}
                      </span>
                    </td>
                    <td className="px-5 py-4 font-bold text-slate-800 dark:text-slate-200">
                      Rs. {product.price}
                    </td>
                    <td className="px-5 py-4">
                      <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-bold text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300">
                        {product.stock ?? 0} in stock
                      </span>
                    </td>
                    <td className="px-5 py-4">
                      <div className="flex justify-end gap-2">
                        <button
                          type="button"
                          onClick={() => openEditModal(product)}
                          className="inline-flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-blue-50 text-blue-600 transition hover:bg-blue-600 hover:text-white dark:bg-slate-800 dark:text-blue-300"
                          aria-label={`Edit ${product.title}`}
                        >
                          <FaEdit />
                        </button>
                        <button
                          type="button"
                          onClick={() => openDeleteModal(product._id)}
                          className="inline-flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-rose-50 text-rose-600 transition hover:bg-rose-600 hover:text-white dark:bg-slate-800 dark:text-rose-300"
                          aria-label={`Delete ${product.title}`}
                        >
                          <FaTrash />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <DeleteModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleDelete}
      />
      <EditProductModal
        isOpen={isEditOpen}
        product={selectedProduct}
        onClose={() => {
          setIsEditOpen(false);
          setSelectedProduct(null);
        }}
        onChange={handleEditChange}
        onSave={handleUpdate}
      />
    </div>
  );
};

export default AdminProducts;
