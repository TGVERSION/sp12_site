'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { Menu, X } from 'lucide-react';

const NAV_LINKS = [
  { href: '/doctors', label: 'Врачи' },
  { href: '/services', label: 'Услуги' },
  { href: '/schedule', label: 'График работы' },
  { href: '/reviews', label: 'Отзывы' },
  { href: '/about', label: 'О клинике' },
];

export default function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="w-full bg-[#f5f5f5] sticky top-0 z-50 border-b border-[#e8e8e8]">
      <div className="max-w-[1200px] mx-auto px-5 h-[70px] flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="shrink-0">
          <Image
            src={`${process.env.NEXT_PUBLIC_BASE_PATH ?? ''}/logo.png`}
            alt="ГАУЗ СО СП №12"
            width={302}
            height={49}
            priority
            className="h-[49px] w-auto max-w-[302px] object-contain hidden lg:block"
          />
          <Image
            src={`${process.env.NEXT_PUBLIC_BASE_PATH ?? ''}/logo.png`}
            alt="ГАУЗ СО СП №12"
            width={130}
            height={21}
            priority
            className="h-[41px] w-auto max-w-[130px] object-contain lg:hidden"
          />
        </Link>

        {/* Desktop nav */}
        <nav className="hidden lg:flex items-center gap-[5px]">
          {NAV_LINKS.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              style={{ fontFamily: 'Arial, sans-serif' }}
              className={`px-[14px] py-[8px] rounded-[10px] text-[15px] font-medium transition-colors duration-300 whitespace-nowrap
                ${pathname === href
                  ? 'bg-[#004133] text-white'
                  : 'text-[#1f1e22] hover:bg-[#004133] hover:text-white'
                }`}
            >
              {label}
            </Link>
          ))}
        </nav>

        {/* Right: phone + button + hamburger */}
        <div className="flex items-center gap-4">
          <a
            href="tel:+73432002012"
            style={{ fontFamily: 'Arial, sans-serif' }}
            className="hidden md:block text-[#1f1e22] text-[15px] font-medium hover:text-[#015442] transition-colors whitespace-nowrap"
          >
            +7 343 200 20 12
          </a>
          <a
            href="#appointment"
            style={{ fontFamily: 'Arial, sans-serif' }}
            className="hidden sm:flex bg-[#015442] hover:bg-[#004133] text-white text-[15px] font-medium px-[18px] py-[10px] rounded-[10px] transition-colors duration-300 whitespace-nowrap"
          >
            Записаться
          </a>
          <button
            onClick={() => setOpen(!open)}
            className="lg:hidden p-2 rounded-lg hover:bg-black/5 transition-colors cursor-pointer text-[#1f1e22]"
            aria-label="Меню"
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile dropdown menu */}
      {open && (
        <div className="lg:hidden bg-[#f5f5f5] border-t border-[#e8e8e8] px-5 py-3 shadow-md">
          <nav className="flex flex-col gap-1">
            {NAV_LINKS.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                onClick={() => setOpen(false)}
                style={{ fontFamily: 'Arial, sans-serif' }}
                className={`px-4 py-2.5 rounded-[10px] text-[15px] font-medium transition-colors
                  ${pathname === href
                    ? 'bg-[#004133] text-white'
                    : 'text-[#1f1e22] hover:bg-[#004133] hover:text-white'
                  }`}
              >
                {label}
              </Link>
            ))}
          </nav>
          <div className="mt-3 pt-3 border-t border-[#e0e0e0] flex items-center justify-between">
            <a
              href="tel:+73432002012"
              style={{ fontFamily: 'Arial, sans-serif' }}
              className="text-[#1f1e22] text-[15px] font-medium"
            >
              +7 343 200 20 12
            </a>
            <a
              href="#appointment"
              style={{ fontFamily: 'Arial, sans-serif' }}
              className="bg-[#015442] text-white text-[14px] font-medium px-4 py-2 rounded-[10px]"
            >
              Записаться
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
