import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/lib/supabase';
import { Employee } from '@/data/jobPostings';

interface UseEmployeesReturn {
  employees: Employee[];
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

export function useEmployees(): UseEmployeesReturn {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchEmployees = useCallback(async () => {
    try {
      setError(null);
      const { data, error: fetchError } = await supabase
        .from('employees')
        .select('*')
        .order('join_date', { ascending: false });

      if (fetchError) throw fetchError;

      const mapped: Employee[] = (data || []).map((row: any) => ({
        id: row.id,
        employee_code: row.employee_code,
        name: row.name,
        email: row.email,
        phone: row.phone,
        department: row.department,
        position: row.position,
        status: row.status,
        join_date: row.join_date,
        created_at: row.created_at,
        updated_at: row.updated_at,
      }));

      setEmployees(mapped);
    } catch (err: any) {
      console.error('Error fetching employees:', err);
      setError(err.message || 'Gagal memuat data karyawan');
    } finally {
      setLoading(false);
    }
  }, []);

  // Initial fetch
  useEffect(() => {
    fetchEmployees();
  }, [fetchEmployees]);

  // Real-time subscription
  useEffect(() => {
    const channel = supabase
      .channel('employees_changes')
      .on(
        'postgres_changes',
        { event: '*', schema: '*', table: 'employees' },
        (payload) => {
          console.log('Employees realtime event:', payload.eventType);

          if (payload.eventType === 'INSERT') {
            const newEmp = payload.new as Employee;
            setEmployees((prev) => {
              if (prev.some((e) => e.id === newEmp.id)) return prev;
              return [newEmp, ...prev];
            });
          } else if (payload.eventType === 'UPDATE') {
            const updated = payload.new as Employee;
            setEmployees((prev) =>
              prev.map((e) => (e.id === updated.id ? { ...e, ...updated } : e))
            );
          } else if (payload.eventType === 'DELETE') {
            const deleted = payload.old as { id: string };
            setEmployees((prev) => prev.filter((e) => e.id !== deleted.id));
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  return {
    employees,
    loading,
    error,
    refetch: fetchEmployees,
  };
}
