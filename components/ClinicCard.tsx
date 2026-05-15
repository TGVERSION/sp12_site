import type { Clinic, Department } from '@/lib/types';
import { departmentColors } from '@/lib/clinicData';
import { MapPin, Clock } from 'lucide-react';

interface Props {
  clinic: Clinic;
  workingDepts: Department[];
  hours: string;
}

export default function ClinicCard({ clinic, workingDepts, hours }: Props) {
  return (
    <div className="bg-white rounded-2xl p-5 shadow-[0_2px_12px_rgba(0,0,0,0.07)] flex flex-col gap-4 border border-gray-100">
      <div className="flex items-start gap-2">
        <MapPin size={15} className="text-[#e74c3c] mt-0.5 shrink-0" />
        <span className="text-[14px] font-medium text-[#1f1e22] leading-snug">
          {clinic.address}
        </span>
      </div>
      {workingDepts.length === 0 ? (
        <p className="text-[13px] text-gray-400 italic">Филиал не работает</p>
      ) : (
        <div className="flex flex-wrap gap-2">
          {workingDepts.map((dept) => (
            <span
              key={dept}
              className={`px-3 py-[5px] rounded-lg text-[12px] font-medium ${
                departmentColors[dept] ?? 'bg-gray-100 text-gray-600'
              }`}
            >
              {dept}
            </span>
          ))}
        </div>
      )}
      <div className="flex items-center gap-1.5 mt-auto">
        <Clock size={13} className="text-gray-400 shrink-0" />
        <span className="text-[13px] text-gray-500">{hours}</span>
      </div>
    </div>
  );
}
