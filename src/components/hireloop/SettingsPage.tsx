import React, { useState } from 'react';
import { User, Bell, Shield, Globe, Save } from 'lucide-react';
import { toast } from '@/components/ui/use-toast';

const SettingsPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState('profile');
  const [profile, setProfile] = useState({
    name: 'Admin HireLoop',
    email: 'admin@hireloop.id',
    company: 'PT HireLoop Indonesia',
    phone: '+62 812 3456 7890',
  });
  const [notifications, setNotifications] = useState({
    emailNewApplicant: true,
    emailStatusChange: true,
    emailDeadline: false,
    browserNotif: true,
  });

  const tabs = [
    { id: 'profile', label: 'Profil', icon: <User size={16} /> },
    { id: 'notifications', label: 'Notifikasi', icon: <Bell size={16} /> },
    { id: 'security', label: 'Keamanan', icon: <Shield size={16} /> },
    { id: 'general', label: 'Umum', icon: <Globe size={16} /> },
  ];

  const handleSave = () => {
    toast({
      title: 'Pengaturan Disimpan',
      description: 'Perubahan pengaturan Anda berhasil disimpan.',
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
        <p className="text-sm text-gray-500 mt-1">Kelola pengaturan akun dan preferensi Anda.</p>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Tabs */}
        <div className="lg:w-56 flex-shrink-0">
          <div className="bg-white rounded-2xl border border-gray-200 p-2">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all ${
                  activeTab === tab.id
                    ? 'bg-blue-50 text-blue-700'
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                {tab.icon}
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 bg-white rounded-2xl border border-gray-200 p-6">
          {activeTab === 'profile' && (
            <div className="space-y-5">
              <h2 className="text-lg font-bold text-gray-900">Profil Perusahaan</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">Nama</label>
                  <input
                    type="text"
                    value={profile.name}
                    onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">Email</label>
                  <input
                    type="email"
                    value={profile.email}
                    onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">Perusahaan</label>
                  <input
                    type="text"
                    value={profile.company}
                    onChange={(e) => setProfile({ ...profile, company: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">Telepon</label>
                  <input
                    type="text"
                    value={profile.phone}
                    onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                  />
                </div>
              </div>
              <div className="pt-3">
                <button
                  onClick={handleSave}
                  className="inline-flex items-center gap-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold rounded-xl transition-colors"
                >
                  <Save size={16} />
                  Simpan Perubahan
                </button>
              </div>
            </div>
          )}

          {activeTab === 'notifications' && (
            <div className="space-y-5">
              <h2 className="text-lg font-bold text-gray-900">Pengaturan Notifikasi</h2>
              <div className="space-y-4">
                {[
                  { key: 'emailNewApplicant', label: 'Email saat ada kandidat baru', desc: 'Terima email setiap ada pelamar baru.' },
                  { key: 'emailStatusChange', label: 'Email perubahan status', desc: 'Terima email saat status lowongan berubah.' },
                  { key: 'emailDeadline', label: 'Pengingat deadline', desc: 'Terima email pengingat sebelum deadline.' },
                  { key: 'browserNotif', label: 'Notifikasi browser', desc: 'Tampilkan notifikasi di browser.' },
                ].map((item) => (
                  <div key={item.key} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                    <div>
                      <p className="text-sm font-semibold text-gray-900">{item.label}</p>
                      <p className="text-xs text-gray-500 mt-0.5">{item.desc}</p>
                    </div>
                    <button
                      onClick={() =>
                        setNotifications((prev) => ({
                          ...prev,
                          [item.key]: !prev[item.key as keyof typeof prev],
                        }))
                      }
                      className={`w-11 h-6 rounded-full transition-colors relative ${
                        notifications[item.key as keyof typeof notifications] ? 'bg-blue-600' : 'bg-gray-300'
                      }`}
                    >
                      <span
                        className={`absolute top-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform ${
                          notifications[item.key as keyof typeof notifications] ? 'translate-x-5.5 left-[1px]' : 'left-0.5'
                        }`}
                        style={{
                          transform: notifications[item.key as keyof typeof notifications]
                            ? 'translateX(22px)'
                            : 'translateX(0)',
                        }}
                      />
                    </button>
                  </div>
                ))}
              </div>
              <div className="pt-3">
                <button
                  onClick={handleSave}
                  className="inline-flex items-center gap-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold rounded-xl transition-colors"
                >
                  <Save size={16} />
                  Simpan Perubahan
                </button>
              </div>
            </div>
          )}

          {(activeTab === 'security' || activeTab === 'general') && (
            <div className="text-center py-12">
              <Shield size={36} className="text-gray-300 mx-auto mb-3" />
              <h3 className="text-lg font-semibold text-gray-900 mb-1">Segera Hadir</h3>
              <p className="text-sm text-gray-500">Fitur ini sedang dalam pengembangan.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
