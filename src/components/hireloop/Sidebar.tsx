import React from 'react';
import {
  LayoutDashboard,
  Users,
  CalendarCheck,
  Briefcase,
  Wallet,
  Clock,
  Settings,
  ChevronRight,
} from 'lucide-react';

interface SidebarProps {
  currentPage: string;
  onNavigate: (page: string) => void;
  isOpen: boolean;
  onToggle: () => void;
}

interface MenuItem {
  id: string;
  label: string;
  icon: React.ReactNode;
  children?: { id: string; label: string }[];
}

const menuItems: MenuItem[] = [
  { id: 'dashboard', label: 'Dashboard', icon: <LayoutDashboard size={20} /> },
  { id: 'karyawan', label: 'Karyawan', icon: <Users size={20} /> },
  {
    id: 'rekrutmen',
    label: 'Rekrutmen',
    icon: <CalendarCheck size={20} />,
    children: [
      { id: 'job-posting', label: 'Job Posting' },
      { id: 'kandidat', label: 'Kandidat' },
    ],
  },
  { id: 'payroll', label: 'Payroll', icon: <Wallet size={20} /> },
  { id: 'attendance', label: 'Attendance', icon: <Clock size={20} /> },
  { id: 'settings', label: 'Settings', icon: <Settings size={20} /> },
];

const Sidebar: React.FC<SidebarProps> = ({
  currentPage,
  onNavigate,
  isOpen,
  onToggle,
}) => {
  const isActive = (id: string) => currentPage === id;
  const isParentActive = (item: MenuItem) =>
    item.children?.some((child) => child.id === currentPage);

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/30 z-40 lg:hidden"
          onClick={onToggle}
        />
      )}

      <aside
        className={`fixed top-0 left-0 h-full bg-white border-r border-gray-200 z-50 flex flex-col transition-transform duration-300 w-[260px]
        ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}
      >
        {/* Logo */}
        <div className="flex items-center gap-2.5 px-6 py-5 border-b border-gray-100">
          <div className="w-9 h-9 bg-blue-600 rounded-lg flex items-center justify-center">
            <Briefcase size={18} className="text-white" />
          </div>
          <span className="text-xl font-bold text-gray-900">Hireloop</span>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto py-4 px-3">
          <ul className="space-y-1">
            {menuItems.map((item) => (
              <li key={item.id}>
                <button
                  id={`nav-${item.id}`}
                  onClick={() =>
                    onNavigate(item.children ? item.children[0].id : item.id)
                  }
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition
                  ${
                    isActive(item.id) || isParentActive(item)
                      ? 'bg-blue-50 text-blue-700 border-l-4 border-blue-600'
                      : 'text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  <span
                    className={`${
                      isActive(item.id) || isParentActive(item)
                        ? 'text-blue-600'
                        : 'text-gray-400'
                    }`}
                  >
                    {item.icon}
                  </span>
                  <span className="flex-1 text-left">{item.label}</span>
                  {item.children && (
                    <ChevronRight
                      size={14}
                      className={`transition-transform ${
                        isParentActive(item) ? 'rotate-90 text-blue-500' : 'text-gray-400'
                      }`}
                    />
                  )}
                </button>

                {/* Sub menu */}
                {item.children && isParentActive(item) && (
                  <ul className="ml-9 mt-1 space-y-0.5">
                    {item.children.map((child) => (
                      <li key={child.id}>
                        <button
                          id={`nav-${child.id}`}
                          onClick={() => onNavigate(child.id)}
                          className={`w-full text-left px-3 py-2 rounded-md text-sm
                          ${
                            isActive(child.id)
                              ? 'text-blue-700 font-semibold bg-blue-50/60'
                              : 'text-gray-500 hover:bg-gray-50'
                          }`}
                        >
                          {child.label}
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
        </nav>
      </aside>
    </>
  );
};

export default Sidebar;