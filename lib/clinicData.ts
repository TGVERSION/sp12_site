import type { Clinic, Department } from './types';

export const clinics: Clinic[] = [
  {
    id: 1,
    address: 'ул. Сибирский тракт 7/22',
    departments: ['Терапия', 'Хирургия', 'Рентген'],
  },
  {
    id: 2,
    address: 'ул. Шарташская 9',
    departments: ['Терапия', 'Детское', 'Ортопедия'],
  },
  {
    id: 3,
    address: 'ул. Луначарского 171',
    departments: ['Терапия', 'Детское', 'Хирургия', 'Ортопедия', 'Рентген'],
  },
  {
    id: 4,
    address: 'ул. Техническая 28',
    departments: ['Детское', 'Ортопедия', 'Рентген'],
  },
  {
    id: 5,
    address: 'ул. Данилы Зверева 9А',
    departments: ['Детское', 'Хирургия', 'Ортопедия'],
  },
  {
    id: 6,
    address: 'ул. Сибирский тракт 7/22, корп. 2',
    departments: ['Терапия', 'Детское', 'Рентген'],
  },
];

export const departmentColors: Record<string, string> = {
  Терапия: 'bg-blue-100 text-blue-700',
  Хирургия: 'bg-red-100 text-red-600',
  Детское: 'bg-violet-100 text-violet-700',
  Ортопедия: 'bg-emerald-100 text-emerald-700',
  Рентген: 'bg-gray-100 text-gray-600',
};

function dayOfYear(date: Date): number {
  const start = new Date(date.getFullYear(), 0, 0);
  return Math.floor((date.getTime() - start.getTime()) / 86400000);
}

function seededRandom(seed: number): () => number {
  let s = seed >>> 0;
  return () => {
    s = Math.imul(s ^ (s >>> 16), 0x45d9f3b);
    s = Math.imul(s ^ (s >>> 16), 0x45d9f3b);
    s = s ^ (s >>> 16);
    return (s >>> 0) / 0xffffffff;
  };
}

const weekdaySlots = ['с 8 до 20', 'с 8 до 21', 'с 9 до 18', 'с 9 до 19', 'с 10 до 20'];
const saturdaySlots = ['с 8 до 14', 'с 8 до 15', 'с 9 до 15', 'с 9 до 16'];

export function getWorkingHours(clinicId: number, date: Date): string {
  const isSat = date.getDay() === 6;
  const slots = isSat ? saturdaySlots : weekdaySlots;
  const seed = clinicId * 17 + dayOfYear(date) * 3 + date.getFullYear() + 999;
  const rand = seededRandom(seed);
  return slots[Math.floor(rand() * slots.length)];
}

export function getWorkingDepartments(clinicId: number, date: Date): Department[] {
  if (date.getDay() === 0) return [];

  const clinic = clinics.find((c) => c.id === clinicId);
  if (!clinic) return [];

  const seed = clinicId * 31 + dayOfYear(date) + date.getFullYear();
  const rand = seededRandom(seed);

  const depts = [...clinic.departments];
  for (let i = depts.length - 1; i > 0; i--) {
    const j = Math.floor(rand() * (i + 1));
    [depts[i], depts[j]] = [depts[j], depts[i]];
  }

  const isSat = date.getDay() === 6;
  const count = isSat
    ? Math.max(1, Math.floor(rand() * 2) + 1)
    : Math.max(2, Math.min(4, Math.floor(rand() * 3) + 2));

  return depts.slice(0, Math.min(count, depts.length));
}

export function isDateDisabled(date: Date): boolean {
  return date.getDay() === 0;
}
