import React, { useState, useContext } from 'react';
import CommentContext from '../../context/CommentContext';

const CommentBox = () => {
  const [commentText, setCommentText] = useState('');
  const { addComment } = useContext(CommentContext);

   const handleSubmit = (e) => {
    e.preventDefault();
    if (commentText.trim()) {
      const newComment = {
        id: Date.now(),
        text: commentText,
      };
      addComment(newComment);
      setCommentText('');
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: '1rem', background: '#fff', padding: '1rem', borderRadius: '8px', boxShadow: '0 1px 4px rgba(0,0,0,0.05)' }}>
      <textarea
        value={commentText}
        onChange={(e) => setCommentText(e.target.value)}
        placeholder="Write a comment..."
        rows={3}
        style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ddd', marginBottom: '8px' }}
      />
      <button type="submit" style={{ padding: '8px 16px', borderRadius: '4px', background: '#7c3aed', color: '#fff', border: 'none' }}>
        Add Comment
      </button>
    </form>
  );
};

export default CommentBox;