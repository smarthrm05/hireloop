import React, { useMemo } from 'react';
import { Briefcase, Users, CheckCircle, Clock, TrendingUp, ArrowUpRight, FileText, UserPlus, RefreshCw, Loader2 } from 'lucide-react';
import { useJobPostings } from '@/hooks/useJobPostings';
import { useCandidates } from '@/hooks/useCandidates';
import { useEmployees } from '@/hooks/useEmployees';

interface DashboardPageProps {
  onNavigate: (page: string) => void;
}

const DashboardPage: React.FC<DashboardPageProps> = ({ onNavigate }) => {
  const { jobs, loading: jobsLoading, refetch: refetchJobs } = useJobPostings();
  const { candidates, loading: candidatesLoading, refetch: refetchCandidates } = useCandidates();
  const { employees, loading: employeesLoading, refetch: refetchEmployees } = useEmployees();

  const isLoading = jobsLoading || candidatesLoading || employeesLoading;

  const stats = useMemo(() => {
    const publishedJobs = jobs.filter((j) => j.status === 'published').length;
    const totalCandidates = candidates.length;
    const hiredCandidates = candidates.filter((c) => c.status === 'hired').length;
    const activeEmployees = employees.filter((e) => e.status === 'active').length;

    return [
      {
        label: 'Lowongan Aktif',
        value: String(publishedJobs),
        change: `${jobs.length} total lowongan`,
        icon: <Briefcase size={22} className="text-blue-600" />,
        bg: 'bg-blue-50',
        border: 'border-blue-100',
      },
      {
        label: 'Total Kandidat',
        value: String(totalCandidates),
        change: `${candidates.filter((c) => c.status === 'new').length} kandidat baru`,
        icon: <Users size={22} className="text-purple-600" />,
        bg: 'bg-purple-50',
        border: 'border-purple-100',
      },
      {
        label: 'Hired',
        value: String(hiredCandidates),
        change: `dari ${totalCandidates} pelamar`,
        icon: <CheckCircle size={22} className="text-emerald-600" />,
        bg: 'bg-emerald-50',
        border: 'border-emerald-100',
      },
      {
        label: 'Karyawan Aktif',
        value: String(activeEmployees),
        change: `${employees.length} total karyawan`,
        icon: <Clock size={22} className="text-amber-600" />,
        bg: 'bg-amber-50',
        border: 'border-amber-100',
      },
    ];
  }, [jobs, candidates, employees]);

  const topJobs = useMemo(() => {
    return [...jobs]
      .sort((a, b) => b.applicants_count - a.applicants_count)
      .slice(0, 5)
      .map((j) => ({
        title: j.job_title,
        applicants: j.applicants_count,
        department: j.department,
        status: j.status,
      }));
  }, [jobs]);

  const recentCandidates = useMemo(() => {
    return [...candidates]
      .sort((a, b) => new Date(b.applied_date).getTime() - new Date(a.applied_date).getTime())
      .slice(0, 5);
  }, [candidates]);

  const handleRefreshAll = () => {
    refetchJobs();
    refetchCandidates();
    refetchEmployees();
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-sm text-gray-500 mt-1">Selamat datang kembali! Berikut ringkasan rekrutmen Anda.</p>
        </div>
        <button
          onClick={handleRefreshAll}
          disabled={isLoading}
          className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-xl text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors disabled:opacity-50"
        >
          {isLoading ? <Loader2 size={15} className="animate-spin" /> : <RefreshCw size={15} />}
          <span className="hidden sm:inline">Refresh</span>
        </button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, i) => (
          <div
            key={i}
            className={`bg-white rounded-2xl border ${stat.border} p-5 hover:shadow-md transition-shadow duration-200`}
          >
            <div className="flex items-start justify-between mb-3">
              <div className={`w-11 h-11 ${stat.bg} rounded-xl flex items-center justify-center`}>
                {isLoading ? (
                  <Loader2 size={18} className="animate-spin text-gray-400" />
                ) : (
                  stat.icon
                )}
              </div>
              <TrendingUp size={16} className="text-emerald-500" />
            </div>
            {isLoading ? (
              <>
                <div className="h-8 w-12 bg-gray-200 rounded animate-pulse mb-1" />
                <div className="h-3 w-24 bg-gray-100 rounded animate-pulse mt-1" />
              </>
            ) : (
              <>
                <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                <p className="text-xs text-gray-500 mt-1">{stat.label}</p>
                <p className="text-xs text-emerald-600 font-medium mt-2 flex items-center gap-1">
                  <ArrowUpRight size={12} />
                  {stat.change}
                </p>
              </>
            )}
          </div>
        ))}
      </div>

      {/* Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Candidates */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-lg font-bold text-gray-900">Kandidat Terbaru</h2>
            <button
              onClick={() => onNavigate('kandidat')}
              className="text-sm text-blue-600 hover:text-blue-700 font-medium"
            >
              Lihat Semua
            </button>
          </div>
          {candidatesLoading ? (
            <div className="space-y-3">
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="flex items-center gap-3 p-3 animate-pulse">
                  <div className="w-8 h-8 bg-gray-200 rounded-lg" />
                  <div className="flex-1">
                    <div className="h-4 w-40 bg-gray-200 rounded mb-1" />
                    <div className="h-3 w-24 bg-gray-100 rounded" />
                  </div>
                </div>
              ))}
            </div>
          ) : recentCandidates.length > 0 ? (
            <div className="space-y-3">
              {recentCandidates.map((candidate) => (
                <div
                  key={candidate.id}
                  onClick={() => onNavigate('kandidat')}
                  className="flex items-start gap-3 p-3 rounded-xl hover:bg-gray-50 transition-colors cursor-pointer"
                >
                  <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-500 rounded-lg flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
                    {candidate.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-700">
                      <span className="font-semibold text-gray-900">{candidate.name}</span>
                      {' '}melamar untuk {candidate.position_applied}
                    </p>
                    <p className="text-xs text-gray-400 mt-0.5">{candidate.applied_date}</p>
                  </div>
                  <span className={`px-2 py-0.5 rounded-full text-xs font-semibold flex-shrink-0 ${
                    candidate.status === 'new' ? 'bg-blue-50 text-blue-700' :
                    candidate.status === 'screening' ? 'bg-amber-50 text-amber-700' :
                    candidate.status === 'interview' ? 'bg-purple-50 text-purple-700' :
                    candidate.status === 'offered' ? 'bg-cyan-50 text-cyan-700' :
                    candidate.status === 'hired' ? 'bg-emerald-50 text-emerald-700' :
                    'bg-red-50 text-red-700'
                  }`}>
                    {candidate.status}
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <UserPlus size={28} className="text-gray-300 mx-auto mb-2" />
              <p className="text-sm text-gray-500">Belum ada kandidat.</p>
            </div>
          )}
        </div>

        {/* Top Jobs */}
        <div className="bg-white rounded-2xl border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-lg font-bold text-gray-900">Top Lowongan</h2>
            <button
              onClick={() => onNavigate('job-posting')}
              className="text-sm text-blue-600 hover:text-blue-700 font-medium"
            >
              Lihat Semua
            </button>
          </div>
          {jobsLoading ? (
            <div className="space-y-3">
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="flex items-center justify-between p-3 animate-pulse">
                  <div>
                    <div className="h-4 w-32 bg-gray-200 rounded mb-1" />
                    <div className="h-3 w-20 bg-gray-100 rounded" />
                  </div>
                  <div className="h-5 w-8 bg-gray-200 rounded" />
                </div>
              ))}
            </div>
          ) : topJobs.length > 0 ? (
            <div className="space-y-3">
              {topJobs.map((job, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between p-3 rounded-xl hover:bg-gray-50 transition-colors cursor-pointer"
                  onClick={() => onNavigate('job-posting')}
                >
                  <div>
                    <p className="text-sm font-semibold text-gray-900">{job.title}</p>
                    <p className="text-xs text-gray-400">{job.department}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-bold text-blue-600">{job.applicants}</p>
                    <p className="text-xs text-gray-400">pelamar</p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <FileText size={28} className="text-gray-300 mx-auto mb-2" />
              <p className="text-sm text-gray-500">Belum ada lowongan.</p>
            </div>
          )}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h3 className="text-lg font-bold text-white">Butuh bantuan merekrut?</h3>
          <p className="text-sm text-blue-100 mt-1">Buat lowongan baru dan mulai terima kandidat hari ini.</p>
        </div>
        <button
          onClick={() => onNavigate('create-job')}
          className="px-5 py-2.5 bg-white text-blue-700 text-sm font-semibold rounded-xl hover:bg-blue-50 transition-colors shadow-sm flex-shrink-0"
        >
          Buat Lowongan
        </button>
      </div>
    </div>
  );
};

export default DashboardPage;
