import React from "react";

const Modal = ({ isOpen, onClose, title, children, colors, theme  }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-2">
      <div className="bg-white rounded shadow-lg  p-4 relative w-3/5" style={{
        backgroundColor: colors.primary[400],
        color: colors.primary[100],
      }}>
        <h3 className="text-lg font-bold mb-4">{title}</h3>
        <button
          className="absolute top-2 right-5 text-gray-500 hover:text-gray-700 text-2xl"
          onClick={onClose}
        >
          ✕
        </button>
        {children}
      </div>
    </div>
  );
};

export default Modal;
