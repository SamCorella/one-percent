import { type FormEvent, useState } from 'react';
import styles from './AuthForm.module.css';

interface AuthFormProps {
  signIn: (email: string, password: string) => Promise<{ error: Error | null }>;
  signUp: (email: string, password: string) => Promise<{ error: Error | null }>;
}

export function AuthForm({ signIn, signUp }: AuthFormProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (mode: 'signin' | 'signup') => {
    setError('');
    setSubmitting(true);

    const { error } = mode === 'signin'
      ? await signIn(email, password)
      : await signUp(email, password);

    if (error) {
      setError(error.message);
    }
    setSubmitting(false);
  };

  const onFormSubmit = (e: FormEvent) => {
    e.preventDefault();
    handleSubmit('signin');
  };

  return (
    <div className={styles.container}>
      <form className={styles.card} onSubmit={onFormSubmit}>
        <h1 className={styles.title}>One Percent</h1>
        <p className={styles.tagline}>Get 1% better every day</p>

        <div className={styles.field}>
          <label htmlFor="email" className={styles.label}>Email</label>
          <input
            id="email"
            type="email"
            className={styles.input}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            autoComplete="email"
          />
        </div>

        <div className={styles.field}>
          <label htmlFor="password" className={styles.label}>Password</label>
          <input
            id="password"
            type="password"
            className={styles.input}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            minLength={6}
            autoComplete="current-password"
          />
        </div>

        {error && <p className={styles.error}>{error}</p>}

        <div className={styles.buttons}>
          <button
            type="submit"
            className={styles.buttonPrimary}
            disabled={submitting}
          >
            Sign In
          </button>
          <button
            type="button"
            className={styles.buttonSecondary}
            disabled={submitting}
            onClick={() => handleSubmit('signup')}
          >
            Sign Up
          </button>
        </div>
      </form>
    </div>
  );
}
