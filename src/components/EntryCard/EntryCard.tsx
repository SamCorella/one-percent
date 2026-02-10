import Markdown from 'react-markdown';
import type { Entry } from '../../lib/types';
import styles from './EntryCard.module.css';

interface EntryCardProps {
  entry: Entry;
}

function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

export function EntryCard({ entry }: EntryCardProps) {
  return (
    <div className={styles.card}>
      <p className={styles.date}>{formatDate(entry.created_at)}</p>
      <div className={styles.content}>
        <Markdown>{entry.content}</Markdown>
      </div>
    </div>
  );
}
