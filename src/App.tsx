import { useAuth } from './hooks/useAuth';
import { useEntries } from './hooks/useEntries';
import { AuthForm } from './components/AuthForm/AuthForm';
import { MainPage } from './components/MainPage/MainPage';

export default function App() {
  const { user, loading: authLoading, signIn, signUp, signOut } = useAuth();

  if (authLoading) {
    return null;
  }

  if (!user) {
    return <AuthForm signIn={signIn} signUp={signUp} />;
  }

  return <AuthenticatedApp user={user} signOut={signOut} />;
}

// Separate component so useEntries only runs when authenticated
function AuthenticatedApp({
  user,
  signOut,
}: {
  user: NonNullable<ReturnType<typeof useAuth>['user']>;
  signOut: () => void;
}) {
  const { entries, loading, todayEntry, submitEntry } = useEntries(user.id);

  return (
    <MainPage
      user={user}
      signOut={signOut}
      entries={entries}
      todayEntry={todayEntry}
      submitEntry={submitEntry}
      loading={loading}
    />
  );
}
