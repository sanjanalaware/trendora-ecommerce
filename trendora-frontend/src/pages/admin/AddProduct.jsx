import { useState } from "react";

import { FaImage, FaPlus, FaSpinner } from "react-icons/fa";
import toast from "react-hot-toast";

import API from "../../services/api";

const initialFormData = {
  title: "",
  price: "",
  description: "",
  category: "",
  image: "",
  stock: "",
};

const AddProduct = () => {
  const [formData, setFormData] = useState(initialFormData);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (
      !formData.title ||
      !formData.price ||
      !formData.description ||
      !formData.category ||
      !formData.image
    ) {
      toast.error("Please fill all required fields.");
      return;
    }

    if (isSubmitting) {
      return;
    }

    setIsSubmitting(true);

    try {
      await API.post("/products", formData);

      toast.success("Product added successfully.");
      setFormData(initialFormData);
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to add product.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <p className="text-sm font-black uppercase tracking-[0.25em] text-rose-600 dark:text-rose-300">
          Catalog
        </p>
        <h1 className="mt-2 text-4xl font-black text-slate-950 dark:text-white">
          Add Product
        </h1>
        <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
          Create a new catalog item with pricing, inventory, and product media.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_340px]">
        <form
          onSubmit={handleSubmit}
          className="rounded-2xl border border-white bg-white p-6 shadow-xl shadow-slate-200/70 dark:border-slate-800 dark:bg-slate-900 dark:shadow-slate-950"
        >
          <div className="grid gap-5 sm:grid-cols-2">
            <label className="block sm:col-span-2">
              <span className="mb-2 block text-xs font-black uppercase tracking-widest text-slate-500 dark:text-slate-400">
                Product Title
              </span>
              <input
                type="text"
                name="title"
                placeholder="Oversized cotton hoodie"
                value={formData.title}
                onChange={handleChange}
                className="h-12 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 text-sm font-semibold text-slate-900 outline-none transition focus:border-rose-400 focus:bg-white focus:ring-4 focus:ring-rose-100 dark:border-slate-700 dark:bg-slate-950 dark:text-white dark:focus:border-rose-500 dark:focus:bg-slate-950 dark:focus:ring-rose-950"
              />
            </label>

            <label className="block">
              <span className="mb-2 block text-xs font-black uppercase tracking-widest text-slate-500 dark:text-slate-400">
                Price
              </span>
              <input
                type="number"
                name="price"
                placeholder="1499"
                value={formData.price}
                onChange={handleChange}
                className="h-12 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 text-sm font-semibold text-slate-900 outline-none transition focus:border-rose-400 focus:bg-white focus:ring-4 focus:ring-rose-100 dark:border-slate-700 dark:bg-slate-950 dark:text-white dark:focus:border-rose-500 dark:focus:bg-slate-950 dark:focus:ring-rose-950"
              />
            </label>

            <label className="block">
              <span className="mb-2 block text-xs font-black uppercase tracking-widest text-slate-500 dark:text-slate-400">
                Stock
              </span>
              <input
                type="number"
                name="stock"
                placeholder="24"
                value={formData.stock}
                onChange={handleChange}
                className="h-12 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 text-sm font-semibold text-slate-900 outline-none transition focus:border-rose-400 focus:bg-white focus:ring-4 focus:ring-rose-100 dark:border-slate-700 dark:bg-slate-950 dark:text-white dark:focus:border-rose-500 dark:focus:bg-slate-950 dark:focus:ring-rose-950"
              />
            </label>

            <label className="block">
              <span className="mb-2 block text-xs font-black uppercase tracking-widest text-slate-500 dark:text-slate-400">
                Category
              </span>
              <input
                type="text"
                name="category"
                placeholder="Hoodies"
                value={formData.category}
                onChange={handleChange}
                className="h-12 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 text-sm font-semibold text-slate-900 outline-none transition focus:border-rose-400 focus:bg-white focus:ring-4 focus:ring-rose-100 dark:border-slate-700 dark:bg-slate-950 dark:text-white dark:focus:border-rose-500 dark:focus:bg-slate-950 dark:focus:ring-rose-950"
              />
            </label>

            <label className="block">
              <span className="mb-2 block text-xs font-black uppercase tracking-widest text-slate-500 dark:text-slate-400">
                Image URL
              </span>
              <input
                type="text"
                name="image"
                placeholder="https://..."
                value={formData.image}
                onChange={handleChange}
                className="h-12 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 text-sm font-semibold text-slate-900 outline-none transition focus:border-rose-400 focus:bg-white focus:ring-4 focus:ring-rose-100 dark:border-slate-700 dark:bg-slate-950 dark:text-white dark:focus:border-rose-500 dark:focus:bg-slate-950 dark:focus:ring-rose-950"
              />
            </label>

            <label className="block sm:col-span-2">
              <span className="mb-2 block text-xs font-black uppercase tracking-widest text-slate-500 dark:text-slate-400">
                Description
              </span>
              <textarea
                name="description"
                placeholder="Short product description"
                value={formData.description}
                onChange={handleChange}
                rows="5"
                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-semibold text-slate-900 outline-none transition focus:border-rose-400 focus:bg-white focus:ring-4 focus:ring-rose-100 dark:border-slate-700 dark:bg-slate-950 dark:text-white dark:focus:border-rose-500 dark:focus:bg-slate-950 dark:focus:ring-rose-950"
              />
            </label>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="mt-6 inline-flex w-full cursor-pointer items-center justify-center gap-2 rounded-full bg-slate-950 px-6 py-3 text-sm font-bold text-white transition hover:bg-rose-700 disabled:cursor-not-allowed disabled:opacity-70 dark:bg-rose-600 dark:hover:bg-rose-500 sm:w-auto"
          >
            {isSubmitting ? (
              <FaSpinner className="animate-spin text-xs" />
            ) : (
              <FaPlus className="text-xs" />
            )}
            {isSubmitting ? "Adding Product..." : "Add Product"}
          </button>
        </form>

        <aside className="h-fit rounded-2xl border border-white bg-white p-6 shadow-xl shadow-slate-200/70 dark:border-slate-800 dark:bg-slate-900 dark:shadow-slate-950">
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-rose-100 text-2xl text-rose-600 dark:bg-rose-950 dark:text-rose-300">
            <FaImage />
          </div>
          <h2 className="mt-5 text-2xl font-black text-slate-950 dark:text-white">
            Product Preview
          </h2>
          <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-400">
            Use a clear image URL and concise title. This information will be
            visible to shoppers across the store.
          </p>

          {formData.image && (
            <img
              src={formData.image}
              alt="Product preview"
              className="mt-5 h-56 w-full rounded-xl object-cover"
            />
          )}
        </aside>
      </div>
    </div>
  );
};

export default AddProduct;
