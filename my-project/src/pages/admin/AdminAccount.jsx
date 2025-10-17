import React, { useContext, useEffect, useState } from 'react'
import { IoSearchOutline } from "react-icons/io5"
import AccountContext from '../../context/admin/AccountContext'
import AccountList from '../../components/admin/account/AccountList'

const AdminAccount = () => {
  const {
    accounts,
    loading,
    filters,
    setFilters,
  } = useContext(AccountContext)
  const [search, setSearch] = useState(filters.search || '')

  useEffect(() => {
    const timer = setTimeout(() => {
      if (search !== filters.search) {
        setFilters({ search });
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [search, filters.search, setFilters]);

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Account Management</h1>
      <div className="mb-6 flex gap-4">
        <div className="relative w-full max-w-md">
          <IoSearchOutline className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search accounts by email or username..."
            value={search}
            onChange={handleSearchChange}
            className="w-full pl-10 pr-4 py-2 bg-white border border-gray-200 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-300"
          />
        </div>
      </div>
      <AccountList
        accounts={accounts}
        loading={loading}
      />
    </div>
  )
}

export default AdminAccount