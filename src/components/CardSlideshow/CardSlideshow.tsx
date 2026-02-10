import { useRef, useState } from 'react';
import type { Entry } from '../../lib/types';
import { EntryCard } from '../EntryCard/EntryCard';
import styles from './CardSlideshow.module.css';

interface CardSlideshowProps {
  entries: Entry[];
}

export function CardSlideshow({ entries }: CardSlideshowProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const touchStartX = useRef(0);

  if (entries.length === 0) {
    return (
      <div className={styles.empty}>
        <p>No entries yet. Start your journey today.</p>
      </div>
    );
  }

  const prev = () => setCurrentIndex((i) => Math.max(0, i - 1));
  const next = () => setCurrentIndex((i) => Math.min(entries.length - 1, i + 1));

  const onTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const onTouchEnd = (e: React.TouchEvent) => {
    const delta = e.changedTouches[0].clientX - touchStartX.current;
    if (delta > 50) prev();
    if (delta < -50) next();
  };

  return (
    <div className={styles.container}>
      <div
        className={styles.slideArea}
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
      >
        <button
          className={`${styles.arrow} ${styles.arrowLeft}`}
          onClick={prev}
          disabled={currentIndex === 0}
          aria-label="Previous entry"
        >
          &#8249;
        </button>

        <div className={styles.cardWrapper}>
          <EntryCard entry={entries[currentIndex]} />
        </div>

        <button
          className={`${styles.arrow} ${styles.arrowRight}`}
          onClick={next}
          disabled={currentIndex === entries.length - 1}
          aria-label="Next entry"
        >
          &#8250;
        </button>
      </div>

      <div className={styles.dots}>
        {entries.map((_, i) => (
          <button
            key={i}
            className={`${styles.dot} ${i === currentIndex ? styles.dotActive : ''}`}
            onClick={() => setCurrentIndex(i)}
            aria-label={`Go to entry ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
