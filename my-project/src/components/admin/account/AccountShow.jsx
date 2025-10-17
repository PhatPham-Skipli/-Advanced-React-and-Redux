import React, { useContext, useState } from 'react'
import { IoEyeOutline, IoPencilOutline, IoTrashOutline, IoRefreshOutline } from "react-icons/io5"
import AccountContext from '../../../context/admin/AccountContext'
import ConfirmModal from '../ConfirmModal';

const AccountShow = ({ account, onView, onEdit }) => {
  const { deleteAccount, restoreAccount } = useContext(AccountContext);
  const [showConfirm, setShowConfirm] = useState(false);
  const [showRestoreConfirm, setShowRestoreConfirm] = useState(false);

  const handleDelete = () => setShowConfirm(true);
  const confirmDelete = () => { deleteAccount(account.id); setShowConfirm(false); };
  const cancelDelete = () => setShowConfirm(false);

  const handleRestore = () => setShowRestoreConfirm(true);
  const confirmRestore = () => { restoreAccount(account.id); setShowRestoreConfirm(false); };
  const cancelRestore = () => setShowRestoreConfirm(false);

  return (
    <>
      <tr key={account.id} className="border-b border-gray-100 hover:bg-gray-50">
        <td className="py-3 px-2 font-medium">{account.email}</td>
        <td className="py-3 px-2">{account.username}</td>
        <td className="py-3 px-2">{account.role}</td>
        <td className={`py-3 px-2 font-bold ${account.isActive ? "text-green-600" : "text-red-600"}`}>
          {account.isActive ? "Active" : "Inactive"}
        </td>
        <td className="py-3 px-2 text-gray-600">
          {new Date(account.createdAt).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
          })}
        </td>
        <td className="py-3 px-2">
          <div className="flex gap-2">
            {/* <button
              className="text-blue-500 hover:text-blue-700 p-1 rounded transition-colors"
              title="View"
              onClick={() => onView && onView(account)}
            >
              <IoEyeOutline />
            </button>
            <button
              className="text-green-500 hover:text-green-700 p-1 rounded transition-colors"
              title="Edit"
              onClick={() => onEdit && onEdit(account)}
            >
              <IoPencilOutline />
            </button> */}
            {account.isActive ? (
              <button
                className="text-red-500 hover:text-red-700 p-1 rounded transition-colors"
                title="Delete"
                onClick={handleDelete}
              >
                <IoTrashOutline />
              </button>
            ) : (
              <button
                className="text-purple-500 hover:text-purple-700 p-1 rounded transition-colors"
                title="Restore"
                onClick={handleRestore}
              >
                <IoRefreshOutline />
              </button>
            )}
          </div>
        </td>
      </tr>
      {showConfirm && (
        <ConfirmModal
          show={showConfirm}
          onConfirm={confirmDelete}
          onCancel={cancelDelete}
        />
      )}
      {showRestoreConfirm && (
        <ConfirmModal
          show={showRestoreConfirm}
          onConfirm={confirmRestore}
          onCancel={cancelRestore}
          title="Confirm Restore"
          message="Are you sure you want to restore this account?"
          confirmText="Restore"
        />
      )}
    </>
  )
}

export default AccountShow