import React from 'react';
import { Construction, ArrowLeft } from 'lucide-react';

interface PlaceholderPageProps {
  title: string;
  description?: string;
  onBack: () => void;
}

const PlaceholderPage: React.FC<PlaceholderPageProps> = ({ title, description, onBack }) => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">{title}</h1>
        <p className="text-sm text-gray-500 mt-1">{description || `Halaman ${title} sedang dalam pengembangan.`}</p>
      </div>

      <div className="bg-white rounded-2xl border border-gray-200 p-16 text-center">
        <div className="w-20 h-20 bg-blue-50 rounded-2xl flex items-center justify-center mx-auto mb-5">
          <Construction size={36} className="text-blue-500" />
        </div>
        <h2 className="text-xl font-bold text-gray-900 mb-2">Segera Hadir</h2>
        <p className="text-sm text-gray-500 max-w-md mx-auto mb-6">
          Fitur {title} sedang dalam tahap pengembangan. Tim kami sedang bekerja keras untuk menghadirkan pengalaman terbaik.
        </p>
        <button
          onClick={onBack}
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold rounded-xl transition-colors"
        >
          <ArrowLeft size={16} />
          Kembali ke Dashboard
        </button>
      </div>
    </div>
  );
};

export default PlaceholderPage;
