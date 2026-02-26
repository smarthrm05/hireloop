import React, { useState } from "react";

/* =========================
   TYPE
========================= */
interface Employee {
  id: number;
  name: string;
  email: string;
  department: string;
  position: string;
  status: string;
  join_date: string;
}

/* =========================
   DUMMY DATA (CONTOH)
========================= */
const employees: Employee[] = [
  {
    id: 1,
    name: "Andi Pratama",
    email: "andi@company.com",
    department: "IT",
    position: "Frontend Developer",
    status: "Aktif",
    join_date: "2024-01-10",
  },
  {
    id: 2,
    name: "Siti Aulia",
    email: "siti@company.com",
    department: "HR",
    position: "HR Staff",
    status: "Aktif",
    join_date: "2023-11-02",
  },
];

/* =========================
   COMPONENT
========================= */
const KaryawanPage: React.FC = () => {
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null);
  const [openDetail, setOpenDetail] = useState(false);

  const handleOpenDetail = (emp: Employee) => {
    setSelectedEmployee(emp);
    setOpenDetail(true);
  };

  const handleClose = () => {
    setOpenDetail(false);
    setSelectedEmployee(null);
  };

  return (
    <div className="p-6">
      {/* =========================
          TABLE
      ========================= */}
      <div className="bg-white rounded-2xl shadow overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="text-left px-4 py-3">Nama</th>
              <th className="text-left px-4 py-3">Email</th>
              <th className="text-left px-4 py-3">Department</th>
              <th className="text-left px-4 py-3">Posisi</th>
              <th className="text-left px-4 py-3">Status</th>
            </tr>
          </thead>

          <tbody>
            {employees.map((emp) => (
              <tr
                key={emp.id}
                onClick={() => handleOpenDetail(emp)}
                className="border-b hover:bg-blue-50/40 cursor-pointer transition"
              >
                <td className="px-4 py-3 font-medium">{emp.name}</td>
                <td className="px-4 py-3">{emp.email}</td>
                <td className="px-4 py-3">{emp.department}</td>
                <td className="px-4 py-3">{emp.position}</td>
                <td className="px-4 py-3">
                  <span className="px-3 py-1 rounded-full bg-green-100 text-green-700 text-xs">
                    {emp.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* =========================
          MODAL DETAIL
      ========================= */}
      {openDetail && selectedEmployee && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          {/* overlay */}
          <div
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            onClick={handleClose}
          />

          {/* modal */}
          <div className="relative bg-white w-full max-w-lg rounded-2xl shadow-2xl">
            {/* header */}
            <div className="flex items-center justify-between px-6 py-4 border-b">
              <h2 className="text-lg font-bold text-gray-900">
                Detail Karyawan
              </h2>
              <button
                onClick={handleClose}
                className="text-gray-500 hover:text-gray-800"
              >
                ✕
              </button>
            </div>

            {/* body */}
            <div className="px-6 py-4 space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-500">Nama</span>
                <span className="font-medium">{selectedEmployee.name}</span>
              </div>

              <div className="flex justify-between">
                <span className="text-gray-500">Email</span>
                <span className="font-medium">{selectedEmployee.email}</span>
              </div>

              <div className="flex justify-between">
                <span className="text-gray-500">Department</span>
                <span className="font-medium">{selectedEmployee.department}</span>
              </div>

              <div className="flex justify-between">
                <span className="text-gray-500">Posisi</span>
                <span className="font-medium">{selectedEmployee.position}</span>
              </div>

              <div className="flex justify-between">
                <span className="text-gray-500">Status</span>
                <span className="font-medium">{selectedEmployee.status}</span>
              </div>

              <div className="flex justify-between">
                <span className="text-gray-500">Tanggal Bergabung</span>
                <span className="font-medium">
                  {selectedEmployee.join_date}
                </span>
              </div>
            </div>

            {/* footer */}
            <div className="flex justify-end gap-3 px-6 py-4 border-t">
              <button
                onClick={handleClose}
                className="px-4 py-2 rounded-xl bg-gray-100 hover:bg-gray-200"
              >
                Tutup
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default KaryawanPage;