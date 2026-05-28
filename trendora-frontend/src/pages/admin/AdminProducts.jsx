import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import API from "../../services/api";

const AdminProducts = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data } = await API.get("/products");

        setProducts(data);
      } catch (error) {
        toast.error(
          error.response?.data?.message || "Unable to load products.",
        );
      }
    };

    fetchProducts();
  }, []);

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

                <td className="p-4">Rs. {product.price}</td>

                <td className="p-4">{product.stock}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminProducts;
