import type { Metadata } from 'next';
import ScheduleContent from '@/components/ScheduleContent';

export const metadata: Metadata = {
  title: 'График работы — Стоматполиклиника №12',
  description: 'Расписание работы отделений стоматологической поликлиники №12 по адресам',
};

export default function SchedulePage() {
  return <ScheduleContent />;
}
