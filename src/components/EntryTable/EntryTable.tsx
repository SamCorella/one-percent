import { useState } from 'react';
import type { Entry } from '../../lib/types';
import styles from './EntryTable.module.css';

interface EntryTableProps {
  entries: Entry[];
  onEntryClick: (entry: Entry) => void;
}

const PAGE_SIZE = 15;

function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString('en-US', {
    weekday: 'short',
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}

export function EntryTable({ entries, onEntryClick }: EntryTableProps) {
  const [currentPage, setCurrentPage] = useState(0);

  const totalPages = Math.max(1, Math.ceil(entries.length / PAGE_SIZE));
  const startIdx = currentPage * PAGE_SIZE;
  const pageEntries = entries.slice(startIdx, startIdx + PAGE_SIZE);

  if (entries.length === 0) {
    return null;
  }

  return (
    <div className={styles.container}>
      <h3 className={styles.heading}>All Entries</h3>

      <table className={styles.table}>
        <thead>
          <tr>
            <th className={styles.th}>Date</th>
          </tr>
        </thead>
        <tbody>
          {pageEntries.map((entry) => (
            <tr
              key={entry.id}
              className={styles.row}
              onClick={() => onEntryClick(entry)}
            >
              <td className={styles.td}>{formatDate(entry.created_at)}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {totalPages > 1 && (
        <div className={styles.pagination}>
          <button
            className={styles.pageButton}
            onClick={() => setCurrentPage((p) => p - 1)}
            disabled={currentPage === 0}
          >
            Previous
          </button>
          <span className={styles.pageInfo}>
            Page {currentPage + 1} of {totalPages}
          </span>
          <button
            className={styles.pageButton}
            onClick={() => setCurrentPage((p) => p + 1)}
            disabled={currentPage === totalPages - 1}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}
