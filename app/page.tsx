import Link from 'next/link';

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] gap-6 text-center">
      <div className="w-16 h-16 rounded-full bg-[#1E3A2E] flex items-center justify-center">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path d="M12 2L12 22M2 12L22 12" stroke="white" strokeWidth="2.5" strokeLinecap="round"/>
        </svg>
      </div>
      <div>
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Стоматологическая поликлиника №12</h1>
        <p className="text-gray-500 text-lg">ГАУЗ СО — г. Екатеринбург</p>
      </div>
      <div className="flex flex-col sm:flex-row gap-3 mt-2">
        <Link
          href="/schedule"
          className="px-6 py-3 bg-[#1E3A2E] text-white rounded-xl font-medium hover:bg-[#152B21] transition-colors"
        >
          График работы
        </Link>
        <Link
          href="/contacts"
          className="px-6 py-3 bg-white text-gray-700 rounded-xl font-medium hover:bg-gray-50 transition-colors shadow-sm"
        >
          Контакты
        </Link>
      </div>
    </div>
  );
}
