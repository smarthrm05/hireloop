import React from 'react';

interface StatsCardProps {
  label: string;
  value: number;
  icon: React.ReactNode;
  color: 'blue' | 'emerald' | 'gray' | 'red';
  active?: boolean;
  onClick?: () => void;
}

const colorMap = {
  blue: {
    bg: 'bg-blue-50',
    border: 'border-blue-200',
    ring: 'ring-blue-200',
    iconBg: 'bg-blue-100',
    iconText: 'text-blue-600',
    value: 'text-gray-900',
  },
  emerald: {
    bg: 'bg-emerald-50',
    border: 'border-emerald-200',
    ring: 'ring-emerald-200',
    iconBg: 'bg-emerald-100',
    iconText: 'text-emerald-600',
    value: 'text-emerald-600',
  },
  gray: {
    bg: 'bg-gray-100',
    border: 'border-gray-300',
    ring: 'ring-gray-300',
    iconBg: 'bg-gray-200',
    iconText: 'text-gray-600',
    value: 'text-gray-700',
  },
  red: {
    bg: 'bg-red-50',
    border: 'border-red-200',
    ring: 'ring-red-200',
    iconBg: 'bg-red-100',
    iconText: 'text-red-600',
    value: 'text-red-600',
  },
};

const StatsCard: React.FC<StatsCardProps> = ({
  label,
  value,
  icon,
  color,
  active = false,
  onClick,
}) => {
  const c = colorMap[color];

  return (
    <button
      onClick={onClick}
      className={`group w-full p-4 rounded-2xl border text-left transition-all duration-300 ${
        active
          ? `${c.bg} ${c.border} ring-1 ${c.ring}`
          : 'bg-white border-gray-200 hover:' + c.border
      }`}
    >
      <div className="flex items-center gap-3">
        {/* Icon container */}
        <div
          className={`w-11 h-11 rounded-xl flex items-center justify-center 
          ${c.iconBg} ${c.iconText}
          transition-all duration-300
          group-hover:scale-110 group-hover:rotate-6
          group-hover:shadow-md`}
        >
          {icon}
        </div>

        {/* Text */}
        <div>
          <p className={`text-2xl font-bold leading-none ${c.value}`}>
            {value}
          </p>
          <p className="text-xs font-medium text-gray-500 mt-1">
            {label}
          </p>
        </div>
      </div>
    </button>
  );
};

export default StatsCard;