import React, { createContext, useState, useCallback, useEffect } from 'react';
import { getAccounts, deleteAccount, restoreAccount } from '../../service/admin/userService';

const AccountContext = createContext();

export const AccountProvider = ({ children }) => {
  const [accounts, setAccounts] = useState([]);
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

  const fetchAccounts = useCallback(async () => {
    setLoading(true);
    try {
      const res = await getAccounts({
        page: pagination.page,
        limit: pagination.limit,
        search: filters.search,
        order: filters.order,
        isActive: filters.isActive,
      });
      setAccounts(res.data || []);
      setPagination(prev => ({
        ...prev,
        total: res.total || 0,
      }));
    } catch (err) {
      console.error('Fetch accounts error:', err);
      setAccounts([]);
    } finally {
      setLoading(false);
    }
  }, [pagination.page, pagination.limit, filters.search, filters.order, filters.isActive]);

  useEffect(() => {
    fetchAccounts();
  }, [fetchAccounts]);

  const clearAccounts = useCallback(() => setAccounts([]), []);

  const updateFilters = useCallback((newFilters) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
    setPagination(prev => ({ ...prev, page: 1 }));
  }, []);

  const updatePagination = useCallback((newPagination) => {
    setPagination(prev => ({ ...prev, ...newPagination }));
  }, []);

  const handleDeleteAccount = async (id) => {
    await deleteAccount(id);
    fetchAccounts();
  };

  const handleRestoreAccount = async (id) => {
    await restoreAccount(id);
    fetchAccounts();
  };

  const value = {
    accounts,
    loading,
    pagination,
    filters,
    setFilters: updateFilters,
    setPagination: updatePagination,
    fetchAccounts,
    clearAccounts,
    deleteAccount: handleDeleteAccount,
    restoreAccount: handleRestoreAccount,
  };

  return (
    <AccountContext.Provider value={value}>
      {children}
    </AccountContext.Provider>
  );
};

export default AccountContext;