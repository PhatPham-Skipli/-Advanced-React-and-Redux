import React, { createContext, useState, useCallback, useEffect } from 'react';
import { getComments } from '../../service/admin/commentService';

const CommentContext = createContext();

export const CommentProvider = ({ children }) => {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    total: 0,
  });
  const [filters, setFilters] = useState({
    search: '',
    order: 'DESC',
    isActive: '',
  });

  const fetchComments = useCallback(async () => {
    setLoading(true);
    try {
      const res = await getComments({
        page: pagination.page,
        limit: pagination.limit,
        search: filters.search,
        order: filters.order,
        isActive: filters.isActive,
      });
      setComments(res.data || []);
      setPagination(prev => ({
        ...prev,
        total: res.total || 0,
      }));
    } catch (err) {
      console.error('Fetch comments error:', err);
      setComments([]);
    } finally {
      setLoading(false);
    }
  }, [pagination.page, pagination.limit, filters.search, filters.order, filters.isActive]);

  useEffect(() => {
    fetchComments();
  }, [fetchComments]);

  const clearComments = useCallback(() => setComments([]), []);

  const updateFilters = useCallback((newFilters) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
    setPagination(prev => ({ ...prev, page: 1 }));
  }, []);

  const updatePagination = useCallback((newPagination) => {
    setPagination(prev => ({ ...prev, ...newPagination }));
  }, []);

  const value = {
    comments,
    loading,
    pagination,
    filters,
    setFilters: updateFilters,
    setPagination: updatePagination,
    fetchComments,
    clearComments,
  };

  return (
    <CommentContext.Provider value={value}>
      {children}
    </CommentContext.Provider>
  );
};

export default CommentContext;