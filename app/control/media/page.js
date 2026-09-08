'use client';

import { useState } from 'react';
import styles from '../control.module.css';

export default function MediaPage() {
  const [uploading, setUploading] = useState(false);
  const [uploadedUrl, setUploadedUrl] = useState('');
  const [error, setError] = useState('');

  const handleUpload = async (e) => {
    e.preventDefault();
    const fileInput = e.target.elements.file;
    const file = fileInput.files[0];

    if (!file) return;

    setUploading(true);
    setError('');
    setUploadedUrl('');

    try {
      const formData = new FormData();
      formData.append('file', file);

      const res = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Failed to upload');
      }

      setUploadedUrl(data.url);
      fileInput.value = ''; // Reset input
    } catch (err) {
      setError(err.message);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div>
      <div className={styles.headerRow}>
        <h1 className={styles.pageTitle}>Media</h1>
      </div>
      
      <div style={{ maxWidth: '600px' }}>
        <p className="text-mono" style={{ color: 'var(--muted)', marginBottom: '2rem', lineHeight: '1.6' }}>
          Upload media directly to Neon Object Storage. The bucket is configured to branch with your database, ensuring your assets are perfectly synced with your content.
        </p>
        
        <div style={{ padding: '2rem', backgroundColor: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.1)' }}>
          <form onSubmit={handleUpload} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <label className="text-mono" style={{ fontSize: '0.8rem', color: 'var(--muted)' }}>SELECT FILE</label>
              <input 
                type="file" 
                name="file" 
                required 
                disabled={uploading}
                style={{ color: 'white', fontFamily: 'var(--font-mono)' }} 
              />
            </div>
            
            <button 
              type="submit" 
              className={styles.actionButton} 
              disabled={uploading}
              style={{ alignSelf: 'flex-start', marginTop: '1rem', opacity: uploading ? 0.5 : 1 }}
            >
              {uploading ? 'UPLOADING...' : 'UPLOAD TO NEON STORAGE'}
            </button>
          </form>

          {error && (
            <div className="text-mono" style={{ color: '#ff6b6b', marginTop: '1.5rem', fontSize: '0.9rem' }}>
              Error: {error}
            </div>
          )}

          {uploadedUrl && (
            <div style={{ marginTop: '2rem', padding: '1rem', border: '1px solid rgba(255,255,255,0.2)', backgroundColor: 'rgba(0,0,0,0.5)' }}>
              <p className="text-mono" style={{ color: 'var(--muted)', fontSize: '0.8rem', marginBottom: '0.5rem' }}>UPLOAD SUCCESSFUL</p>
              <p className="text-mono" style={{ wordBreak: 'break-all', color: 'white', fontSize: '0.9rem', marginBottom: '1rem' }}>
                {uploadedUrl}
              </p>
              
              {/* Optional preview if it's an image */}
              {uploadedUrl.match(/\.(jpeg|jpg|gif|png|webp|svg)$/i) && (
                <img src={uploadedUrl} alt="Preview" style={{ maxWidth: '100%', maxHeight: '300px', objectFit: 'contain' }} />
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
