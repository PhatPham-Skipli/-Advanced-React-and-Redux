import React, { useState } from 'react';
import { IoAddOutline } from "react-icons/io5";
import CommentList from '../components/comment/CommentList';
import CreateCommentModal from '../components/comment/CreateCommentModal';

const CommentPage = () => {
  const [showCreateModal, setShowCreateModal] = useState(false);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-900">My Comments</h1>
        <button
          onClick={() => setShowCreateModal(true)}
          className="flex items-center gap-2 px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors shadow-md"
        >
          <IoAddOutline size={20} />
          Add Comment
        </button>
      </div>
      <CommentList />
      <CreateCommentModal 
        open={showCreateModal} 
        onClose={() => setShowCreateModal(false)} 
      />
    </div>
  );
}

export default CommentPage;