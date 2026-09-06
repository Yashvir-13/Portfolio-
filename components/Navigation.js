import Link from 'next/link';
import styles from './Navigation.module.css';

export default function Navigation() {
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
      <ul className={styles.navList}>
        {links.map((link) => (
          <li key={link.href}>
            <Link href={link.href} className={styles.navLink}>
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
