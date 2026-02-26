import React from 'react';
import { AlertTriangle, X } from 'lucide-react';
import { JobPosting } from '@/data/jobPostings';

interface DeleteConfirmModalProps {
  job: JobPosting | null;
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (id: string) => void;
}

const DeleteConfirmModal: React.FC<DeleteConfirmModalProps> = ({ job, isOpen, onClose, onConfirm }) => {
  if (!isOpen || !job) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md animate-in fade-in zoom-in-95 duration-200">
        <div className="p-6">
          <button onClick={onClose} className="absolute top-4 right-4 p-1.5 hover:bg-gray-100 rounded-lg transition-colors">
            <X size={18} className="text-gray-400" />
          </button>
          <div className="w-14 h-14 bg-red-100 rounded-2xl flex items-center justify-center mb-4">
            <AlertTriangle size={28} className="text-red-600" />
          </div>
          <h3 className="text-lg font-bold text-gray-900 mb-2">Hapus Lowongan</h3>
          <p className="text-sm text-gray-600 leading-relaxed">
            Apakah Anda yakin ingin menghapus lowongan{' '}
            <span className="font-semibold text-gray-900">"{job.job_title}"</span> ({job.job_code || job.id.slice(0, 8)})?
            Tindakan ini tidak dapat dibatalkan.
          </p>
          <div className="flex items-center gap-3 mt-6">
            <button onClick={onClose} className="flex-1 px-4 py-2.5 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-xl transition-colors">Batal</button>
            <button id={`delete-confirm-${job.id}`} onClick={() => onConfirm(job.id)} className="flex-1 px-4 py-2.5 text-sm font-medium text-white bg-red-600 hover:bg-red-700 rounded-xl transition-colors shadow-sm">Ya, Hapus</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmModal;
