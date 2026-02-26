import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/lib/supabase';
import { Candidate } from '@/data/jobPostings';
import { toast } from '@/components/ui/use-toast';

interface UseCandidatesReturn {
  candidates: Candidate[];
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
  updateCandidateStatus: (id: string, status: Candidate['status']) => Promise<boolean>;
}

export function useCandidates(): UseCandidatesReturn {
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchCandidates = useCallback(async () => {
    try {
      setError(null);
      const { data, error: fetchError } = await supabase
        .from('candidates')
        .select(`
          *,
          job_posting:job_postings (
            id,
            job_code,
            job_title,
            department
          )
        `)
        .order('created_at', { ascending: false });

      if (fetchError) throw fetchError;

      const mapped: Candidate[] = (data || []).map((row: any) => ({
        id: row.id,
        candidate_code: row.candidate_code,
        name: row.name,
        email: row.email,
        phone: row.phone,
        job_posting_id: row.job_posting_id,
        position_applied: row.position_applied,
        status: row.status,
        applied_date: row.applied_date,
        location: row.location,
        notes: row.notes,
        created_at: row.created_at,
        updated_at: row.updated_at,
        job_posting: row.job_posting || undefined,
      }));

      setCandidates(mapped);
    } catch (err: any) {
      console.error('Error fetching candidates:', err);
      setError(err.message || 'Gagal memuat data kandidat');
    } finally {
      setLoading(false);
    }
  }, []);

  const updateCandidateStatus = useCallback(async (id: string, status: Candidate['status']): Promise<boolean> => {
    try {
      const { error: updateError } = await supabase
        .from('candidates')
        .update({ status })
        .eq('id', id);

      if (updateError) throw updateError;

      toast({
        title: 'Status Kandidat Diperbarui',
        description: `Status berhasil diubah ke ${status}.`,
      });

      return true;
    } catch (err: any) {
      console.error('Error updating candidate:', err);
      toast({
        title: 'Gagal Memperbarui',
        description: err.message || 'Terjadi kesalahan.',
        variant: 'destructive',
      });
      return false;
    }
  }, []);

  // Initial fetch
  useEffect(() => {
    fetchCandidates();
  }, [fetchCandidates]);

  // Real-time subscription
  useEffect(() => {
    const channel = supabase
      .channel('candidates_changes')
      .on(
        'postgres_changes',
        { event: '*', schema: '*', table: 'candidates' },
        (payload) => {
          console.log('Candidates realtime event:', payload.eventType);
          // Refetch to get joined data properly
          fetchCandidates();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [fetchCandidates]);

  return {
    candidates,
    loading,
    error,
    refetch: fetchCandidates,
    updateCandidateStatus,
  };
}
