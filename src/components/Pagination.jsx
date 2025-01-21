import React from 'react';

function Pagination({ pagination, onPageChange }) {
  return (
    <div className="pagination-container">
      <button
        onClick={() => onPageChange(pagination.page - 1)}
        disabled={pagination.page === 1}
      >
        Previous
      </button>
      <button
        onClick={() => onPageChange(pagination.page + 1)}
        disabled={pagination.page * pagination.limit >= pagination.total}
      >
        Next
      </button>
    </div>
  );
}

export default Pagination;
