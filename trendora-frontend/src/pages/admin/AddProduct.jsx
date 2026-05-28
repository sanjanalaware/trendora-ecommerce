import { useState } from "react";
import toast from "react-hot-toast";

import API from "../../services/api";

const AddProduct = () => {
  const [formData, setFormData] = useState({
    title: "",
    price: "",
    description: "",
    category: "",
    image: "",
    stock: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await API.post("/products", formData);

      toast.success("Product added successfully");

      setFormData({
        title: "",
        price: "",
        description: "",
        category: "",
        image: "",
        stock: "",
      });
    } catch {
      toast.error("Failed to add product");
    }
  };

  return (
    <div className="mx-auto max-w-2xl">
      <h1 className="mb-6 text-3xl font-bold">Add Product</h1>

      <form onSubmit={handleSubmit} className="space-y-5">
        <input
          type="text"
          name="title"
          placeholder="Product title"
          value={formData.title}
          onChange={handleChange}
          className="w-full rounded-xl border p-3"
        />

        <input
          type="number"
          name="price"
          placeholder="Price"
          value={formData.price}
          onChange={handleChange}
          className="w-full rounded-xl border p-3"
        />

        <textarea
          name="description"
          placeholder="Description"
          value={formData.description}
          onChange={handleChange}
          className="w-full rounded-xl border p-3"
        />

        <input
          type="text"
          name="category"
          placeholder="Category"
          value={formData.category}
          onChange={handleChange}
          className="w-full rounded-xl border p-3"
        />

        <input
          type="text"
          name="image"
          placeholder="Image URL"
          value={formData.image}
          onChange={handleChange}
          className="w-full rounded-xl border p-3"
        />

        <input
          type="number"
          name="stock"
          placeholder="Stock"
          value={formData.stock}
          onChange={handleChange}
          className="w-full rounded-xl border p-3"
        />

        <button
          type="submit"
          className="rounded-xl bg-slate-900 px-6 py-3 text-white"
        >
          Add Product
        </button>
      </form>
    </div>
  );
};

export default AddProduct;
