import styles from './control.module.css';
import Link from 'next/link';

export default function ControlLayout({ children }) {
  return (
    <div className={styles.layout}>
      <nav className={styles.nav}>
        <div className={styles.navBrand}>
          <span className={styles.navBrandTitle}>CONTROL ROOM</span>
        </div>
        <ul className={styles.navList}>
          <li><Link href="/control" className="text-mono">Dashboard</Link></li>
          <li><Link href="/control/content" className="text-mono">Content</Link></li>
          <li><Link href="/control/media" className="text-mono">Media</Link></li>
          <li><Link href="/control/settings" className="text-mono">Settings</Link></li>
        </ul>
        <div className={styles.navBottom}>
          <form action="/api/auth/logout" method="POST">
            <button type="submit" className={styles.logoutBtn}>LOGOUT</button>
          </form>
        </div>
      </nav>
      <main className={styles.main}>
        {children}
      </main>
    </div>
  );
}
