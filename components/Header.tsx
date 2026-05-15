'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { X } from 'lucide-react';

const NAV_LINKS = [
  { href: 'http://vismuth.ru/sp12doctor', label: 'Врачи', external: true },
  { href: 'http://vismuth.ru/sp12price', label: 'Цены', external: true },
  { href: '', label: 'Пациентам', external: false },
  { href: '/schedule', label: 'График работы', external: false },
];

const ABOUT_LINKS = [
  { href: 'http://vismuth.ru/sp12oclinic', label: 'Контакты' },
  { href: '', label: 'Отзывы' },
  { href: '', label: 'Новости' },
  { href: '', label: 'Вакансии' },
  { href: '', label: '3D-тур' },
];

const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? '';

export default function Header() {
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [aboutOpen, setAboutOpen] = useState(false);

  const isActive = (href: string) => !!href && pathname === href;

  return (
    <header className="w-full bg-[#f5f5f5] sticky top-0 z-50 border-b border-[#e8e8e8]">

      {/* ── Desktop (>960px) ── */}
      <div className="hidden min-[960px]:grid grid-cols-[302px_1fr_auto] items-center min-h-[80px] px-5 gap-[45px]">

        <Link href="/" className="shrink-0">
          <Image
            src={`${basePath}/logo.png`}
            alt="ГАУЗ СО СП №12"
            width={302}
            height={49}
            priority
            className="w-[302px] h-auto object-contain"
          />
        </Link>

        <nav className="flex items-center justify-center gap-5">
          {NAV_LINKS.map(({ href, label, external }) => {
            const active = isActive(href);
            if (!href) return (
              <span
                key={label}
                style={{ fontFamily: 'Arial, sans-serif' }}
                className="text-[20px] text-[#101010] whitespace-nowrap cursor-default select-none"
              >{label}</span>
            );
            return (
              <Link
                key={href}
                href={href}
                {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                style={{ fontFamily: 'Arial, sans-serif' }}
                className={`text-[20px] whitespace-nowrap transition-colors duration-300 ${
                  active ? 'text-[#015442]' : 'text-[#101010] hover:text-[#015442]'
                }`}
              >{label}</Link>
            );
          })}

          {/* О клинике — hover dropdown */}
          <div className="relative group">
            <button
              style={{ fontFamily: 'Arial, sans-serif' }}
              className="text-[20px] text-[#101010] group-hover:text-[#015442] transition-colors duration-300 whitespace-nowrap flex items-center gap-1 cursor-pointer bg-transparent border-none p-0"
            >
              О клинике
              <svg xmlns="http://www.w3.org/2000/svg" width="9" height="6" viewBox="0 0 9 6" fill="none">
                <path d="M8.35352 0.353546L4.35352 4.35355L0.353515 0.353546" stroke="currentColor"/>
              </svg>
            </button>
            <div className="absolute top-[calc(100%+10px)] left-0 bg-[#f5f5f5] rounded-[10px] w-[200px] py-1.5 shadow-[0_4px_20px_rgba(0,0,0,0.10)] opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
              {ABOUT_LINKS.map(({ href, label }) =>
                href ? (
                  <Link
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ fontFamily: 'Arial, sans-serif' }}
                    className="block px-4 py-2 text-[18px] text-[#101010] hover:text-[#015442] transition-colors duration-200"
                  >{label}</Link>
                ) : (
                  <span
                    key={label}
                    style={{ fontFamily: 'Arial, sans-serif' }}
                    className="block px-4 py-2 text-[18px] text-[#101010] cursor-default"
                  >{label}</span>
                )
              )}
            </div>
          </div>
        </nav>

        <div className="flex items-center gap-4 shrink-0">
          <a
            href="tel:+73432002012"
            style={{ fontFamily: 'Arial, sans-serif', letterSpacing: '1px' }}
            className="text-[#101010] text-[16px] hover:text-[#015442] transition-colors whitespace-nowrap"
          >+7 343 200 20 12</a>
          <a
            href="https://sp12zapis.medap.me/"
            target="_blank"
            rel="noopener noreferrer"
            style={{ fontFamily: 'Arial, sans-serif', letterSpacing: '1px' }}
            className="bg-[#015442] hover:bg-[#003b2e] text-white text-[16px] px-[25px] py-[12px] rounded-[10px] transition-colors duration-200 whitespace-nowrap"
          >Записаться</a>
        </div>
      </div>

      {/* ── Mobile bar (≤960px) ── */}
      <div className="min-[960px]:hidden flex items-center justify-between min-h-[64px] px-5">
        <Link href="/">
          <Image
            src={`${basePath}/logo.png`}
            alt="ГАУЗ СО СП №12"
            width={240}
            height={39}
            priority
            className="w-[240px] h-auto object-contain"
          />
        </Link>
        <button
          onClick={() => setSidebarOpen(true)}
          aria-label="Открыть меню"
          className="flex flex-col gap-[5px] items-center p-2"
        >
          <span className="block w-[22px] h-[2px] bg-[#015442] rounded-sm" />
          <span className="block w-[22px] h-[2px] bg-[#015442] rounded-sm" />
          <span className="block w-[22px] h-[2px] bg-[#015442] rounded-sm" />
        </button>
      </div>

      {/* ── Overlay ── */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/30 z-40 min-[960px]:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* ── Sidebar ── */}
      <div
        className={`fixed top-0 right-0 h-full w-[280px] bg-[#f5f5f5] z-50 flex flex-col py-8 px-6 gap-5 transition-transform duration-300 ease-in-out min-[960px]:hidden ${
          sidebarOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <button
          onClick={() => setSidebarOpen(false)}
          aria-label="Закрыть меню"
          className="self-end p-1 text-[#1f1e22] hover:text-[#015442] transition-colors"
        >
          <X size={22} />
        </button>

        <nav className="flex flex-col items-end gap-5">
          {NAV_LINKS.map(({ href, label, external }) => {
            const active = isActive(href);
            if (!href) return (
              <span
                key={label}
                style={{ fontFamily: 'Arial, sans-serif' }}
                className="text-[20px] text-[#101010] cursor-default"
              >{label}</span>
            );
            return (
              <Link
                key={href}
                href={href}
                {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                onClick={() => setSidebarOpen(false)}
                style={{ fontFamily: 'Arial, sans-serif' }}
                className={`text-[20px] transition-colors duration-300 ${
                  active ? 'text-[#015442]' : 'text-[#101010] hover:text-[#015442]'
                }`}
              >{label}</Link>
            );
          })}

          {/* О клинике — accordion */}
          <div className="flex flex-col items-end gap-2 w-full">
            <button
              onClick={() => setAboutOpen(v => !v)}
              style={{ fontFamily: 'Arial, sans-serif' }}
              className="text-[20px] text-[#101010] hover:text-[#015442] transition-colors flex items-center gap-1.5 bg-transparent border-none cursor-pointer"
            >
              О клинике
              <svg
                xmlns="http://www.w3.org/2000/svg" width="9" height="6" viewBox="0 0 9 6" fill="none"
                className={`transition-transform duration-200 ${aboutOpen ? 'rotate-180' : ''}`}
              >
                <path d="M8.35352 0.353546L4.35352 4.35355L0.353515 0.353546" stroke="currentColor"/>
              </svg>
            </button>
            {aboutOpen && (
              <div className="flex flex-col items-end gap-2 pr-3 border-r-2 border-[#e8e8e8]">
                {ABOUT_LINKS.map(({ href, label }) =>
                  href ? (
                    <Link
                      key={label}
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => setSidebarOpen(false)}
                      style={{ fontFamily: 'Arial, sans-serif' }}
                      className="text-[18px] text-[#101010] hover:text-[#015442] transition-colors"
                    >{label}</Link>
                  ) : (
                    <span
                      key={label}
                      style={{ fontFamily: 'Arial, sans-serif' }}
                      className="text-[18px] text-[#101010] cursor-default"
                    >{label}</span>
                  )
                )}
              </div>
            )}
          </div>
        </nav>

        <div className="mt-auto flex flex-col items-end gap-4 pt-5 border-t border-[#e0e0e0]">
          <a
            href="tel:+73432002012"
            style={{ fontFamily: 'Arial, sans-serif', letterSpacing: '1px' }}
            className="text-[#101010] text-[16px] hover:text-[#015442] transition-colors"
          >+7 343 200 20 12</a>
          <a
            href="https://sp12zapis.medap.me/"
            target="_blank"
            rel="noopener noreferrer"
            style={{ fontFamily: 'Arial, sans-serif', letterSpacing: '1px' }}
            className="bg-[#015442] hover:bg-[#003b2e] text-white text-[16px] px-5 py-3 rounded-[10px] transition-colors duration-200 w-full text-center"
          >Записаться</a>
        </div>
      </div>

    </header>
  );
}
