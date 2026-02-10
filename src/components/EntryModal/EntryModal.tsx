import { useState } from 'react';
import Markdown from 'react-markdown';
import styles from './EntryModal.module.css';

interface EntryModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (content: string) => Promise<void>;
}

const MAX_CHARS = 300;

export function EntryModal({ isOpen, onClose, onSubmit }: EntryModalProps) {
  const [content, setContent] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [showPreview, setShowPreview] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async () => {
    if (!content.trim() || submitting) return;
    setSubmitting(true);
    try {
      await onSubmit(content.trim());
      setContent('');
      setShowPreview(false);
      onClose();
    } catch {
      // error is logged in the hook
    } finally {
      setSubmitting(false);
    }
  };

  const counterClass =
    content.length >= MAX_CHARS
      ? styles.counterLimit
      : content.length >= 270
        ? styles.counterWarning
        : styles.counter;

  return (
    <div className={styles.backdrop} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <button className={styles.closeButton} onClick={onClose} aria-label="Close">
          &times;
        </button>

        <h2 className={styles.heading}>What did you learn today?</h2>
        <p className={styles.subheading}>Even the smallest insight counts. Write it down.</p>

        <div className={styles.toggleRow}>
          <button
            className={`${styles.toggleButton} ${!showPreview ? styles.toggleActive : ''}`}
            onClick={() => setShowPreview(false)}
          >
            Write
          </button>
          <button
            className={`${styles.toggleButton} ${showPreview ? styles.toggleActive : ''}`}
            onClick={() => setShowPreview(true)}
          >
            Preview
          </button>
        </div>

        <div className={styles.editorArea}>
          {showPreview ? (
            <div className={styles.preview}>
              {content.trim() ? (
                <Markdown>{content}</Markdown>
              ) : (
                <p className={styles.previewEmpty}>Nothing to preview yet.</p>
              )}
            </div>
          ) : (
            <textarea
              className={styles.textarea}
              value={content}
              onChange={(e) => setContent(e.target.value.slice(0, MAX_CHARS))}
              placeholder="I learned that..."
              maxLength={MAX_CHARS}
              autoFocus
            />
          )}
        </div>

        <div className={styles.footer}>
          <span className={counterClass}>{content.length}/{MAX_CHARS}</span>
          <button
            className={styles.submitButton}
            onClick={handleSubmit}
            disabled={!content.trim() || submitting}
          >
            {submitting ? 'Saving...' : 'Submit'}
          </button>
        </div>
      </div>
    </div>
  );
}
