import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import { IoCloseOutline } from "react-icons/io5";

const EditCommentModal = ({ open, initialText, onClose, onSave }) => {
  const [text, setText] = useState(initialText);

  if (!open) return null;

  const handleSave = () => {
    if (text.trim()) {
      onSave(text);
    }
  };

  return createPortal(
    <div className="fixed inset-0 z-[99999] flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-2xl p-6 min-w-[500px] max-w-2xl mx-4 animate-fadeIn">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-purple-600">Edit Comment</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 hover:bg-gray-100 p-2 rounded-lg transition-colors"
          >
            <IoCloseOutline size={24} />
          </button>
        </div>
        <textarea
          value={text}
          onChange={e => setText(e.target.value)}
          rows={6}
          className="w-full p-4 border-2 border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent mb-4 resize-none"
          autoFocus
        />
        <div className="flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-6 py-2 rounded-lg border-2 border-gray-200 text-gray-700 hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            disabled={!text.trim()}
            className="px-6 py-2 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white rounded-lg transition-all shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
};

export default EditCommentModal;