import React, { useState } from 'react';
import { Eye, Pencil, Trash2, ArrowUpDown, ArrowUp, ArrowDown } from 'lucide-react';
import { JobPosting } from '@/data/jobPostings';
import StatusBadge from './StatusBadge';

interface JobPostingTableProps {
  jobs: JobPosting[];
  onView: (job: JobPosting) => void;
  onEdit: (job: JobPosting) => void;
  onDelete: (job: JobPosting) => void;
  onRowClick: (job: JobPosting) => void;
}

type SortField =
  | 'job_title'
  | 'department'
  | 'location'
  | 'status'
  | 'applicants_count'
  | 'posted_date'
  | 'deadline';

type SortDirection = 'asc' | 'desc' | null;

const JobPostingTable: React.FC<JobPostingTableProps> = ({
  jobs,
  onView,
  onEdit,
  onDelete,
  onRowClick,
}) => {
  const [sortField, setSortField] = useState<SortField | null>(null);
  const [sortDirection, setSortDirection] = useState<SortDirection>(null);

  // ========================
  // FORMAT TANGGAL BARU
  // ========================
  const formatPostedDate = (dateString: string) => {
    if (!dateString) return '-';
    const date = new Date(dateString);

    const hari = date.toLocaleDateString('id-ID', { weekday: 'long' });
    const tanggal = date.toLocaleDateString('id-ID', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });
    const jam = date.toLocaleTimeString('id-ID', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
    });

    return `${hari}, ${tanggal}, ${jam}`;
  };

  const formatDeadline = (dateString: string) => {
    if (!dateString) return '-';
    const date = new Date(dateString);

    return date.toLocaleDateString('id-ID', {
      weekday: 'long',
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });
  };

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      if (sortDirection === 'asc') setSortDirection('desc');
      else {
        setSortField(null);
        setSortDirection(null);
      }
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const sortedJobs = React.useMemo(() => {
    if (!sortField || !sortDirection) return jobs;

    return [...jobs].sort((a, b) => {
      const aVal = a[sortField];
      const bVal = b[sortField];

      if (typeof aVal === 'number' && typeof bVal === 'number') {
        return sortDirection === 'asc' ? aVal - bVal : bVal - aVal;
      }

      return sortDirection === 'asc'
        ? String(aVal).localeCompare(String(bVal))
        : String(bVal).localeCompare(String(aVal));
    });
  }, [jobs, sortField, sortDirection]);

  const SortIcon = ({ field }: { field: SortField }) => {
    if (sortField !== field)
      return <ArrowUpDown size={13} className="text-white/70" />;
    if (sortDirection === 'asc')
      return <ArrowUp size={13} className="text-white" />;
    return <ArrowDown size={13} className="text-white" />;
  };

  // ========================
  // HEADER BAHASA INDONESIA
  // ========================
  const columns = [
    { key: 'no', label: 'No', sortable: false, width: 'w-14' },
    { key: 'id', label: 'ID', sortable: false, width: 'w-28' },
    { key: 'job_title', label: 'Posisi Pekerjaan', sortable: true, width: 'w-[220px]' },
    { key: 'department', label: 'Divisi', sortable: true, width: 'w-32' },
    { key: 'location', label: 'Lokasi', sortable: true, width: 'w-32' },
    { key: 'status', label: 'Status', sortable: true, width: 'w-32' },
    { key: 'applicants_count', label: 'Jumlah Kandidat', sortable: true, width: 'w-36' },
    { key: 'posted_date', label: 'Tanggal Diposting', sortable: true, width: 'w-[220px]' },
    { key: 'deadline', label: 'Batas Akhir', sortable: true, width: 'w-[180px]' },
    { key: 'hired', label: 'Direkrut', sortable: false, width: 'w-20 text-center' },
    { key: 'action', label: 'Aksi', sortable: false, width: 'w-28 text-center' },
  ];

  return (
    <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm">
      <div className="overflow-x-auto">
        <table className="w-full table-fixed">
          <thead className="bg-[#2794eb]">
            <tr>
              {columns.map((col: any) => (
               <th
                  key={col.key}
                  className={`px-4 py-3.5 text-left text-xs font-semibold text-white uppercase tracking-wider border-r border-white/20 last:border-r-0 ${col.width} ${
                    col.sortable ? 'cursor-pointer select-none' : ''
                  } whitespace-nowrap`}
                  onClick={() => col.sortable && handleSort(col.key)}
                   >
                  <div className="flex items-center gap-1.5">
                    <span>{col.label}</span>
                    {col.sortable && <SortIcon field={col.key} />}
                  </div>
                </th>
              ))}
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-100">
            {sortedJobs.map((job, index) => (
              <tr
                key={job.id}
                onClick={() => onRowClick(job)}
                className="hover:bg-blue-50/40 transition-colors duration-150 cursor-pointer"
              >
                <td className="px-4 py-3.5 border-r border-gray-100">{index + 1}</td>

                <td className="px-4 py-3.5 border-r border-gray-100">
                  <span className="text-xs font-mono text-gray-400 bg-gray-50 px-2 py-1 rounded-md">
                    {job.job_code || job.id.slice(0, 8)}
                  </span>
                </td>

                <td className="px-4 py-3.5 font-semibold border-r border-gray-100">
                  {job.job_title}
                </td>

                <td className="px-4 py-3.5 border-r border-gray-100">{job.department}</td>
                <td className="px-4 py-3.5 border-r border-gray-100">{job.location}</td>
                <td className="px-4 py-3.5 border-r border-gray-100">
                  <StatusBadge status={job.status} />
                </td>

                <td className="px-4 py-3.5 border-r border-gray-100">
                  {job.applicants_count} Kandidat
                </td>

                <td className="px-4 py-3.5 border-r border-gray-100">
                  {formatPostedDate(job.posted_date)}
                </td>

                <td className="px-4 py-3.5 border-r border-gray-100">
                  {formatDeadline(job.deadline)}
                </td>

                <td className="px-4 py-3.5 text-center border-r border-gray-100">
                  {job.hired}
                </td>

                <td
                  className="px-4 py-3.5 text-center"
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="flex items-center justify-center gap-2">
                    <button onClick={() => onView(job)} className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg">
                      <Eye size={16} />
                    </button>
                    <button onClick={() => onEdit(job)} className="p-2 text-amber-600 hover:bg-amber-50 rounded-lg">
                      <Pencil size={16} />
                    </button>
                    <button onClick={() => onDelete(job)} className="p-2 text-red-600 hover:bg-red-50 rounded-lg">
                      <Trash2 size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default JobPostingTable;