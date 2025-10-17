import React, { useContext } from 'react'
import AccountShow from './AccountShow'
import AccountContext from '../../../context/admin/AccountContext'
import AccountSkeleton from './AccountSkeleton';

const AccountList = ({ onView, onEdit, onDelete }) => {
  const { accounts, loading } = useContext(AccountContext);

  return (
    <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-6">
      {loading ? (
        <AccountSkeleton />
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-gray-900">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-2">Email</th>
                <th className="text-left py-3 px-2">Username</th>
                <th className="text-left py-3 px-2">Role</th>
                <th className="text-left py-3 px-2">Status</th>
                <th className="text-left py-3 px-2">Created</th>
                <th className="text-left py-3 px-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {accounts.length > 0 ? (
                accounts.map((account) => (
                  <AccountShow
                    key={account.id}
                    account={account}
                    onView={onView}
                    onEdit={onEdit}
                    onDelete={onDelete}
                  />
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="text-center py-8 text-gray-400">
                    No accounts found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}

export default AccountList