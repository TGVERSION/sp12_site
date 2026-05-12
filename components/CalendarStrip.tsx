'use client';

import { useEffect, useRef } from 'react';
import { isDateDisabled } from '@/lib/clinicData';

const DAY_NAMES = ['вс', 'пн', 'вт', 'ср', 'чт', 'пт', 'сб'];
const MONTH_NAMES_GEN = [
  'Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь',
  'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь',
];

function generateDays(count = 60): Date[] {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return Array.from({ length: count }, (_, i) => {
    const d = new Date(today);
    d.setDate(today.getDate() + i);
    return d;
  });
}

interface MonthGroup {
  month: string;
  dates: Date[];
}

function groupByMonth(days: Date[]): MonthGroup[] {
  const groups: MonthGroup[] = [];
  let current: MonthGroup | null = null;
  for (const day of days) {
    const monthName = MONTH_NAMES_GEN[day.getMonth()];
    if (!current || current.month !== monthName) {
      current = { month: monthName, dates: [] };
      groups.push(current);
    }
    current.dates.push(day);
  }
  return groups;
}

interface Props {
  selectedDate: Date;
  onSelect: (date: Date) => void;
}

export default function CalendarStrip({ selectedDate, onSelect }: Props) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const selectedRef = useRef<HTMLButtonElement>(null);
  const isDragging = useRef(false);
  const hasDragged = useRef(false);
  const dragStartX = useRef(0);
  const dragScrollLeft = useRef(0);

  const days = generateDays(60);
  const groups = groupByMonth(days);

  useEffect(() => {
    if (selectedRef.current && scrollRef.current) {
      const container = scrollRef.current;
      const el = selectedRef.current;
      const offset = el.offsetLeft - container.offsetWidth / 2 + el.offsetWidth / 2;
      container.scrollTo({ left: Math.max(0, offset), behavior: 'smooth' });
    }
  }, []);

  const isSameDay = (a: Date, b: Date) =>
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate();

  const isWeekend = (d: Date) => d.getDay() === 0 || d.getDay() === 6;

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    isDragging.current = true;
    hasDragged.current = false;
    dragStartX.current = e.clientX;
    dragScrollLeft.current = scrollRef.current?.scrollLeft ?? 0;
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isDragging.current || !scrollRef.current) return;
    const dx = e.clientX - dragStartX.current;
    if (Math.abs(dx) > 5) hasDragged.current = true;
    scrollRef.current.scrollLeft = dragScrollLeft.current - dx;
  };

  const handleMouseUp = () => {
    isDragging.current = false;
  };

  return (
    <div
      ref={scrollRef}
      className="overflow-x-auto flex gap-5 pb-1 select-none cursor-grab active:cursor-grabbing [&::-webkit-scrollbar]:hidden"
      style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' } as React.CSSProperties}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
    >
      {groups.map((group) => (
        <div key={group.month} className="flex-shrink-0">
          <p className="text-[13px] text-[#999] font-normal mb-2 px-1">{group.month}</p>
          <div className="flex gap-1">
            {group.dates.map((date) => {
              const selected = isSameDay(date, selectedDate);
              const weekend = isWeekend(date);
              const disabled = isDateDisabled(date);

              return (
                <button
                  key={date.toISOString()}
                  ref={selected ? selectedRef : null}
                  onClick={() => {
                    if (hasDragged.current || disabled) return;
                    onSelect(date);
                  }}
                  className={`flex flex-col items-center justify-center w-[44px] h-[56px] rounded-xl transition-colors
                    ${disabled
                      ? 'opacity-40 cursor-not-allowed'
                      : selected
                      ? 'bg-[#1a3a2a] text-white cursor-pointer'
                      : weekend
                      ? 'text-[#aaa] hover:bg-gray-100 cursor-pointer'
                      : 'text-[#1f1e22] hover:bg-gray-100 cursor-pointer'
                    }`}
                >
                  <span className="text-[17px] leading-none font-semibold">
                    {date.getDate()}
                  </span>
                  <span className={`text-[11px] mt-1 leading-none ${selected ? 'text-white/70' : 'text-[#aaa]'}`}>
                    {DAY_NAMES[date.getDay()]}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}
