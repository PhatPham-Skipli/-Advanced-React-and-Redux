import React from 'react';

const AccountSkeleton = () => {
  return (
    <div className="animate-pulse">
      <div className="h-6 bg-gray-200 rounded w-1/3 mb-4"></div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr>
              {[...Array(6)].map((_, i) => (
                <th key={i} className="py-3 px-2">
                  <div className="h-4 bg-gray-200 rounded w-3/4 mx-auto"></div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {[...Array(5)].map((_, i) => (
              <tr key={i}>
                {[...Array(6)].map((_, j) => (
                  <td key={j} className="py-3 px-2">
                    <div className="h-4 bg-gray-100 rounded w-full"></div>
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AccountSkeleton;