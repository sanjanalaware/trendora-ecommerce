import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import API from "../../services/api";
import DeleteModal from "../../components/admin/DeleteModal";
const AdminProducts = () => {
  const [products, setProducts] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [selectedProductId, setSelectedProductId] = useState(null);
  const openDeleteModal = (id) => {
    setSelectedProductId(id);
    setIsModalOpen(true);
  };
  const fetchProducts = async () => {
    try {
      const { data } = await API.get("/products");

      setProducts(data);
    } catch (error) {
      toast.error(error.response?.data?.message || "Unable to load products.");
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleDelete = async () => {
    try {
      await API.delete(`/products/${selectedProductId}`);

      toast.success("Product deleted successfully");

      fetchProducts();

      setIsModalOpen(false);
      setSelectedProductId(null);
    } catch (error) {
      toast.error("Failed to delete product");
    }
  };
  return (
    <div>
      <h1 className="mb-6 text-3xl font-bold">Products</h1>

      <div className="overflow-x-auto rounded-xl border">
        <table className="w-full">
          <thead className="bg-slate-100">
            <tr>
              <th className="p-4 text-left">Image</th>

              <th className="p-4 text-left">Title</th>

              <th className="p-4 text-left">Price</th>

              <th className="p-4 text-left">Stock</th>
              <th className="p-4 text-left">Actions</th>
            </tr>
          </thead>

          <tbody>
            {products.map((product) => (
              <tr key={product._id}>
                <td className="p-4">
                  <img
                    src={product.image}
                    alt={product.title}
                    className="h-16 w-16 rounded-lg object-cover"
                  />
                </td>

                <td className="p-4">{product.title}</td>

                <td className="p-4">₹{product.price}</td>

                <td className="p-4">{product.stock}</td>
                <td className="p-4">
                  <button
                    onClick={() => openDeleteModal(product._id)}
                    className="rounded-lg bg-red-500 px-4 py-2 text-white"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <DeleteModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleDelete}
      />
    </div>
  );
};

export default AdminProducts;
