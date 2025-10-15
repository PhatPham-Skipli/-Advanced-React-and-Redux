import React from 'react';
import { CommentProvider } from '../context/CommentContext';
import CommentBox from '../components/comment/CommentBox';
import CommentList from '../components/comment/CommentList';

const CommentPage = () => {
  return (
    <CommentProvider>
      <div>
        <h1>Comments</h1>
        <CommentBox />
        <CommentList />
      </div>
    </CommentProvider>
  );
}

export default CommentPage;