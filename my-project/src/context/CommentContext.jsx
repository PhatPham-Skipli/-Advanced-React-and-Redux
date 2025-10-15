import React, { createContext, useState } from 'react';

const CommentContext = createContext();

export const CommentProvider = ({ children }) => {
  const [comments, setComments] = useState([]);

  const clearComments = () => setComments([]);

  const addComment = (comment) => {
    setComments([...comments, comment]);
  };

  const updateComment = (id, updatedText) => {
    setComments(comments.map(comment => (comment.id === id ? { ...comment, text: updatedText } : comment)));
  };

  const deleteComment = (id) => {
    setComments(comments.filter(comment => comment.id !== id));
  };

  return (
    <CommentContext.Provider value={{ comments, addComment, updateComment, deleteComment, clearComments }}>
      {children}
    </CommentContext.Provider>
  );
};

export default CommentContext;