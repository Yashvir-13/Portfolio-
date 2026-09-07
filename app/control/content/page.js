import styles from '../control.module.css';
import { getAllContent } from '@/lib/content.js';
import Link from 'next/link';

// Simple table styles inline or add to control.module.css
export default async function ContentList({ searchParams }) {
  const { type = 'project' } = await searchParams;
  const content = await getAllContent(type, { includeDrafts: true, includeArchived: true });

  const types = ['project', 'film', 'poem', 'fragment', 'photograph', 'note', 'unfinished'];

  return (
    <div>
      <div className={styles.headerRow}>
        <h1 className={styles.pageTitle}>Content</h1>
        <Link href={`/control/content/new?type=${type}`} className={styles.actionButton}>
          + NEW {type.toUpperCase()}
        </Link>
      </div>

      <div style={{ marginBottom: '2rem', display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
        {types.map(t => (
          <Link 
            key={t} 
            href={`/control/content?type=${t}`}
            className="text-mono"
            style={{ 
              color: type === t ? 'var(--foreground)' : 'var(--muted)',
              textDecoration: type === t ? 'underline' : 'none'
            }}
          >
            {t.toUpperCase()}
          </Link>
        ))}
      </div>

      <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontFamily: 'var(--font-mono)', fontSize: '0.8rem' }}>
        <thead>
          <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.2)' }}>
            <th style={{ padding: '0.5rem 0' }}>TITLE</th>
            <th>STATUS</th>
            <th>SOURCE</th>
            <th>DATE</th>
            <th>ACTIONS</th>
          </tr>
        </thead>
        <tbody>
          {content.map(item => (
            <tr key={item.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
              <td style={{ padding: '0.5rem 0' }}>{item.title}</td>
              <td style={{ color: item.status === 'published' ? '#4ade80' : 'var(--muted)' }}>{item.status.toUpperCase()}</td>
              <td>{item.source.toUpperCase()}</td>
              <td>{item.date ? item.date.toISOString().split('T')[0] : 'N/A'}</td>
              <td>
                <Link href={`/control/content/${item.id}`} style={{ color: 'var(--foreground)' }}>EDIT</Link>
              </td>
            </tr>
          ))}
          {content.length === 0 && (
            <tr>
              <td colSpan="5" style={{ padding: '1rem 0', color: 'var(--muted)', textAlign: 'center' }}>
                No items found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
