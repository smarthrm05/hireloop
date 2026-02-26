import React, { useState } from 'react';
import Sidebar from '@/components/hireloop/Sidebar';
import TopHeader from '@/components/hireloop/TopHeader';
import DashboardPage from '@/components/hireloop/DashboardPage';
import JobPostingPage from '@/components/hireloop/JobPostingPage';
import KandidatPage from '@/components/hireloop/KandidatPage';
import KaryawanPage from '@/components/hireloop/KaryawanPage';
import SettingsPage from '@/components/hireloop/SettingsPage';
import PlaceholderPage from '@/components/hireloop/PlaceholderPage';

const AppLayout: React.FC = () => {
  const [currentPage, setCurrentPage] = useState('job-posting');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [triggerCreateJob, setTriggerCreateJob] = useState(false);

  const handleNavigate = (page: string) => {
    if (page === 'create-job') {
      setCurrentPage('job-posting');
      setTriggerCreateJob(true);
      setTimeout(() => setTriggerCreateJob(false), 100);
    } else {
      setCurrentPage(page);
    }
    setSidebarOpen(false);
  };

  const handleCreateJob = () => {
    setCurrentPage('job-posting');
    setTriggerCreateJob(true);
    setTimeout(() => setTriggerCreateJob(false), 100);
    setSidebarOpen(false);
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'dashboard':
        return <DashboardPage onNavigate={handleNavigate} />;
      case 'job-posting':
        return <JobPostingPage />;
      case 'kandidat':
        return <KandidatPage />;
      case 'karyawan':
        return <KaryawanPage />;
      case 'settings':
        return <SettingsPage />;
      case 'payroll':
        return (
          <PlaceholderPage
            title="Payroll"
            description="Kelola penggajian dan slip gaji karyawan."
            onBack={() => handleNavigate('dashboard')}
          />
        );
      case 'attendance':
        return (
          <PlaceholderPage
            title="Attendance"
            description="Pantau kehadiran dan jam kerja karyawan."
            onBack={() => handleNavigate('dashboard')}
          />
        );
      default:
        return <JobPostingPage />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50/80">
      {/* Sidebar */}
      <Sidebar
        currentPage={currentPage}
        onNavigate={handleNavigate}
        onCreateJob={handleCreateJob}
        isOpen={sidebarOpen}
        onToggle={() => setSidebarOpen(!sidebarOpen)}
      />

      {/* Main Content */}
      <div className="lg:ml-[260px] min-h-screen flex flex-col">
        <TopHeader onToggleSidebar={() => setSidebarOpen(!sidebarOpen)} />

        {/* Page Content */}
        <main className="flex-1 p-4 lg:p-6 xl:p-8">
          {renderPage()}
        </main>

        {/* Footer */}
        <footer className="border-t border-gray-200 bg-white px-4 lg:px-6 py-4">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-2">
            <p className="text-xs text-gray-400">
              HireLoop Recruitment Management System v1.0
            </p>
            <div className="flex items-center gap-4">
              <button
                onClick={() => handleNavigate('settings')}
                className="text-xs text-gray-400 hover:text-gray-600 transition-colors"
              >
                Pengaturan
              </button>
              <button className="text-xs text-gray-400 hover:text-gray-600 transition-colors">
                Bantuan
              </button>
              <button className="text-xs text-gray-400 hover:text-gray-600 transition-colors">
                Kebijakan Privasi
              </button>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default AppLayout;
