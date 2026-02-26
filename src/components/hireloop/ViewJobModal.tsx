import React from "react";
import {
  X,
  MapPin,
  Building2,
  Calendar,
  Users,
  Briefcase,
  DollarSign,
  GraduationCap,
  Award,
  Gift,
  ClipboardList,
} from "lucide-react";
import { JobPosting } from "@/data/jobPostings";
import StatusBadge from "./StatusBadge";

interface ViewJobModalProps {
  job: JobPosting | null;
  isOpen: boolean;
  onClose: () => void;
  onEdit: (job: JobPosting) => void;
}

/* =========================
   DATE FORMATTER (ANTI ERROR)
========================= */
const formatDate = (date?: string) => {
  if (!date) return "-";
  const d = new Date(date);
  if (isNaN(d.getTime())) return "-";

  return d.toLocaleDateString("id-ID", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};

const ViewJobModal: React.FC<ViewJobModalProps> = ({
  job,
  isOpen,
  onClose,
  onEdit,
}) => {
  // ✅ HARD GUARD (ANTI BLANK)
  if (!isOpen || !job) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-3xl max-h-[90vh] overflow-y-auto animate-in fade-in zoom-in-95 duration-200">

        {/* HEADER */}
        <div className="flex items-start justify-between p-6 border-b border-gray-100">
          <div>
            <div className="flex items-center gap-3 mb-2 flex-wrap">
              <h2 className="text-xl font-bold text-gray-900">
                {job.job_title || "-"}
              </h2>
              <StatusBadge status={job.status} />
            </div>

            <p className="text-sm text-gray-500">
              ID: {job.job_code || job.id?.slice(0, 8) || "-"}
            </p>
          </div>

          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X size={20} className="text-gray-500" />
          </button>
        </div>

        {/* BODY */}
        <div className="p-6 space-y-6">

          {/* INFO GRID */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <InfoCard
              icon={<Building2 size={18} className="text-blue-600" />}
              label="Department"
              value={job.department}
              bg="bg-blue-100"
            />

            <InfoCard
              icon={<MapPin size={18} className="text-purple-600" />}
              label="Location"
              value={job.location}
              bg="bg-purple-100"
            />

            <InfoCard
              icon={<Users size={18} className="text-amber-600" />}
              label="Applicants"
              value={`${job.applicants_count ?? 0} Kandidat`}
              bg="bg-amber-100"
            />

            <InfoCard
              icon={<Briefcase size={18} className="text-emerald-600" />}
              label="Hired"
              value={`${job.hired ?? 0}/1`}
              bg="bg-emerald-100"
            />
          </div>

          {/* DATE SECTION (FORMAT FIXED) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <InfoRow
              icon={<Calendar size={16} className="text-blue-500" />}
              label="Tanggal Diposting"
              value={formatDate(job.posted_date)}
              border="border-blue-100"
              bg="bg-blue-50/50"
            />

            <InfoRow
              icon={<Calendar size={16} className="text-orange-500" />}
              label="Deadline"
              value={formatDate(job.deadline)}
              border="border-orange-100"
              bg="bg-orange-50/50"
            />
          </div>

          {/* SALARY + EMPLOYMENT */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <InfoRow
              icon={<DollarSign size={16} className="text-green-500" />}
              label="Salary Range"
              value={job.salary_range}
              border="border-green-100"
              bg="bg-green-50/50"
            />

            <InfoRow
              icon={<Briefcase size={16} className="text-gray-500" />}
              label="Employment Type"
              value={job.employment_type}
              border="border-gray-100"
              bg="bg-gray-50"
            />
          </div>

          {/* SECTION BLOCKS */}
          <SectionBlock
            icon={<GraduationCap size={18} className="text-indigo-600" />}
            title="Pendidikan"
            content={job.pendidikan}
          />

          <SectionBlock
            icon={<Award size={18} className="text-rose-600" />}
            title="Pengalaman"
            content={job.pengalaman}
          />

          {/* ✅ FIELD BARU: KUALIFIKASI */}
          <SectionBlock
            icon={<ClipboardList size={18} className="text-blue-600" />}
            title="Kualifikasi"
            content={job.kualifikasi}
          />

          <SectionBlock
            icon={<Briefcase size={18} className="text-gray-600" />}
            title="Deskripsi Pekerjaan"
            content={job.description}
          />

          <SectionBlock
            icon={<Gift size={18} className="text-emerald-600" />}
            title="Benefit"
            content={job.benefit}
          />
        </div>

        {/* FOOTER */}
        <div className="flex items-center justify-end gap-3 p-6 border-t border-gray-100">
          <button
            onClick={onClose}
            className="px-5 py-2.5 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-xl transition-colors"
          >
            Tutup
          </button>

          <button
            onClick={() => onEdit(job)}
            className="px-5 py-2.5 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-xl transition-colors shadow-sm"
          >
            Edit Lowongan
          </button>
        </div>
      </div>
    </div>
  );
};

export default ViewJobModal;

/* ==============================
   INTERNAL COMPONENTS
============================== */

interface InfoCardProps {
  icon: React.ReactNode;
  label: string;
  value?: string | number;
  bg: string;
}

const InfoCard: React.FC<InfoCardProps> = ({ icon, label, value, bg }) => (
  <div className="flex items-center gap-4 p-4 rounded-xl bg-gray-50 border border-gray-100">
    <div className={`p-3 rounded-lg ${bg}`}>{icon}</div>
    <div>
      <p className="text-xs text-gray-500">{label}</p>
      <p className="text-sm font-semibold text-gray-900">
        {value || "-"}
      </p>
    </div>
  </div>
);

interface InfoRowProps {
  icon: React.ReactNode;
  label: string;
  value?: string | number;
  border: string;
  bg: string;
}

const InfoRow: React.FC<InfoRowProps> = ({
  icon,
  label,
  value,
  border,
  bg,
}) => (
  <div className={`flex items-start gap-3 p-4 rounded-xl border ${border} ${bg}`}>
    {icon}
    <div>
      <p className="text-xs text-gray-500">{label}</p>
      <p className="text-sm font-medium text-gray-900">
        {value || "-"}
      </p>
    </div>
  </div>
);

interface SectionBlockProps {
  icon: React.ReactNode;
  title: string;
  content?: string;
}

const SectionBlock: React.FC<SectionBlockProps> = ({
  icon,
  title,
  content,
}) => (
  <div className="space-y-3">
    <div className="flex items-center gap-2">
      {icon}
      <h3 className="text-sm font-semibold text-gray-800">
        {title}
      </h3>
    </div>
    <div className="p-4 bg-gray-50 rounded-xl border border-gray-100 text-sm text-gray-700 whitespace-pre-line">
      {content || "-"}
    </div>
  </div>
);