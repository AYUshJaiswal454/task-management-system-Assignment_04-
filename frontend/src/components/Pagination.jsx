import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

/**
 * Pagination Component
 * 
 * -------------------------------------------------------------
 * ISSUE 6 (TODO for Contributor): Add pagination to the task list
 * BUG / LIMITATION:
 * The pagination bar is rendered below, but tasks are not sliced by page size,
 * and page transitions are currently non-functional (stuck on page 1 of 1).
 * -------------------------------------------------------------
 */
export const Pagination = ({
  currentPage = 1,
  totalItems = 0,
  pageSize = 5,
  onPageChange = () => {},
}) => {
  // FIXME (Issue 6): Compute totalPages dynamically using Math.ceil(totalItems / pageSize)
  const totalPages = 1; 

  const handlePrevious = () => {
    // FIXME (Issue 6): Implement previous page transition if currentPage > 1
    console.log('Previous page clicked - Issue 6 pending implementation');
  };

  const handleNext = () => {
    // FIXME (Issue 6): Implement next page transition if currentPage < totalPages
    console.log('Next page clicked - Issue 6 pending implementation');
  };

  if (totalItems === 0) return null;

  return (
    <div className="pagination-bar">
      <div>
        Showing <strong>{totalItems}</strong> total {totalItems === 1 ? 'task' : 'tasks'} (all displayed)
      </div>

      <div className="pagination-controls">
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <button
          className="btn btn-secondary btn-sm"
          onClick={handlePrevious}
          disabled={true} // FIXME (Issue 6): Enable when currentPage > 1
          aria-label="Previous Page"
        >
          <ChevronLeft size={16} />
          <span>Previous</span>
        </button>

        <button
          className="btn btn-secondary btn-sm"
          onClick={handleNext}
          disabled={true} // FIXME (Issue 6): Enable when currentPage < totalPages
          aria-label="Next Page"
        >
          <span>Next</span>
          <ChevronRight size={16} />
        </button>
      </div>
    </div>
  );
};

export default Pagination;
