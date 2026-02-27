import React, { useState } from "react";
import {
  X,
  Share2,
  MapPin,
  GraduationCap,
  Clock,
  DollarSign,
} from "lucide-react";

/* =========================
   TYPE
========================= */
interface JobPosting {
  id: number;
  job_title: string;
  company_name: string;
  location: string;
  employment_type: string;
  department: string;
  salary_min?: number;
  salary_max?: number;
  description: string;
  requirements: string[];
  skills: string[];
  benefits: string[];
  posted_at: string;
  updated_at: string;
  logo?: string;
  is_urgent?: boolean;
}

/* =========================
   DATA DUMMY
========================= */
const jobPostings: JobPosting[] = [
  {
    id: 1,
    job_title: "Crew Store (Shopper)",
    company_name: "PT BINAJASA SUMBER SARANA",
    location: "Jakarta",
    employment_type: "Penuh Waktu",
    department: "Industri Jasa · Pelayan Toko",
    salary_min: 3500000,
    salary_max: 3800000,
    description:
      "Melayani pelanggan dengan ramah.\nMengelola display produk.\nMelakukan transaksi kasir.",
    requirements: [
      "Minimal SMA/SMK",
      "Pengalaman kurang dari 1 tahun",
      "Usia 18–35 tahun",
    ],
    skills: [
      "Store Operations",
      "Store Display",
      "Store Sales",
      "Customer Service",
      "Cashier",
    ],
    benefits: ["BPJS", "Insentif", "Pelatihan"],
    posted_at: "6 jam yang lalu",
    updated_at: "6 jam yang lalu",
    logo: "https://via.placeholder.com/64",
    is_urgent: true,
  },
];

/* =========================
   COMPONENT
========================= */
export default function JobPostingPage() {
  const [selectedJob, setSelectedJob] = useState<JobPosting | null>(null);

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* JOB GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {jobPostings.map((job) => (
          <div
            key={job.id}
            onClick={() => setSelectedJob(job)}
            className="bg-white rounded-2xl p-5 shadow-sm hover:shadow-md cursor-pointer transition"
          >
            <h3 className="font-semibold text-lg text-gray-900">
              {job.job_title}
            </h3>
            <p className="text-base text-blue-600 mt-1">
              {job.company_name}
            </p>

            <div className="mt-4 space-y-2 text-base text-gray-600">
              <div className="flex items-center gap-2">
                <DollarSign size={16} />
                Rp {job.salary_min?.toLocaleString()} –{" "}
                {job.salary_max?.toLocaleString()} / Bulan
              </div>
              <div className="flex items-center gap-2">
                <MapPin size={16} />
                {job.location}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* MODAL */}
      {selectedJob && (
        <div className="fixed inset-0 z-[999] flex items-center justify-center p-6">
          <div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setSelectedJob(null)}
          />

          <div className="relative bg-white w-full max-w-5xl rounded-2xl shadow-2xl flex flex-col max-h-[92vh]">

            {/* HEADER */}
            <div className="p-8 border-b flex justify-between gap-6">
              <div className="flex gap-6">
                <img
                  src={selectedJob.logo}
                  alt="logo"
                  className="w-20 h-20 rounded-xl border object-cover"
                />

                <div>
                  <h2 className="text-3xl font-bold text-gray-900">
                    {selectedJob.job_title}
                  </h2>
                  <p className="text-lg text-blue-600 font-semibold mt-1">
                    {selectedJob.company_name}
                  </p>

                  <div className="mt-5 space-y-3 text-lg text-gray-700">
                    <div className="flex gap-2 items-center">
                      <DollarSign size={18} />
                      IDR {selectedJob.salary_min?.toLocaleString()} –{" "}
                      {selectedJob.salary_max?.toLocaleString()} / Bulan
                    </div>

                    <div className="flex gap-2 items-center">
                      <Clock size={18} />
                      {selectedJob.employment_type}
                    </div>

                    <div className="flex gap-2 items-center">
                      <GraduationCap size={18} />
                      Minimal SMA/SMK
                    </div>
                  </div>

                  {/* STATUS LABELS */}
                  <div className="flex gap-3 mt-5">
                    {selectedJob.is_urgent && (
                      <span className="px-4 py-2 text-sm font-semibold bg-red-600 text-white rounded-full shadow-md">
                        🔥 Urgently Needed
                      </span>
                    )}

                    <span className="px-4 py-2 text-sm font-semibold bg-green-600 text-white rounded-full shadow-md">
                      Aktif Merekrut
                    </span>
                  </div>

                  {/* HIJAU TERANG */}
                  <p className="text-base font-normal text-green-500 mt-5">
                    🕒 Tayang {selectedJob.posted_at} · Diperbarui{" "}
                    {selectedJob.updated_at}
                  </p>
                </div>
              </div>

              {/* RIGHT ACTION */}
              <div className="flex items-start gap-3">
                <button className="p-3 border rounded-xl hover:bg-gray-100 transition">
                  <Share2 size={20} />
                </button>

                <button
                  onClick={() => setSelectedJob(null)}
                  className="p-3 hover:bg-gray-100 rounded-xl transition"
                >
                  <X size={22} />
                </button>
              </div>
            </div>

            {/* BODY */}
            <div className="p-8 space-y-10 overflow-y-auto text-[17px] leading-relaxed text-gray-800">

              <section>
                <h4 className="font-semibold mb-4 text-xl">
                  Persyaratan
                </h4>
                <div className="flex flex-wrap gap-3">
                  {selectedJob.requirements.map((r, i) => (
                    <span
                      key={i}
                      className="px-5 py-2 text-base bg-gray-100 rounded-full"
                    >
                      {r}
                    </span>
                  ))}
                </div>
              </section>

              <section>
                <h4 className="font-semibold mb-4 text-xl">
                  Skills
                </h4>
                <div className="flex flex-wrap gap-3">
                  {selectedJob.skills.map((s, i) => (
                    <span
                      key={i}
                      className="px-5 py-2 text-base bg-blue-50 text-blue-700 rounded-full"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </section>

              {/* KUALIFIKASI */}
              <section>
                <h4 className="font-semibold mb-4 text-xl">
                  Kualifikasi
                </h4>
                <ul className="list-disc pl-6 space-y-3">
                  {selectedJob.requirements.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              </section>

              <section>
                <h4 className="font-semibold mb-4 text-xl">
                  Deskripsi Pekerjaan
                </h4>
                <ul className="list-disc pl-6 space-y-3">
                  {selectedJob.description
                    .split("\n")
                    .map((item, index) => (
                      <li key={index}>{item}</li>
                    ))}
                </ul>
              </section>

              <section>
                <h4 className="font-semibold mb-4 text-xl">
                  Benefit Kerja
                </h4>
                <ul className="list-disc pl-6 space-y-3">
                  {selectedJob.benefits.map((b, i) => (
                    <li key={i}>{b}</li>
                  ))}
                </ul>
              </section>
            </div>

            {/* FOOTER */}
            <div className="p-8 border-t bg-white">
              <div className="flex gap-4 justify-end">
                <button
                  onClick={() => setSelectedJob(null)}
                  className="px-8 py-3 rounded-xl border border-gray-300 hover:bg-gray-100 transition font-medium text-base"
                >
                  Nanti Saja
                </button>

                <button className="px-10 py-3 bg-blue-600 hover:bg-blue-700 transition text-white rounded-xl font-semibold shadow-sm text-base">
                  Lamar Sekarang
                </button>
              </div>
            </div>

          </div>
        </div>
      )}
    </div>
  );
}