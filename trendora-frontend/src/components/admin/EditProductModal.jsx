import { FaSave, FaTimes } from "react-icons/fa";

const fields = [
  { name: "title", label: "Title", type: "text" },
  { name: "price", label: "Price", type: "number" },
  { name: "category", label: "Category", type: "text" },
  { name: "image", label: "Image URL", type: "text" },
  { name: "stock", label: "Stock", type: "number" },
];

const EditProductModal = ({ isOpen, onClose, product, onChange, onSave }) => {
  if (!isOpen || !product) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-slate-950/70 px-5 py-8 backdrop-blur-sm">
      <div className="w-full max-w-2xl rounded-2xl border border-white bg-white p-6 shadow-2xl dark:border-slate-800 dark:bg-slate-900">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.25em] text-rose-600 dark:text-rose-300">
              Product Editor
            </p>
            <h2 className="mt-2 text-3xl font-black text-slate-950 dark:text-white">
              Edit Product
            </h2>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-slate-100 text-slate-600 transition hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300"
            aria-label="Close edit product modal"
          >
            <FaTimes />
          </button>
        </div>

        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          {fields.map((field) => (
            <label key={field.name} className="block">
              <span className="mb-2 block text-xs font-black uppercase tracking-widest text-slate-500 dark:text-slate-400">
                {field.label}
              </span>
              <input
                type={field.type}
                name={field.name}
                value={product[field.name] ?? ""}
                onChange={onChange}
                className="h-12 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 text-sm font-semibold text-slate-900 outline-none transition focus:border-rose-400 focus:bg-white focus:ring-4 focus:ring-rose-100 dark:border-slate-700 dark:bg-slate-950 dark:text-white dark:focus:border-rose-500 dark:focus:bg-slate-950 dark:focus:ring-rose-950"
              />
            </label>
          ))}
        </div>

        <label className="mt-4 block">
          <span className="mb-2 block text-xs font-black uppercase tracking-widest text-slate-500 dark:text-slate-400">
            Description
          </span>
          <textarea
            name="description"
            value={product.description ?? ""}
            onChange={onChange}
            rows="4"
            className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-semibold text-slate-900 outline-none transition focus:border-rose-400 focus:bg-white focus:ring-4 focus:ring-rose-100 dark:border-slate-700 dark:bg-slate-950 dark:text-white dark:focus:border-rose-500 dark:focus:bg-slate-950 dark:focus:ring-rose-950"
          />
        </label>

        <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
          <button
            type="button"
            onClick={onClose}
            className="cursor-pointer rounded-full border border-slate-200 px-5 py-3 text-sm font-bold text-slate-700 transition hover:border-slate-300 hover:bg-slate-50 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-800"
          >
            Cancel
          </button>

          <button
            type="button"
            onClick={onSave}
            className="inline-flex cursor-pointer items-center justify-center gap-2 rounded-full bg-emerald-600 px-5 py-3 text-sm font-bold text-white transition hover:bg-emerald-500"
          >
            <FaSave className="text-xs" />
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditProductModal;
