'use client';

import { useState } from 'react';
import ScheduleControls from './ScheduleControls';
import ClinicCard from './ClinicCard';
import { clinics, getWorkingDepartments, getWorkingHours } from '@/lib/clinicData';
import type { DepartmentFilter as DeptFilter } from '@/lib/types';

function getInitialDate(): Date {
  const d = new Date();
  d.setHours(0, 0, 0, 0);
  if (d.getDay() === 0) d.setDate(d.getDate() + 1);
  return d;
}

export default function ScheduleContent() {
  const [selectedDate, setSelectedDate] = useState<Date>(getInitialDate);
  const [selectedDept, setSelectedDept] = useState<DeptFilter>('Все');

  const clinicsWithDepts = clinics.map((c) => ({
    clinic: c,
    workingDepts: getWorkingDepartments(c.id, selectedDate),
    hours: getWorkingHours(c.id, selectedDate),
  }));

  const filtered = clinicsWithDepts.filter(({ workingDepts }) =>
    selectedDept === 'Все' || workingDepts.includes(selectedDept)
  );

  return (
    <div className="flex flex-col gap-6">
      <ScheduleControls
        selectedDate={selectedDate}
        onDateSelect={setSelectedDate}
        selectedDept={selectedDept}
        onDeptChange={setSelectedDept}
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.length === 0 ? (
          <p className="col-span-full text-center text-gray-400 py-12 text-sm">
            Нет клиник с выбранным отделением
          </p>
        ) : (
          filtered.map(({ clinic, workingDepts, hours }) => (
            <ClinicCard
              key={clinic.id}
              clinic={clinic}
              workingDepts={workingDepts}
              hours={hours}
            />
          ))
        )}
      </div>
    </div>
  );
}
