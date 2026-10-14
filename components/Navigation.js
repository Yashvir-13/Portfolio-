'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import styles from './Navigation.module.css';

export default function Navigation() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  // Close menu on route change and manage body scroll
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  if (pathname.startsWith('/control')) {
    return null;
  }

  const links = [
    { href: '/', label: 'Home' },
    { href: '/work', label: 'Work' },
    { href: '/films', label: 'Films' },
    { href: '/writing', label: 'Writing' },
    { href: '/photography', label: 'Photography' },
    { href: '/notes', label: 'Notes' },
    { href: '/not-yet', label: 'Not Yet' },
    { href: '/about', label: 'About' },
  ];

  return (
    <>
      {/* DESKTOP & MOBILE TOP BAR */}
      <nav className={styles.nav}>
        {/* Mobile Header Bar */}
        <div className={styles.mobileHeaderBar}>
          <button 
            type="button" 
            className={styles.mobileToggle} 
            onClick={() => setIsOpen(!isOpen)}
            aria-expanded={isOpen}
            aria-label="Toggle Navigation Index"
          >
            <span className={styles.toggleText}>INDEX</span>
            <span className={styles.toggleIndicator}>☰</span>
          </button>
          <span className={styles.mobileBrand}>YASHVIR</span>
        </div>

        {/* Desktop Navigation Row */}
        <ul className={styles.desktopNavList}>
          {links.map((link) => {
            const isActive = link.href === '/' ? pathname === '/' : pathname.startsWith(link.href);
            return (
              <li key={link.href}>
                <Link 
                  href={link.href} 
                  className={`${styles.navLink} ${isActive ? styles.active : ''}`}
                >
                  {link.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* FULL-SCREEN MOBILE OVERLAY DRAWER */}
      {isOpen && (
        <div className={styles.mobileOverlay} role="dialog" aria-modal="true">
          <div className={styles.mobileOverlayHeader}>
            <span className="text-mono" style={{ color: 'var(--muted)' }}>LIVING ARCHIVE / INDEX</span>
            <button 
              type="button" 
              className={styles.closeButton} 
              onClick={() => setIsOpen(false)}
              aria-label="Close Navigation"
            >
              [✕ CLOSE]
            </button>
          </div>

          <div className={styles.mobileMenuContent}>
            <ul className={styles.mobileNavList}>
              {links.map((link, index) => {
                const isActive = link.href === '/' ? pathname === '/' : pathname.startsWith(link.href);
                return (
                  <li key={link.href} className={styles.mobileNavItem}>
                    <Link 
                      href={link.href} 
                      className={`${styles.mobileNavLink} ${isActive ? styles.mobileActive : ''}`}
                      onClick={() => setIsOpen(false)}
                    >
                      <span className={styles.mobileIndex}>{(index + 1).toString().padStart(2, '0')}</span>
                      <span className={styles.mobileLabel}>{link.label}</span>
                      {isActive && <span className={styles.mobileDot}>●</span>}
                    </Link>
                  </li>
                );
              })}
            </ul>

            <div className={styles.mobileOverlayFooter}>
              <div className={styles.mobileFooterMeta}>
                <span className="text-mono">02:17 AM / NOCTURNAL ACCESS</span>
                <span className="text-mono">YASHVIR — ARCHIVE V2.4</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
