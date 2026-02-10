import Markdown from 'react-markdown';
import type { Entry } from '../../lib/types';
import styles from './EntryPopup.module.css';

interface EntryPopupProps {
  entry: Entry | null;
  isOpen: boolean;
  onClose: () => void;
}

function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

export function EntryPopup({ entry, isOpen, onClose }: EntryPopupProps) {
  if (!isOpen || !entry) return null;

  return (
    <div className={styles.backdrop} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <button className={styles.closeButton} onClick={onClose} aria-label="Close">
          &times;
        </button>

        <p className={styles.date}>{formatDate(entry.created_at)}</p>

        <div className={styles.content}>
          <Markdown>{entry.content}</Markdown>
        </div>
      </div>
    </div>
  );
}
