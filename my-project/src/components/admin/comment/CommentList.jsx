import React, { useContext } from 'react';
import CommentShow from './CommentShow';
import CommentContext from '../../../context/admin/CommentContext';
import CommentSkeleton from './CommentSkeleton';

const CommentList = () => {
  const { comments, loading } = useContext(CommentContext);

  return (
    <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-6">
      {loading ? (
        <CommentSkeleton />
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-gray-900">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-2">Content</th>
                <th className="text-left py-3 px-2">Author</th>
                <th className="text-left py-3 px-2">Status</th>
                <th className="text-left py-3 px-2">Created</th>
              </tr>
            </thead>
            <tbody>
              {comments.length > 0 ? (
                comments.map((comment) => (
                  <CommentShow key={comment.id} comment={comment} />
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="text-center py-8 text-gray-400">
                    No comments found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default CommentList;