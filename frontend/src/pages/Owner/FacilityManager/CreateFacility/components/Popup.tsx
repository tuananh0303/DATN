import React from 'react';

interface PopupProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  onConfirm: () => void;
  onCancel: () => void;
}

export const Popup: React.FC<PopupProps> = ({ isOpen, onClose, title, onConfirm, onCancel }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
        <h3 className="text-xl font-semibold mb-4">{title}</h3>
        <div className="flex justify-end gap-3 mt-6">
          <button
            onClick={onCancel}
            className="px-4 py-2 border rounded-lg hover:bg-gray-50"
          >
            No
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
          >
            Yes
          </button>
        </div>
      </div>
    </div>
  );
};
