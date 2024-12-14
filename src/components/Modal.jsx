import React from "react";
import PropTypes from "prop-types";

const Modal = ({ isOpen, onClose, children, title }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 mt-40">
      <div className="bg-white rounded-lg shadow-lg w-11/12 md:w-1/2 p-6 relative z-1000 m-auto ">
        {/* Modal Header */}
        <div className="flex justify-between items-center border-b pb-2">
          <h2 className="text-xl font-semibold">{title}</h2>
          <button
            onClick={onClose}
            className="text-gray-600 hover:text-black focus:outline-none"
          >
            ✖
          </button>
        </div>

        {/* Modal Content */}
        <div className="py-4">{children}</div>

        {/* Modal Footer (Optional) */}
        <div className="flex justify-end gap-3 mt-4 border-t pt-2">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

// Prop Types
Modal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  children: PropTypes.node,
  title: PropTypes.string,
};

Modal.defaultProps = {
  children: null,
  title: "Modal Title",
};

export default Modal;
