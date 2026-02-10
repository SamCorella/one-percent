import { useCallback, useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import type { Entry } from '../lib/types';

function isToday(dateStr: string): boolean {
  const entryDate = new Date(dateStr);
  const today = new Date();
  return (
    entryDate.getFullYear() === today.getFullYear() &&
    entryDate.getMonth() === today.getMonth() &&
    entryDate.getDate() === today.getDate()
  );
}

export function useEntries(userId: string) {
  const [entries, setEntries] = useState<Entry[]>([]);
  const [loading, setLoading] = useState(true);
  const [todayEntry, setTodayEntry] = useState<Entry | null>(null);

  const fetchEntries = useCallback(async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('entries')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching entries:', error);
    } else {
      const fetched = data ?? [];
      setEntries(fetched);
      setTodayEntry(
        fetched.length > 0 && isToday(fetched[0].created_at)
          ? fetched[0]
          : null
      );
    }
    setLoading(false);
  }, [userId]);

  useEffect(() => {
    fetchEntries();
  }, [fetchEntries]);

  const submitEntry = async (content: string) => {
    const { error } = await supabase
      .from('entries')
      .insert({ user_id: userId, content });

    if (error) {
      console.error('Error inserting entry:', error);
      throw error;
    }
    await fetchEntries();
  };

  return { entries, loading, todayEntry, submitEntry };
}
