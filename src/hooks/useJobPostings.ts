import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/lib/supabase';
import { JobPosting } from '@/data/jobPostings';
import { toast } from '@/components/ui/use-toast';

interface UseJobPostingsReturn {
  jobs: JobPosting[];
  loading: boolean;
  error: string | null;
  creating: boolean;
  refetch: () => Promise<void>;
  createJob: (job: Partial<JobPosting>) => Promise<JobPosting | null>;
  updateJob: (id: string, updates: Partial<JobPosting>) => Promise<boolean>;
  deleteJob: (id: string) => Promise<boolean>;
  toggleStatus: (job: JobPosting) => Promise<boolean>;
}

export function useJobPostings(): UseJobPostingsReturn {
  const [jobs, setJobs] = useState<JobPosting[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [creating, setCreating] = useState(false);

  const fetchJobs = useCallback(async () => {
    try {
      setError(null);
      const { data, error: fetchError } = await supabase
        .from('job_postings')
        .select('*')
        .order('created_at', { ascending: false });

      if (fetchError) throw fetchError;

      // Map database rows to JobPosting interface
      const mapped: JobPosting[] = (data || []).map((row: any) => ({
        id: row.id,
        job_code: row.job_code,
        job_title: row.job_title,
        department: row.department,
        location: row.location,
        status: row.status,
        applicants_count: row.applicants_count,
        posted_date: row.posted_date,
        deadline: row.deadline,
        hired: row.hired,
        description: row.description,
        salary_range: row.salary_range,
        employment_type: row.employment_type,
        created_at: row.created_at,
        updated_at: row.updated_at,
      }));

      setJobs(mapped);
    } catch (err: any) {
      console.error('Error fetching job postings:', err);
      setError(err.message || 'Gagal memuat data lowongan');
    } finally {
      setLoading(false);
    }
  }, []);

  // Generate next job code
  const generateJobCode = useCallback(async (): Promise<string> => {
    const { data } = await supabase
      .from('job_postings')
      .select('job_code')
      .order('job_code', { ascending: false })
      .limit(1);

    if (data && data.length > 0) {
      const lastCode = data[0].job_code;
      const num = parseInt(lastCode.replace('JP-', ''), 10);
      return `JP-${String(num + 1).padStart(3, '0')}`;
    }
    return 'JP-001';
  }, []);

  const createJob = useCallback(async (jobData: Partial<JobPosting>): Promise<JobPosting | null> => {
    try {
      setCreating(true);
      const jobCode = await generateJobCode();
      const today = new Date().toISOString().split('T')[0];

      const insertData = {
        job_code: jobCode,
        job_title: jobData.job_title || '',
        department: jobData.department || '',
        location: jobData.location || '',
        status: jobData.status || 'draft',
        applicants_count: 0,
        posted_date: today,
        deadline: jobData.deadline || '—',
        hired: '—',
        description: jobData.description || null,
        salary_range: jobData.salary_range || null,
        employment_type: jobData.employment_type || 'Full-time',
      };

      const { data, error: insertError } = await supabase
        .from('job_postings')
        .insert(insertData)
        .select()
        .single();

      if (insertError) throw insertError;

      toast({
        title: 'Lowongan Dibuat',
        description: `${data.job_title} (${data.job_code}) berhasil dibuat.`,
      });

      return data as JobPosting;
    } catch (err: any) {
      console.error('Error creating job:', err);
      toast({
        title: 'Gagal Membuat Lowongan',
        description: err.message || 'Terjadi kesalahan saat membuat lowongan.',
        variant: 'destructive',
      });
      return null;
    } finally {
      setCreating(false);
    }
  }, [generateJobCode]);

  const updateJob = useCallback(async (id: string, updates: Partial<JobPosting>): Promise<boolean> => {
    try {
      const updateData: Record<string, any> = {};
      if (updates.job_title !== undefined) updateData.job_title = updates.job_title;
      if (updates.department !== undefined) updateData.department = updates.department;
      if (updates.location !== undefined) updateData.location = updates.location;
      if (updates.status !== undefined) updateData.status = updates.status;
      if (updates.deadline !== undefined) updateData.deadline = updates.deadline;
      if (updates.description !== undefined) updateData.description = updates.description;
      if (updates.salary_range !== undefined) updateData.salary_range = updates.salary_range;
      if (updates.employment_type !== undefined) updateData.employment_type = updates.employment_type;
      if (updates.hired !== undefined) updateData.hired = updates.hired;
      if (updates.applicants_count !== undefined) updateData.applicants_count = updates.applicants_count;

      const { error: updateError } = await supabase
        .from('job_postings')
        .update(updateData)
        .eq('id', id);

      if (updateError) throw updateError;

      toast({
        title: 'Lowongan Diperbarui',
        description: `${updates.job_title || 'Lowongan'} berhasil diperbarui.`,
      });

      return true;
    } catch (err: any) {
      console.error('Error updating job:', err);
      toast({
        title: 'Gagal Memperbarui',
        description: err.message || 'Terjadi kesalahan saat memperbarui lowongan.',
        variant: 'destructive',
      });
      return false;
    }
  }, []);

  const deleteJob = useCallback(async (id: string): Promise<boolean> => {
    try {
      const { error: deleteError } = await supabase
        .from('job_postings')
        .delete()
        .eq('id', id);

      if (deleteError) throw deleteError;

      toast({
        title: 'Lowongan Dihapus',
        description: 'Lowongan berhasil dihapus.',
      });

      return true;
    } catch (err: any) {
      console.error('Error deleting job:', err);
      toast({
        title: 'Gagal Menghapus',
        description: err.message || 'Terjadi kesalahan saat menghapus lowongan.',
        variant: 'destructive',
      });
      return false;
    }
  }, []);

  const toggleStatus = useCallback(async (job: JobPosting): Promise<boolean> => {
    const newStatus = job.status === 'published' ? 'closed' : 'published';
    try {
      const { error: updateError } = await supabase
        .from('job_postings')
        .update({ status: newStatus })
        .eq('id', job.id);

      if (updateError) throw updateError;

      toast({
        title: 'Status Diperbarui',
        description: `${job.job_title} sekarang ${newStatus === 'published' ? 'Published' : 'Closed'}.`,
      });

      return true;
    } catch (err: any) {
      console.error('Error toggling status:', err);
      toast({
        title: 'Gagal Memperbarui Status',
        description: err.message || 'Terjadi kesalahan.',
        variant: 'destructive',
      });
      return false;
    }
  }, []);

  // Initial fetch
  useEffect(() => {
    fetchJobs();
  }, [fetchJobs]);

  // Real-time subscription
  useEffect(() => {
    const channel = supabase
      .channel('job_postings_changes')
      .on(
        'postgres_changes',
        { event: '*', schema: '*', table: 'job_postings' },
        (payload) => {
          console.log('Job postings realtime event:', payload.eventType);

          if (payload.eventType === 'INSERT') {
            const newJob = payload.new as JobPosting;
            setJobs((prev) => {
              // Avoid duplicates
              if (prev.some((j) => j.id === newJob.id)) return prev;
              return [newJob, ...prev];
            });
          } else if (payload.eventType === 'UPDATE') {
            const updated = payload.new as JobPosting;
            setJobs((prev) =>
              prev.map((j) => (j.id === updated.id ? { ...j, ...updated } : j))
            );
          } else if (payload.eventType === 'DELETE') {
            const deleted = payload.old as { id: string };
            setJobs((prev) => prev.filter((j) => j.id !== deleted.id));
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  return {
    jobs,
    loading,
    error,
    creating,
    refetch: fetchJobs,
    createJob,
    updateJob,
    deleteJob,
    toggleStatus,
  };
}
