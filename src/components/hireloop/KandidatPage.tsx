import React, { useState } from "react";

export default function JobDashboard() {
  const [selectedJob, setSelectedJob] = useState(null);

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
      education: "Minimal SMA/SMK",
      experience: "1 - 3 tahun pengalaman",
      published: "Tayang 25 hari yang lalu",
      updated: "Diperbarui 3 hari yang lalu",
      description:
        "Kami mencari Frontend Developer yang berpengalaman dalam React dan mampu membangun UI modern dan responsive.",
      qualifications: [
        "Pengalaman minimal 2 tahun menggunakan React",
        "Memahami Tailwind / CSS modern",
        "Terbiasa menggunakan REST API",
      ],
      skills: ["React", "Tailwind", "JavaScript", "REST API"],
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
      education: "Minimal D3 Desain",
      experience: "1 - 2 tahun pengalaman",
      published: "Tayang 20 hari yang lalu",
      updated: "Diperbarui 5 hari yang lalu",
      description:
        "Mendesain tampilan aplikasi dan website yang user-friendly serta modern.",
      qualifications: [
        "Menguasai Figma / Adobe XD",
        "Memahami user flow & wireframing",
        "Portofolio desain wajib ada",
      ],
      skills: ["Figma", "Wireframing", "User Flow", "UI Design"],
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
      education: "Minimal S1 Teknik Informatika",
      experience: "3 - 5 tahun pengalaman",
      published: "Tayang 2 bulan yang lalu",
      updated: "Diperbarui 2 hari yang lalu",
      description:
        "Mengembangkan dan mengelola server-side logic serta database system perusahaan.",
      qualifications: [
        "Menguasai Node.js / Laravel",
        "Pengalaman dengan MySQL / PostgreSQL",
        "Memahami konsep API & keamanan sistem",
      ],
      skills: ["Node.js", "Laravel", "MySQL", "API Security"],
    },
  ];

  return (
    <div className="min-h-screen bg-gray-100 p-10">
      <h1 className="text-3xl font-bold mb-8 text-gray-800">
        Lowongan Pekerjaan Tersedia
      </h1>

      {/* GRID */}
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

      {/* MODAL */}
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

                  <p className="text-gray-600 mt-1">
                    {selectedJob.company} • {selectedJob.location}
                  </p>

                  {/* INFO HEADER */}
                  <div className="mt-4 space-y-2 text-gray-700 text-sm">

                    {/* Salary */}
                    <div className="flex items-center gap-2">
                      <svg className="w-4 h-4 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-2.5 0-4 1.5-4 3s1.5 3 4 3 4 1.5 4 3-1.5 3-4 3m0-12v12" />
                      </svg>
                      <span className="font-medium">{selectedJob.salary}</span>
                    </div>

                    {/* Job Type */}
                    <div className="flex items-center gap-2">
                      <svg className="w-4 h-4 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3 7h18M3 12h18M3 17h18" />
                      </svg>
                      <span className="font-medium">{selectedJob.type}</span>
                    </div>

                    {/* Education */}
                    <div className="flex items-center gap-2">
                      <svg className="w-4 h-4 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 14l9-5-9-5-9 5 9 5z" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 14l6.16-3.422A12.083 12.083 0 0118 20.055C16.32 20.67 14.255 21 12 21s-4.32-.33-6-.945a12.083 12.083 0 01-.16-9.477L12 14z" />
                      </svg>
                      <span className="font-medium">{selectedJob.education}</span>
                    </div>

                    {/* Experience */}
                    <div className="flex items-center gap-2">
                      <svg className="w-4 h-4 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 6V4a1 1 0 011-1h4a1 1 0 011 1v2" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3 7h18v11a2 2 0 01-2 2H5a2 2 0 01-2-2V7z" />
                      </svg>
                      <span className="font-medium">{selectedJob.experience}</span>
                    </div>

                  </div>

                  <div className="flex items-center gap-3 mt-4 text-sm">
                    <span className="text-green-500">{selectedJob.published}</span>
                    <span className="text-gray-400">●</span>
                    <span className="text-green-500">{selectedJob.updated}</span>
                  </div>

                  {/* STATUS */}
                  <div className="flex items-center gap-3 mt-4 flex-wrap">
                    <span className="bg-red-600 text-white px-3 py-1 rounded-full text-xs font-medium">
                      Urgently Needed
                    </span>
                    <span className="bg-green-600 text-white px-3 py-1 rounded-full text-xs font-medium">
                      Aktif Merekrut
                    </span>
                  </div>
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
                <h3 className="font-semibold text-lg mb-3">Deskripsi Pekerjaan</h3>
                <ul className="list-disc pl-6 text-gray-600 space-y-2">
                  <li>{selectedJob.description}</li>
                </ul>
              </div>

              <div>
                <h3 className="font-semibold text-lg mb-3">Kualifikasi</h3>
                <ul className="list-disc pl-6 text-gray-600 space-y-2">
                  {selectedJob.qualifications.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="font-semibold text-lg mb-3">Skill</h3>
                <div className="flex flex-wrap gap-3">
                  {selectedJob.skills.map((skill, index) => (
                    <span key={index} className="bg-blue-100 text-blue-600 px-4 py-2 rounded-full text-sm font-medium">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="font-semibold text-lg mb-3">Benefit</h3>
                <ul className="list-disc pl-6 text-gray-600 space-y-2">
                  <li>Gaji Kompetitif</li>
                  <li>Bonus Kinerja</li>
                  <li>BPJS Kesehatan & Ketenagakerjaan</li>
                  <li>Lingkungan Kerja Nyaman</li>
                </ul>
              </div>

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