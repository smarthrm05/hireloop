import React, { useState } from "react";

export default function JobDashboard() {
  const [selectedJob, setSelectedJob] = useState(null);

  // =========================
  // 3 DATA DUMMY GRID
  // =========================
  const jobs = [
    {
      id: 1,
      position: "Frontend Developer",
      company: "PT Digital Nusantara",
      location: "Jakarta",
      type: "Full Time",
      salary: "Rp 8.000.000 - 12.000.000",
      deadline: "30 Maret 2026",
      level: "Mid-Level",
      description:
        "Kami mencari Frontend Developer yang berpengalaman dalam React dan mampu membangun UI modern dan responsive.",
      qualifications: [
        "Pengalaman minimal 2 tahun menggunakan React",
        "Memahami Tailwind / CSS modern",
        "Terbiasa menggunakan REST API",
      ],
    },
    {
      id: 2,
      position: "UI/UX Designer",
      company: "PT Kreatif Teknologi",
      location: "Bandung",
      type: "Full Time",
      salary: "Rp 6.000.000 - 9.000.000",
      deadline: "25 Maret 2026",
      level: "Junior",
      description:
        "Mendesain tampilan aplikasi dan website yang user-friendly serta modern.",
      qualifications: [
        "Menguasai Figma / Adobe XD",
        "Memahami user flow & wireframing",
        "Portofolio desain wajib ada",
      ],
    },
    {
      id: 3,
      position: "Backend Developer",
      company: "PT Inovasi Sistem",
      location: "Surabaya",
      type: "Remote",
      salary: "Rp 9.000.000 - 14.000.000",
      deadline: "5 April 2026",
      level: "Senior",
      description:
        "Mengembangkan dan mengelola server-side logic serta database system perusahaan.",
      qualifications: [
        "Menguasai Node.js / Laravel",
        "Pengalaman dengan MySQL / PostgreSQL",
        "Memahami konsep API & keamanan sistem",
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-gray-100 p-10">
      <h1 className="text-3xl font-bold mb-8 text-gray-800">
        Lowongan Pekerjaan Tersedia
      </h1>

      {/* ================= GRID JOB ================= */}
      <div className="grid md:grid-cols-3 gap-6">
        {jobs.map((job) => (
          <div
            key={job.id}
            className="bg-white rounded-2xl shadow-md p-6 hover:shadow-xl transition"
          >
            <h2 className="text-xl font-semibold text-gray-800">
              {job.position}
            </h2>
            <p className="text-gray-500 mt-1">
              {job.company} • {job.location}
            </p>

            <div className="mt-4 text-sm text-gray-600">
              <p>{job.type}</p>
              <p>{job.salary}</p>
            </div>

            <button
              onClick={() => setSelectedJob(job)}
              className="mt-6 w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-xl font-medium transition"
            >
              Lihat Detail
            </button>
          </div>
        ))}
      </div>

      {/* ================= MODAL DETAIL ================= */}
      {selectedJob && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-6">
          <div className="bg-white w-full max-w-5xl rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
            
            {/* HEADER */}
            <div className="p-8 border-b bg-gradient-to-r from-blue-50 to-white">
              <div className="flex justify-between items-start">
                <div>
                  <h2 className="text-2xl font-bold text-gray-800">
                    {selectedJob.position}
                  </h2>
                  <p className="text-gray-500 mt-1">
                    {selectedJob.company} • {selectedJob.location}
                  </p>
                </div>

                <button
                  onClick={() => setSelectedJob(null)}
                  className="text-gray-400 hover:text-gray-600 text-xl"
                >
                  ✕
                </button>
              </div>
            </div>

            {/* BODY */}
            <div className="p-8 overflow-y-auto flex-1 space-y-8">
              <div>
                <h3 className="font-semibold text-lg mb-3">
                  Deskripsi Pekerjaan
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {selectedJob.description}
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-lg mb-3">Kualifikasi</h3>
                <ul className="list-disc pl-6 text-gray-600 space-y-2">
                  {selectedJob.qualifications.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div className="bg-gray-50 p-5 rounded-xl">
                  <p className="text-sm text-gray-500">Tipe Pekerjaan</p>
                  <p className="font-medium mt-1">{selectedJob.type}</p>
                </div>

                <div className="bg-gray-50 p-5 rounded-xl">
                  <p className="text-sm text-gray-500">Gaji</p>
                  <p className="font-medium mt-1">{selectedJob.salary}</p>
                </div>

                <div className="bg-gray-50 p-5 rounded-xl">
                  <p className="text-sm text-gray-500">Deadline</p>
                  <p className="font-medium mt-1">{selectedJob.deadline}</p>
                </div>

                <div className="bg-gray-50 p-5 rounded-xl">
                  <p className="text-sm text-gray-500">Level</p>
                  <p className="font-medium mt-1">{selectedJob.level}</p>
                </div>
              </div>
            </div>

            {/* FOOTER (TIDAK BOLEH HILANG) */}
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