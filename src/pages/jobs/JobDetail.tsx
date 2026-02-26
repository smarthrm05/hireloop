import React from "react";
import {
  MapPin,
  Briefcase,
  Calendar,
  DollarSign,
  GraduationCap,
  Award,
  Gift,
} from "lucide-react";
import { JobPosting } from "@/data/jobPostings";

interface JobDetailProps {
  job: JobPosting;
  onApply: () => void;
}

const formatDate = (date?: string) => {
  if (!date) return "-";
  const d = new Date(date);
  if (isNaN(d.getTime())) return "-";
  return d.toLocaleDateString("id-ID", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
};

const JobDetail: React.FC<JobDetailProps> = ({ job, onApply }) => {
  return (
    <div className="max-w-5xl mx-auto px-4 py-10 space-y-8">

      {/* HEADER */}
      <div className="space-y-3">
        <h1 className="text-3xl font-bold text-gray-900">
          {job.job_title}
        </h1>

        <div className="flex flex-wrap gap-4 text-sm text-gray-600">
          <span className="flex items-center gap-1">
            <MapPin size={16} /> {job.location}
          </span>
          <span className="flex items-center gap-1">
            <Briefcase size={16} /> {job.employment_type}
          </span>
          <span className="flex items-center gap-1">
            <Calendar size={16} /> Deadline: {formatDate(job.deadline)}
          </span>
        </div>

        <button
          onClick={onApply}
          className="mt-4 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-semibold shadow"
        >
          Lamar Sekarang
        </button>
      </div>

      {/* INFO GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <InfoBox
          icon={<Briefcase size={18} />}
          label="Department"
          value={job.department}
        />
        <InfoBox
          icon={<Award size={18} />}
          label="Pengalaman"
          value={job.pengalaman}
        />
        <InfoBox
          icon={<GraduationCap size={18} />}
          label="Pendidikan"
          value={job.pendidikan}
        />
        <InfoBox
          icon={<DollarSign size={18} />}
          label="Rentang Gaji"
          value={job.salary_range}
        />
        <InfoBox
          icon={<Calendar size={18} />}
          label="Tanggal Diposting"
          value={formatDate(job.posted_date)}
        />
      </div>

      {/* CONTENT */}
      <Section title="Deskripsi Pekerjaan">
        {job.description}
      </Section>

      <Section title="Kualifikasi">
        {job.kualifikasi}
      </Section>

      <Section title="Benefit">
        {job.benefit}
      </Section>

      {/* STICKY APPLY */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 sm:hidden">
        <button
          onClick={onApply}
          className="w-full py-3 bg-blue-600 text-white font-semibold rounded-xl"
        >
          Lamar Sekarang
        </button>
      </div>
    </div>
  );
};

export default JobDetail;

/* ========================
   SMALL COMPONENTS
======================== */

const InfoBox = ({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value?: string;
}) => (
  <div className="p-4 border border-gray-200 rounded-xl bg-white flex gap-3">
    <div className="text-blue-600">{icon}</div>
    <div>
      <p className="text-xs text-gray-500">{label}</p>
      <p className="text-sm font-semibold text-gray-900">
        {value || "-"}
      </p>
    </div>
  </div>
);

const Section = ({
  title,
  children,
}: {
  title: string;
  children?: React.ReactNode;
}) => (
  <div className="space-y-3">
    <h2 className="text-lg font-semibold text-gray-900">
      {title}
    </h2>
    <div className="text-sm text-gray-700 bg-gray-50 p-5 rounded-xl border border-gray-100 whitespace-pre-line">
      {children || "-"}
    </div>
  </div>
);