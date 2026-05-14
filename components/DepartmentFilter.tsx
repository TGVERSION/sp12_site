'use client';

import type { DepartmentFilter } from '@/lib/types';

const FILTERS: DepartmentFilter[] = ['Все', 'Терапия', 'Детское', 'Хирургия', 'Ортопедия', 'Рентген'];

interface Props {
  selected: DepartmentFilter;
  onChange: (value: DepartmentFilter) => void;
}

export default function DepartmentFilter({ selected, onChange }: Props) {
  return (
    <div className="flex items-center gap-3">
      <span className="text-[15px] text-[#1f1e22] font-medium shrink-0">Отделения:</span>
      <div
        className="flex gap-2 overflow-x-auto pb-0.5 flex-nowrap"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' } as React.CSSProperties}
      >
        {FILTERS.map((filter) => (
          <button
            key={filter}
            onClick={() => onChange(filter)}
            className={`shrink-0 px-[18px] py-[7px] rounded-full text-[14px] font-medium transition-colors cursor-pointer
              ${selected === filter
                ? 'bg-[#1a3a2a] text-white'
                : 'text-[#555] hover:bg-gray-100 border border-transparent hover:border-gray-200'
              }`}
          >
            {filter}
          </button>
        ))}
      </div>
    </div>
  );
}
