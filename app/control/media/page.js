import styles from '../control.module.css';

export default function MediaPage() {
  return (
    <div>
      <div className={styles.headerRow}>
        <h1 className={styles.pageTitle}>Media</h1>
      </div>
      
      <div style={{ maxWidth: '600px' }}>
        <p className="text-mono" style={{ color: 'var(--muted)', marginBottom: '1rem', lineHeight: '1.6' }}>
          Media hosting via Cloudflare R2 has been disabled. You can host your images and videos externally using platforms like Google Drive, Google Photos, Imgur, or direct links.
        </p>
        
        <div style={{ padding: '1.5rem', backgroundColor: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.1)' }}>
          <h2 className="text-title" style={{ fontSize: '1.2rem', marginBottom: '1rem' }}>How to use external media:</h2>
          <ol className="text-mono" style={{ paddingLeft: '1.2rem', display: 'flex', flexDirection: 'column', gap: '0.8rem', color: 'var(--muted)', fontSize: '0.9rem' }}>
            <li>Upload your photo to any hosting service.</li>
            <li>Get the <strong>direct image link</strong> (a URL ending in .png, .jpg, etc).</li>
            <li>Go to the <strong>Content</strong> tab and paste the link into the <code>HERO IMAGE URL</code> field.</li>
          </ol>
        </div>

        <p className="text-mono" style={{ color: '#ff6b6b', marginTop: '2rem', fontSize: '0.8rem', lineHeight: '1.5' }}>
          <strong>Note on Google Drive/Photos:</strong> Google intentionally obfuscates direct image links to prevent hotlinking. To use a Google Drive image, you must change its sharing permissions to "Anyone with the link", copy the File ID, and use this format: 
          <br /><br />
          <code>https://drive.google.com/uc?export=view&id=YOUR_FILE_ID</code>
        </p>
      </div>
    </div>
  );
}
