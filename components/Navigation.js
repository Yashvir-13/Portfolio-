'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import styles from './Navigation.module.css';

export default function Navigation() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

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
    <nav className={styles.nav}>
      <button className={styles.mobileToggle} onClick={() => setIsOpen(!isOpen)}>
        {isOpen ? 'CLOSE' : 'INDEX'}
      </button>
      <ul className={`${styles.navList} ${isOpen ? styles.open : ''}`}>
        {links.map((link) => (
          <li key={link.href}>
            <Link href={link.href} className={styles.navLink} onClick={() => setIsOpen(false)}>
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
