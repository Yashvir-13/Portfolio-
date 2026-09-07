import styles from '../control.module.css';
import { getSettings } from '@/lib/content.js';
import { saveSettings } from './actions.js';

export default async function SettingsPage() {
  const settings = await getSettings();

  return (
    <div>
      <div className={styles.headerRow}>
        <h1 className={styles.pageTitle}>Settings</h1>
      </div>
      
      <form action={saveSettings} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', maxWidth: '600px' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          <label className="text-mono" style={{ fontSize: '0.8rem', color: 'var(--muted)' }}>Profile Picture URL</label>
          <input 
            type="url" 
            name="profile_pic_url" 
            defaultValue={settings.profile_pic_url || ''} 
            placeholder="https://..."
            style={{ padding: '0.5rem', background: 'transparent', border: '1px solid rgba(255,255,255,0.2)', color: 'white', fontFamily: 'var(--font-mono)' }}
          />
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          <label className="text-mono" style={{ fontSize: '0.8rem', color: 'var(--muted)' }}>Email Address</label>
          <input 
            type="email" 
            name="email" 
            defaultValue={settings.email || ''} 
            placeholder="hello@yashvir.me"
            style={{ padding: '0.5rem', background: 'transparent', border: '1px solid rgba(255,255,255,0.2)', color: 'white', fontFamily: 'var(--font-mono)' }}
          />
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          <label className="text-mono" style={{ fontSize: '0.8rem', color: 'var(--muted)' }}>CV URL</label>
          <input 
            type="url" 
            name="cv_url" 
            defaultValue={settings.cv_url || ''} 
            placeholder="https://..."
            style={{ padding: '0.5rem', background: 'transparent', border: '1px solid rgba(255,255,255,0.2)', color: 'white', fontFamily: 'var(--font-mono)' }}
          />
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          <label className="text-mono" style={{ fontSize: '0.8rem', color: 'var(--muted)' }}>About Text (HTML allowed)</label>
          <textarea 
            name="about_text" 
            defaultValue={settings.about_text || ''} 
            rows={10}
            style={{ padding: '0.5rem', background: 'transparent', border: '1px solid rgba(255,255,255,0.2)', color: 'white', fontFamily: 'var(--font-mono)' }}
          />
        </div>

        <button type="submit" className={styles.actionButton} style={{ alignSelf: 'flex-start', marginTop: '1rem' }}>
          SAVE SETTINGS
        </button>
      </form>
    </div>
  );
}
