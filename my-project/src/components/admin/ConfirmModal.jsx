import { createPortal } from 'react-dom';

const ConfirmModal = ({
  show,
  onConfirm,
  onCancel,
  title = "Confirm Delete",
  message = "Are you sure you want to delete this account?",
  confirmText = "Delete"
}) => {
  if (!show) return null;

  return createPortal(
    <div className="fixed inset-0 z-[99999] flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-md">
      <div className="bg-white rounded-xl shadow-lg p-6 min-w-[320px] max-w-md">
        <h2 className={`text-lg font-bold mb-4 ${confirmText === "Delete" ? "text-red-600" : "text-purple-600"}`}>{title}</h2>
        <p className="mb-6">{message}</p>
        <div className="flex justify-end gap-4">
          <button
            className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300 text-gray-700"
            onClick={onCancel}
          >
            Cancel
          </button>
          <button
            className={`px-4 py-2 rounded ${confirmText === "Delete" ? "bg-red-500 hover:bg-red-600" : "bg-purple-500 hover:bg-purple-600"} text-white`}
            onClick={onConfirm}
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
};

export default ConfirmModal;