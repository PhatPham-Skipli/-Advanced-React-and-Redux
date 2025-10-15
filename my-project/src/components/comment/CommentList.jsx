import React, { useContext } from 'react';
import CommentContext from '../../context/CommentContext';
import CommentItem from './CommentItem';

const CommentList = () => {
  const { comments, clearComments } = useContext(CommentContext);

  return (
    <div style={{
      background: '#fff',
      borderRadius: '8px',
      padding: '1rem',
      boxShadow: '0 1px 8px rgba(0,0,0,0.06)',
      marginBottom: '2rem'
    }}>
      <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '12px' }}>
        <button
          onClick={clearComments}
          style={{
            padding: '6px 12px',
            borderRadius: '4px',
            border: 'none',
            background: '#ef4444',
            color: '#fff',
            cursor: 'pointer'
          }}
          disabled={comments.length === 0}
        >
          Xóa tất cả
        </button>
      </div>
      {comments.length === 0 ? (
        <p style={{ color: '#888', textAlign: 'center' }}>No comments yet. Be the first to comment!</p>
      ) : (
        comments.map(comment => (
          <CommentItem key={comment.id} comment={comment} />
        ))
      )}
    </div>
  );
};

export default CommentList;