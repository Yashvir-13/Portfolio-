import styles from '../../control.module.css';
import { getContentById } from '@/lib/content.js';
import { saveContentAction, archiveContentAction } from '../actions.js';
import Link from 'next/link';

export default async function ContentEditor({ params, searchParams }) {
  const { id } = await params;
  const { type = 'project' } = await searchParams;
  
  let content = null;
  if (id !== 'new') {
    content = await getContentById(parseInt(id, 10));
    if (!content) return <div>Content not found.</div>;
  }

  // Pre-fill defaults for new
  const item = content || {
    id: 'new',
    type,
    title: '',
    slug: '',
    status: 'draft',
    excerpt: '',
    body: '',
    date: new Date(),
    source: 'native',
    external_id: '',
    hero_image: ''
  };

  const isExternal = item.source !== 'native';

  return (
    <div>
      <div className={styles.headerRow}>
        <h1 className={styles.pageTitle}>{id === 'new' ? 'New' : 'Edit'} Content</h1>
        <Link href={`/control/content?type=${item.type}`} className="text-mono" style={{ color: 'var(--muted)', textDecoration: 'none' }}>BACK</Link>
      </div>

      <form action={saveContentAction} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', maxWidth: '600px' }}>
        <input type="hidden" name="id" value={item.id} />
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          <label className="text-mono" style={{ fontSize: '0.8rem', color: 'var(--muted)' }}>TITLE</label>
          <input name="title" defaultValue={item.title} required style={{ padding: '0.5rem', background: 'transparent', border: '1px solid rgba(255,255,255,0.2)', color: 'white', fontFamily: 'var(--font-mono)' }} readOnly={isExternal} />
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          <label className="text-mono" style={{ fontSize: '0.8rem', color: 'var(--muted)' }}>SLUG</label>
          <input name="slug" defaultValue={item.slug} required style={{ padding: '0.5rem', background: 'transparent', border: '1px solid rgba(255,255,255,0.2)', color: 'white', fontFamily: 'var(--font-mono)' }} readOnly={isExternal} />
        </div>

        <div style={{ display: 'flex', gap: '1rem' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', flex: 1 }}>
            <label className="text-mono" style={{ fontSize: '0.8rem', color: 'var(--muted)' }}>TYPE</label>
            <select name="type" defaultValue={item.type} style={{ padding: '0.5rem', background: 'var(--background)', border: '1px solid rgba(255,255,255,0.2)', color: 'white', fontFamily: 'var(--font-mono)' }} disabled={isExternal}>
              <option value="project">PROJECT</option>
              <option value="film">FILM</option>
              <option value="poem">POEM</option>
              <option value="essay">ESSAY</option>
              <option value="fragment">FRAGMENT</option>
              <option value="photograph">PHOTOGRAPH</option>
              <option value="note">NOTE</option>
              <option value="unfinished">UNFINISHED</option>
            </select>
            {isExternal && <input type="hidden" name="type" value={item.type} />}
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', flex: 1 }}>
            <label className="text-mono" style={{ fontSize: '0.8rem', color: 'var(--muted)' }}>STATUS</label>
            <select name="status" defaultValue={item.status} style={{ padding: '0.5rem', background: 'var(--background)', border: '1px solid rgba(255,255,255,0.2)', color: 'white', fontFamily: 'var(--font-mono)' }}>
              <option value="draft">DRAFT</option>
              <option value="published">PUBLISHED</option>
              <option value="archived">ARCHIVED</option>
            </select>
          </div>
        </div>

        <div style={{ display: 'flex', gap: '1rem' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', flex: 1 }}>
            <label className="text-mono" style={{ fontSize: '0.8rem', color: 'var(--muted)' }}>SOURCE</label>
            <select name="source" defaultValue={item.source} style={{ padding: '0.5rem', background: 'var(--background)', border: '1px solid rgba(255,255,255,0.2)', color: 'white', fontFamily: 'var(--font-mono)' }} disabled={isExternal}>
              <option value="native">NATIVE</option>
              <option value="youtube">YOUTUBE</option>
              <option value="medium">MEDIUM</option>
              <option value="substack">SUBSTACK</option>
            </select>
            {isExternal && <input type="hidden" name="source" value={item.source} />}
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', flex: 2 }}>
            <label className="text-mono" style={{ fontSize: '0.8rem', color: 'var(--muted)' }}>EXTERNAL ID (e.g. YouTube Video ID)</label>
            <input name="external_id" defaultValue={item.external_id || ''} style={{ padding: '0.5rem', background: 'transparent', border: '1px solid rgba(255,255,255,0.2)', color: 'white', fontFamily: 'var(--font-mono)' }} readOnly={isExternal} />
          </div>
        </div>

        <div style={{ display: 'flex', gap: '1rem', padding: '1rem', backgroundColor: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.1)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flex: 1 }}>
            <input type="checkbox" name="featured" id="featured" defaultChecked={item.featured} style={{ width: '1.2rem', height: '1.2rem' }} />
            <label htmlFor="featured" className="text-mono" style={{ fontSize: '0.8rem', color: 'var(--muted)', cursor: 'pointer' }}>FEATURE ON HOMEPAGE</label>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flex: 1 }}>
            <label className="text-mono" style={{ fontSize: '0.8rem', color: 'var(--muted)' }}>HOMEPAGE ORDER</label>
            <input type="number" name="display_order" defaultValue={item.display_order || 0} style={{ padding: '0.5rem', background: 'var(--background)', border: '1px solid rgba(255,255,255,0.2)', color: 'white', fontFamily: 'var(--font-mono)', width: '60px' }} />
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          <label className="text-mono" style={{ fontSize: '0.8rem', color: 'var(--muted)' }}>HERO IMAGE URL</label>
          <input name="hero_image" defaultValue={item.hero_image || ''} placeholder="https://media.yashvir.me/..." style={{ padding: '0.5rem', background: 'transparent', border: '1px solid rgba(255,255,255,0.2)', color: 'white', fontFamily: 'var(--font-mono)' }} />
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          <label className="text-mono" style={{ fontSize: '0.8rem', color: 'var(--muted)' }}>DATE</label>
          <input name="date" type="date" defaultValue={item.date ? new Date(item.date).toISOString().split('T')[0] : ''} style={{ padding: '0.5rem', background: 'transparent', border: '1px solid rgba(255,255,255,0.2)', color: 'white', fontFamily: 'var(--font-mono)' }} readOnly={isExternal} />
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          <label className="text-mono" style={{ fontSize: '0.8rem', color: 'var(--muted)' }}>EXCERPT</label>
          <textarea name="excerpt" defaultValue={item.excerpt} rows={3} style={{ padding: '0.5rem', background: 'transparent', border: '1px solid rgba(255,255,255,0.2)', color: 'white', fontFamily: 'var(--font-mono)', resize: 'vertical' }} readOnly={isExternal} />
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          <label className="text-mono" style={{ fontSize: '0.8rem', color: 'var(--muted)' }}>BODY</label>
          <textarea name="body" defaultValue={item.body} rows={10} style={{ padding: '0.5rem', background: 'transparent', border: '1px solid rgba(255,255,255,0.2)', color: 'white', fontFamily: 'var(--font-mono)', resize: 'vertical' }} readOnly={isExternal} />
        </div>
        
        {isExternal && (
          <p className="text-mono" style={{ color: 'var(--muted)', fontSize: '0.8rem' }}>
            External content (from {item.source}) cannot be edited here, only its status and hero image can be changed. Edit the original post on {item.source}.
          </p>
        )}

        <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
          <button type="submit" className={styles.actionButton} style={{ flex: 1 }}>SAVE</button>
          {id !== 'new' && (
            <button formAction={archiveContentAction} className={styles.actionButton} style={{ flex: 1, backgroundColor: 'transparent', border: '1px solid rgba(255,255,255,0.2)' }}>
              ARCHIVE
            </button>
          )}
        </div>
      </form>
    </div>
  );
}
