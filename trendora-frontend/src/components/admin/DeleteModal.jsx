const DeleteModal = ({ isOpen, onClose, onConfirm }) => {
  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">
        <h2 className="mb-4 text-2xl font-bold">Delete Product</h2>

        <p className="mb-6 text-slate-600">
          Are you sure you want to delete this product?
        </p>

        <div className="flex justify-end gap-4">
          <button onClick={onClose} className="rounded-lg border px-5 py-2">
            Cancel
          </button>

          <button
            onClick={onConfirm}
            className="rounded-lg bg-red-500 px-5 py-2 text-white"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;
