import { FaExclamationTriangle, FaTrash } from "react-icons/fa";

const DeleteModal = ({ isOpen, onClose, onConfirm }) => {
  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 px-5 backdrop-blur-sm">
      <div className="w-full max-w-md rounded-2xl border border-white bg-white p-6 shadow-2xl dark:border-slate-800 dark:bg-slate-900">
        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-rose-100 text-2xl text-rose-600 dark:bg-rose-950 dark:text-rose-300">
          <FaExclamationTriangle />
        </div>

        <h2 className="mt-5 text-2xl font-black text-slate-950 dark:text-white">
          Delete product?
        </h2>

        <p className="mt-3 text-sm leading-6 text-slate-600 dark:text-slate-400">
          This action cannot be undone. The product will be removed from the
          live catalog immediately.
        </p>

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
            onClick={onConfirm}
            className="inline-flex cursor-pointer items-center justify-center gap-2 rounded-full bg-rose-600 px-5 py-3 text-sm font-bold text-white transition hover:bg-rose-500"
          >
            <FaTrash className="text-xs" />
            Delete Product
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;
