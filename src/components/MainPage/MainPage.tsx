import { useEffect, useState } from 'react';
import type { User } from '@supabase/supabase-js';
import type { Entry } from '../../lib/types';
import { EntryModal } from '../EntryModal/EntryModal';
import { CardSlideshow } from '../CardSlideshow/CardSlideshow';
import { EntryTable } from '../EntryTable/EntryTable';
import { EntryPopup } from '../EntryPopup/EntryPopup';
import styles from './MainPage.module.css';

interface MainPageProps {
  user: User;
  signOut: () => void;
  entries: Entry[];
  todayEntry: Entry | null;
  submitEntry: (content: string) => Promise<void>;
  loading: boolean;
}

export function MainPage({
  user,
  signOut,
  entries,
  todayEntry,
  submitEntry,
  loading,
}: MainPageProps) {
  const [showEntryModal, setShowEntryModal] = useState(false);
  const [selectedEntry, setSelectedEntry] = useState<Entry | null>(null);
  const [autoModalShown, setAutoModalShown] = useState(false);

  // Auto-open modal on first load if no entry today
  useEffect(() => {
    if (!loading && !todayEntry && !autoModalShown) {
      setShowEntryModal(true);
      setAutoModalShown(true);
    }
  }, [loading, todayEntry, autoModalShown]);

  const recentEntries = entries.slice(0, 7);

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <div className={styles.headerLeft}>
          <h1 className={styles.title}>One Percent</h1>
        </div>
        <div className={styles.headerRight}>
          <span className={styles.email}>{user.email}</span>
          <button className={styles.signOutButton} onClick={signOut}>
            Sign Out
          </button>
        </div>
      </header>

      <main className={styles.main}>
        <div className={styles.toolbar}>
          <button
            className={styles.newEntryButton}
            onClick={() => setShowEntryModal(true)}
            disabled={todayEntry !== null}
            title={todayEntry ? 'Already journaled today' : 'Add today\'s entry'}
          >
            + New Entry
          </button>
        </div>

        {loading ? (
          <div className={styles.loading}>Loading your entries...</div>
        ) : (
          <>
            <CardSlideshow entries={recentEntries} />
            <EntryTable
              entries={entries}
              onEntryClick={(entry) => setSelectedEntry(entry)}
            />
          </>
        )}
      </main>

      <EntryModal
        isOpen={showEntryModal}
        onClose={() => setShowEntryModal(false)}
        onSubmit={submitEntry}
      />

      <EntryPopup
        entry={selectedEntry}
        isOpen={selectedEntry !== null}
        onClose={() => setSelectedEntry(null)}
      />
    </div>
  );
}
