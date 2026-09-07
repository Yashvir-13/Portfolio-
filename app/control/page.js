import styles from './control.module.css';
import { getContentCounts } from '@/lib/content.js';

export default async function Dashboard() {
  const counts = await getContentCounts();

  return (
    <div>
      <div className={styles.headerRow}>
        <h1 className={styles.pageTitle}>Dashboard</h1>
      </div>
      
      <p className="text-mono" style={{ color: 'var(--muted)', marginBottom: '2rem' }}>
        Overview of archive contents.
      </p>

      <div className={styles.dashboardGrid}>
        {counts.map((c, i) => (
          <div key={i} className={styles.statCard}>
            <span className={styles.label}>{c.type.toUpperCase()} / {c.status.toUpperCase()}</span>
            <span className={`${styles.value} text-title`}>{c.count}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
