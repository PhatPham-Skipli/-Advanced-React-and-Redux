import React, { useContext } from 'react';
import CommentShow from './CommentShow';
import CommentContext from '../../context/CommentContext';
import CommentSkeleton from './CommentSkeleton';

const CommentList = () => {
  const { comments, loading } = useContext(CommentContext);

  return (
    <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6">
      {loading ? (
        <CommentSkeleton />
      ) : comments.length > 0 ? (
        <div className="space-y-3">
          {comments.map((comment) => (
            <CommentShow key={comment.id} comment={comment} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-gray-400 text-lg mb-2">No comments yet</p>
          <p className="text-gray-300 text-sm">Click "Add Comment" to create your first comment!</p>
        </div>
      )}
    </div>
  );
};

export default CommentList;