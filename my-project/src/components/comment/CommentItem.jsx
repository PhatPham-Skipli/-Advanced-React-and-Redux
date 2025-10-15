import React, { useContext, useState } from 'react';
import CommentContext from '../../context/CommentContext';
import EditCommentModal from './EditCommentModal';

const CommentItem = ({ comment }) => {
  const { deleteComment, updateComment } = useContext(CommentContext);
  const [isEditing, setIsEditing] = useState(false);

  const handleDelete = () => {
    deleteComment(comment.id);
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = (newText) => {
    updateComment(comment.id, newText);
    setIsEditing(false);
  };

  return (
    <>
      <div style={{
        background: '#f9fafb',
        borderRadius: '8px',
        padding: '12px 16px',
        marginBottom: '12px',
        boxShadow: '0 1px 4px rgba(0,0,0,0.04)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
      }}>
        <span style={{ fontSize: '16px', color: '#333' }}>{comment.text}</span>
        <div>
          <button
            onClick={handleEdit}
            style={{
              marginRight: '8px',
              padding: '6px 12px',
              borderRadius: '4px',
              border: 'none',
              background: '#a78bfa',
              color: '#fff',
              cursor: 'pointer'
            }}
          >
            Edit
          </button>
          <button
            onClick={handleDelete}
            style={{
              padding: '6px 12px',
              borderRadius: '4px',
              border: 'none',
              background: '#ef4444',
              color: '#fff',
              cursor: 'pointer'
            }}
          >
            Delete
          </button>
        </div>
      </div>
      <EditCommentModal
        open={isEditing}
        initialText={comment.text}
        onClose={() => setIsEditing(false)}
        onSave={handleSave}
      />
    </>
  );
};

export default CommentItem;