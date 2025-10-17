import React, { useContext, useState } from 'react';
import { IoPencilOutline, IoCalendarOutline } from "react-icons/io5";
import CommentContext from '../../context/CommentContext';
import EditCommentModal from './EditCommentModal';

const CommentShow = ({ comment }) => {
  const { updateComment } = useContext(CommentContext);
  const [isEditing, setIsEditing] = useState(false);

  const handleSave = async (newContent) => {
    await updateComment(comment.id, newContent);
    setIsEditing(false);
  };

  return (
    <>
      <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg p-5 border border-purple-100 hover:shadow-lg transition-all duration-200">
        <div className="flex justify-between items-start mb-3">
          <div className="flex-1">
            <p className="text-gray-800 text-base leading-relaxed mb-3">{comment.content}</p>
            <div className="flex items-center gap-3 text-sm">
              <div className="flex items-center gap-1 text-gray-500">
                <IoCalendarOutline size={16} />
                <span>{new Date(comment.createdAt).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'short',
                  day: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit'
                })}</span>
              </div>
              <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                comment.isActive 
                  ? 'bg-green-100 text-green-700' 
                  : 'bg-red-100 text-red-700'
              }`}>
                {comment.isActive ? 'Active' : 'Inactive'}
              </span>
            </div>
          </div>
          <button
            onClick={() => setIsEditing(true)}
            className="ml-4 text-purple-600 hover:text-purple-800 hover:bg-purple-100 p-2 rounded-lg transition-colors"
            title="Edit comment"
          >
            <IoPencilOutline size={20} />
          </button>
        </div>
      </div>
      <EditCommentModal
        open={isEditing}
        initialText={comment.content}
        onClose={() => setIsEditing(false)}
        onSave={handleSave}
      />
    </>
  );
};

export default CommentShow;