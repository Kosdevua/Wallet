import { toast } from "react-toastify";

export const confirmToast = ({
  message = "Ви впевнені?",
  confirmText = "Підтвердити",
  cancelText = "Скасувати",
  onConfirm,
  onCancel,
}) => {
  toast(
    ({ closeToast }) => (
      <div className="space-y-3">
        <p className="font-medium text-gray-800">{message}</p>

        <div className="flex justify-end gap-2">
          <button
            className="px-3 py-1 rounded bg-gray-200 hover:bg-gray-300 transition"
            onClick={() => {
              onCancel?.();
              closeToast();
            }}
          >
            {cancelText}
          </button>

          <button
            className="px-3 py-1 rounded bg-red-500 text-white hover:bg-red-600 transition"
            onClick={() => {
              onConfirm?.();
              closeToast();
            }}
          >
            {confirmText}
          </button>
        </div>
      </div>
    ),
    {
      autoClose: false,
      closeOnClick: false,
      closeButton: false,
    }
  );
};
