import React, { useState, useMemo } from "react";
import {
  Search,
  Plus,
  RefreshCw,
  Briefcase,
  CheckCircle2,
  FileText,
  XCircle,
  Loader2,
} from "lucide-react";

import { JobPosting } from "@/data/jobPostings";
import { useJobPostings } from "@/hooks/useJobPostings";

import JobPostingTable from "./JobPostingTable";
import CreateJobModal from "./CreateJobModal";
import ViewJobModal from "./ViewJobModal";
import DeleteConfirmModal from "./DeleteConfirmModal";

const JobPostingPage: React.FC = () => {
  const {
    jobs,
    loading,
    error,
    creating,
    refetch,
    createJob,
    updateJob,
    deleteJob,
    toggleStatus,
  } = useJobPostings();

  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [viewModalOpen, setViewModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);

  const [selectedJob, setSelectedJob] = useState<JobPosting | null>(null);
  const [editingJob, setEditingJob] = useState<JobPosting | null>(null);

  // ===============================
  // FIX FILTER (ANTI CRASH)
  // ===============================
  const filteredJobs = useMemo(() => {
    return jobs.filter((job) => {
      const search = searchQuery.toLowerCase();

      const matchSearch =
        (job.job_title || "").toLowerCase().includes(search) ||
        (job.department || "").toLowerCase().includes(search) ||
        (job.location || "").toLowerCase().includes(search) ||
        (job.job_code || "").toLowerCase().includes(search);

      const matchStatus =
        statusFilter === "all" || job.status === statusFilter;

      return matchSearch && matchStatus;
    });
  }, [jobs, searchQuery, statusFilter]);

  // ===============================
  // STATS CARDS (TETAP ADA)
  // ===============================
  const stats = useMemo(() => {
    return {
      total: jobs.length,
      published: jobs.filter((j) => j.status === "published").length,
      draft: jobs.filter((j) => j.status === "draft").length,
      closed: jobs.filter((j) => j.status === "closed").length,
    };
  }, [jobs]);

  const handleView = (job: JobPosting) => {
    setSelectedJob(job);
    setViewModalOpen(true);
  };

  const handleEdit = (job: JobPosting) => {
    setEditingJob(job);
    setCreateModalOpen(true);
    setViewModalOpen(false);
  };

  const handleDeleteClick = (job: JobPosting) => {
    setSelectedJob(job);
    setDeleteModalOpen(true);
  };

  const handleDeleteConfirm = async (id: string) => {
    const success = await deleteJob(id);
    if (success) {
      setDeleteModalOpen(false);
      setSelectedJob(null);
    }
  };

  const handleCreateOrEdit = async (jobData: Partial<JobPosting>) => {
    if (editingJob) {
      const success = await updateJob(editingJob.id, jobData);
      if (success) {
        setCreateModalOpen(false);
        setEditingJob(null);
      }
    } else {
      const result = await createJob(jobData);
      if (result) {
        setCreateModalOpen(false);
      }
    }
  };

  if (loading) {
    return (
      <div className="p-6 text-center">
        <Loader2 className="animate-spin mx-auto mb-2" />
        Memuat data...
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 text-center text-red-500">
        {error}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* HEADER */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">Job Posting</h1>
          <p className="text-gray-500 text-sm">
            Kelola dan pantau semua lowongan pekerjaan.
          </p>
        </div>

        <button
          onClick={() => {
            setEditingJob(null);
            setCreateModalOpen(true);
          }}
          className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg"
        >
          {creating ? (
            <Loader2 size={16} className="animate-spin" />
          ) : (
            <Plus size={16} />
          )}
          Buat Lowongan
        </button>
      </div>

      {/* STATS CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white shadow rounded-xl p-4">
          <div className="flex items-center gap-3">
            <Briefcase className="text-blue-600" />
            <div>
              <p className="text-sm text-gray-500">Total</p>
              <p className="text-xl font-bold">{stats.total}</p>
            </div>
          </div>
        </div>

        <div className="bg-white shadow rounded-xl p-4">
          <div className="flex items-center gap-3">
            <CheckCircle2 className="text-green-600" />
            <div>
              <p className="text-sm text-gray-500">Published</p>
              <p className="text-xl font-bold">{stats.published}</p>
            </div>
          </div>
        </div>

        <div className="bg-white shadow rounded-xl p-4">
          <div className="flex items-center gap-3">
            <FileText className="text-yellow-600" />
            <div>
              <p className="text-sm text-gray-500">Draft</p>
              <p className="text-xl font-bold">{stats.draft}</p>
            </div>
          </div>
        </div>

        <div className="bg-white shadow rounded-xl p-4">
          <div className="flex items-center gap-3">
            <XCircle className="text-red-600" />
            <div>
              <p className="text-sm text-gray-500">Closed</p>
              <p className="text-xl font-bold">{stats.closed}</p>
            </div>
          </div>
        </div>
      </div>

      {/* FILTER */}
      <div className="flex gap-3">
        <div className="relative">
          <Search size={16} className="absolute left-3 top-2.5 text-gray-400" />
          <input
            type="text"
            placeholder="Cari lowongan..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9 pr-4 py-2 border rounded-lg"
          />
        </div>

        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="border rounded-lg px-3 py-2"
        >
          <option value="all">Semua Status</option>
          <option value="published">Published</option>
          <option value="draft">Draft</option>
          <option value="closed">Closed</option>
        </select>

        <button
          onClick={refetch}
          className="flex items-center gap-2 border px-3 py-2 rounded-lg"
        >
          <RefreshCw size={16} />
          Refresh
        </button>
      </div>

      {/* TABLE */}
      <JobPostingTable
        jobs={filteredJobs}
        onView={handleView}
        onEdit={handleEdit}
        onDelete={handleDeleteClick}
      />

      {/* MODALS */}
      <CreateJobModal
        isOpen={createModalOpen}
        onClose={() => {
          setCreateModalOpen(false);
          setEditingJob(null);
        }}
        onSubmit={handleCreateOrEdit}
        editJob={editingJob}
      />

      <ViewJobModal
        job={selectedJob}
        isOpen={viewModalOpen}
        onClose={() => {
          setViewModalOpen(false);
          setSelectedJob(null);
        }}
        onEdit={handleEdit}
      />

      <DeleteConfirmModal
        job={selectedJob}
        isOpen={deleteModalOpen}
        onClose={() => {
          setDeleteModalOpen(false);
          setSelectedJob(null);
        }}
        onConfirm={handleDeleteConfirm}
      />
    </div>
  );
};

export default JobPostingPage;