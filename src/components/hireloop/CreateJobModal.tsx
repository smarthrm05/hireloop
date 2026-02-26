import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { JobPosting, departments, locations, employmentTypes } from '@/data/jobPostings';

interface CreateJobModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (job: Partial<JobPosting>) => void;
  editJob?: JobPosting | null;
}

interface FormData {
  job_title: string;
  department: string;
  location: string;
  status: 'published' | 'draft' | 'closed';
  deadline: string;
  description: string; 
  salary_range: string;
  employment_type: string;
  pengalaman: string;
  pendidikan: string;
  deskripsi_pekerjaan: string;
  benefit: string;
}

const initialForm: FormData = {
  job_title: '',
  department: '',
  location: '',
  status: 'draft',
  deadline: '',
  description: '',
  salary_range: '',
  employment_type: 'Full-time',
  pengalaman: '',
  pendidikan: '',
  deskripsi_pekerjaan: '',
  benefit: '',
};

const CreateJobModal: React.FC<CreateJobModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  editJob,
}) => {
  const [form, setForm] = useState<FormData>(initialForm);
  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>({});

  useEffect(() => {
    if (editJob) {
      setForm({
        job_title: editJob.job_title,
        department: editJob.department,
        location: editJob.location,
        status: editJob.status,
        deadline: editJob.deadline === '—' ? '' : editJob.deadline,
        description: editJob.description || '',
        salary_range: editJob.salary_range || '',
        employment_type: editJob.employment_type || 'Full-time',

        pengalaman: (editJob as any).pengalaman || '',
        pendidikan: (editJob as any).pendidikan || '',
        deskripsi_pekerjaan: (editJob as any).deskripsi_pekerjaan || '',
        benefit: (editJob as any).benefit || '',
      });
    } else {
      setForm(initialForm);
    }
    setErrors({});
  }, [editJob, isOpen]);

  const validate = (): boolean => {
    const newErrors: Partial<Record<keyof FormData, string>> = {};

      if (!form.job_title.trim()) newErrors.job_title = 'Judul lowongan wajib diisi';
      if (!form.department) newErrors.department = 'Departemen wajib dipilih';
      if (!form.location) newErrors.location = 'Lokasi wajib dipilih';
      if (!form.deadline) newErrors.deadline = 'Batas akhir wajib diisi';
      if (!form.description.trim()) newErrors.description = 'Kualifikasi wajib diisi';
      if (!form.employment_type) newErrors.employment_type = 'Tipe pekerjaan wajib dipilih';
      if (!form.status) newErrors.status = 'Status wajib dipilih';
      if (!form.pengalaman.trim()) newErrors.pengalaman = 'Pengalaman wajib diisi';
      if (!form.pendidikan) newErrors.pendidikan = 'Pendidikan wajib dipilih';
      if (!form.deskripsi_pekerjaan.trim()) newErrors.deskripsi_pekerjaan = 'Deskripsi pekerjaan wajib diisi';
      if (!form.benefit.trim()) newErrors.benefit = 'Benefit wajib diisi';
        setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    onSubmit({
      ...(editJob ? { id: editJob.id } : {}),
      job_title: form.job_title,
      department: form.department,
      location: form.location,
      status: form.status,
      deadline: form.deadline || '—',
      description: form.description,
      salary_range: form.salary_range,
      employment_type: form.employment_type,

      pengalaman: form.pengalaman,
      pendidikan: form.pendidikan,
      deskripsi_pekerjaan: form.deskripsi_pekerjaan,
      benefit: form.benefit,
    });
  };

  const handleChange = (field: keyof FormData, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  if (!isOpen) return null;
  const isEditing = !!editJob;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} />

      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">

        {/* HEADER */}
        <div className="flex items-center justify-between p-6 border-b border-gray-100">
          <div>
            <h2 className="text-xl font-bold text-gray-900">
              {isEditing ? 'Edit Lowongan' : 'Buat Lowongan Baru'}
            </h2>
            <p className="text-sm text-gray-500 mt-0.5">
              {isEditing ? `Mengedit: ${editJob?.id}` : 'Isi detail lowongan pekerjaan baru'}
            </p>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-lg">
            <X size={20} className="text-gray-500" />
          </button>
        </div>

        {/* FORM */}
        <form onSubmit={handleSubmit} className="p-6 space-y-5">

          {/* Judul Lowongan */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">
              Judul Lowongan <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={form.job_title}
              onChange={(e) => handleChange('job_title', e.target.value)}
              placeholder="Contoh: Frontend Developer"
              className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm"
            />
            {errors.job_title && (
              <p className="text-xs text-red-500 mt-1">{errors.job_title}</p>
            )}
          </div>

          {/* Departemen & Lokasi */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                Departemen <span className="text-red-500">*</span>
              </label>
              <select
                value={form.department}
                onChange={(e) => handleChange('department', e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm"
              >
                <option value="">Pilih Departemen</option>
                {departments.map((dept) => (
                  <option key={dept} value={dept}>{dept}</option>
                ))}
              </select>
              {errors.department && (
                <p className="text-xs text-red-500 mt-1">{errors.department}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                Lokasi <span className="text-red-500">*</span>
              </label>
              <select
                value={form.location}
                onChange={(e) => handleChange('location', e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm"
              >
                <option value="">Pilih Lokasi</option>
                {locations.map((loc) => (
                  <option key={loc} value={loc}>{loc}</option>
                ))}
              </select>
              {errors.location && (
                <p className="text-xs text-red-500 mt-1">{errors.location}</p>
              )}
            </div>
          </div>

          {/* Status & Tipe */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                Status<span className="text-red-500">*</span>
              </label>
              <select
                value={form.status}
                onChange={(e) => handleChange('status', e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm"
              >
                <option value="draft">Draft</option>
                <option value="published">Dipublikasikan</option>
                <option value="closed">Ditutup</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                Tipe Pekerjaan<span className="text-red-500">*</span>
              </label>
              <select
                value={form.employment_type}
                onChange={(e) => handleChange('employment_type', e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm"
              >
                {employmentTypes.map((type) => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Batas Akhir & Gaji */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                Batas Akhir<span className="text-red-500">*</span>
              </label>
              <input
                type="date"
                value={form.deadline}
                onChange={(e) => handleChange('deadline', e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                Rentang Gaji
              </label>
              <input
                type="text"
                value={form.salary_range}
                onChange={(e) => handleChange('salary_range', e.target.value)}
                placeholder="Contoh: Rp 10.000.000 - Rp 15.000.000"
                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm"
              />
            </div>
          </div>

          {/* Pengalaman */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">
              Pengalaman<span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={form.pengalaman}
              onChange={(e) => handleChange('pengalaman', e.target.value)}
              placeholder="Contoh: Minimal 2 tahun"
              className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm"
            />
          </div>

          {/* Pendidikan */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">
              Pendidikan Terakhir<span className="text-red-500">*</span>
            </label>
            <select
              value={form.pendidikan}
              onChange={(e) => handleChange('pendidikan', e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm"
            >
              <option value="">Pilih Pendidikan</option>
              <option value="SMA/SMK">SMA/SMK</option>
              <option value="D3">D3</option>
              <option value="S1">S1</option>
              <option value="S2">S2</option>
              <option value="S3">S3</option>
            </select>
          </div>

          {/* Kualifikasi */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">
              Kualifikasi <span className="text-red-500">*</span>
            </label>
            <textarea
              value={form.description}
              onChange={(e) => handleChange('description', e.target.value)}
              placeholder="Tulis kualifikasi yang dibutuhkan..."
              rows={4}
              className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm resize-none"
            />
          </div>

          {/* Deskripsi Pekerjaan */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">
              Deskripsi Pekerjaan <span className="text-red-500">*</span>
            </label>
            <textarea
              value={form.deskripsi_pekerjaan}
              onChange={(e) => handleChange('deskripsi_pekerjaan', e.target.value)}
              placeholder="Tulis tanggung jawab pekerjaan..."
              rows={4}
              className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm resize-none"
            />
          </div>

          {/* Benefit */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">
              Benefit
            </label>
            <textarea
              value={form.benefit}
              onChange={(e) => handleChange('benefit', e.target.value)}
              placeholder="Contoh: BPJS, Bonus Tahunan, Work From Home..."
              rows={3}
              className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm resize-none"
            />
          </div>

          {/* ACTION */}
          <div className="flex items-center justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-xl"
            >
              Batal
            </button>

            <button
              type="submit"
              className="px-6 py-2.5 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-xl"
            >
              {isEditing ? 'Simpan Perubahan' : 'Buat Lowongan'}
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};

export default CreateJobModal;