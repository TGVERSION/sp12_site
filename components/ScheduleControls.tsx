'use client';

import CalendarStrip from './CalendarStrip';
import DepartmentFilter from './DepartmentFilter';
import type { DepartmentFilter as DeptFilter } from '@/lib/types';

interface Props {
  selectedDate: Date;
  onDateSelect: (date: Date) => void;
  selectedDept: DeptFilter;
  onDeptChange: (dept: DeptFilter) => void;
}

export default function ScheduleControls({
  selectedDate,
  onDateSelect,
  selectedDept,
  onDeptChange,
}: Props) {
  return (
    <div className="bg-white rounded-2xl shadow-[0_1px_8px_rgba(0,0,0,0.07)] p-5 flex flex-col gap-4">
      <CalendarStrip selectedDate={selectedDate} onSelect={onDateSelect} />
      <div className="border-t border-gray-100 pt-4">
        <DepartmentFilter selected={selectedDept} onChange={onDeptChange} />
      </div>
    </div>
  );
}
