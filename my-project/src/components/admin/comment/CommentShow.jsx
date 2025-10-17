import React from 'react';

const CommentShow = ({ comment }) => {
  return (
    <tr className="border-b border-gray-100 hover:bg-gray-50">
      <td className="py-3 px-2">{comment.content}</td>
      <td className="py-3 px-2">{comment.author}</td>
      <td className={`py-3 px-2 font-bold ${comment.isActive ? "text-green-600" : "text-red-600"}`}>
        {comment.isActive ? "Active" : "Inactive"}
      </td>
      <td className="py-3 px-2 text-gray-600">
        {comment.createdAt
          ? new Date(comment.createdAt).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'short',
              day: 'numeric'
            })
          : ''}
      </td>
    </tr>
  );
};

export default CommentShow;