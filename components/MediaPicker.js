'use client';

import { useState, useEffect } from 'react';

export default function MediaPicker({ name, defaultValue, readOnly }) {
  const [value, setValue] = useState(defaultValue || '');
  const [isOpen, setIsOpen] = useState(false);
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (isOpen && files.length === 0) {
      fetchFiles();
    }
  }, [isOpen]);

  const fetchFiles = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch('/api/media/list');
      if (!res.ok) throw new Error('Failed to fetch media');
      const data = await res.json();
      setFiles(data.files || []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const isVideo = (url) => /\.(mp4|webm|ogg)$/i.test(url);

  return (
    <div style={{ position: 'relative' }}>
      <div style={{ display: 'flex', gap: '0.5rem' }}>
        <input 
          name={name} 
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="https://media.yashvir.me/..." 
          style={{ 
            flex: 1,
            padding: '0.5rem', 
            background: 'transparent', 
            border: '1px solid rgba(255,255,255,0.2)', 
            color: 'white', 
            fontFamily: 'var(--font-mono)' 
          }} 
          readOnly={readOnly}
        />
        {!readOnly && (
          <button 
            type="button" 
            onClick={() => setIsOpen(true)}
            style={{
              padding: '0.5rem 1rem',
              background: 'rgba(255,255,255,0.1)',
              border: '1px solid rgba(255,255,255,0.2)',
              color: 'white',
              fontFamily: 'var(--font-mono)',
              cursor: 'pointer',
              whiteSpace: 'nowrap'
            }}
          >
            BROWSE
          </button>
        )}
      </div>

      {isOpen && (
        <div style={{
          position: 'fixed',
          top: 0, left: 0, right: 0, bottom: 0,
          backgroundColor: 'rgba(0,0,0,0.8)',
          backdropFilter: 'blur(10px)',
          zIndex: 1000,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          <div style={{
            width: '90%',
            maxWidth: '1000px',
            maxHeight: '90vh',
            backgroundColor: '#111',
            border: '1px solid rgba(255,255,255,0.2)',
            display: 'flex',
            flexDirection: 'column'
          }}>
            <div style={{ padding: '1rem', borderBottom: '1px solid rgba(255,255,255,0.1)', display: 'flex', justifyContent: 'space-between' }}>
              <h3 className="text-mono" style={{ margin: 0, color: 'white' }}>MEDIA GALLERY</h3>
              <button 
                type="button" 
                onClick={() => setIsOpen(false)}
                style={{ background: 'transparent', border: 'none', color: 'var(--muted)', cursor: 'pointer', fontFamily: 'var(--font-mono)' }}
              >
                CLOSE [X]
              </button>
            </div>
            
            <div style={{ padding: '1rem', overflowY: 'auto', flex: 1 }}>
              {loading && <div className="text-mono" style={{ color: 'var(--muted)' }}>LOADING...</div>}
              {error && <div className="text-mono" style={{ color: '#ff6b6b' }}>ERROR: {error}</div>}
              
              {!loading && !error && files.length === 0 && (
                <div className="text-mono" style={{ color: 'var(--muted)' }}>NO MEDIA FOUND IN BUCKET.</div>
              )}

              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))',
                gap: '1rem'
              }}>
                {files.map(file => (
                  <div 
                    key={file.key}
                    onClick={() => {
                      setValue(file.url);
                      setIsOpen(false);
                    }}
                    style={{
                      aspectRatio: '1',
                      border: '1px solid rgba(255,255,255,0.1)',
                      cursor: 'pointer',
                      position: 'relative',
                      overflow: 'hidden',
                      backgroundColor: 'rgba(255,255,255,0.05)'
                    }}
                  >
                    {isVideo(file.url) ? (
                      <video 
                        src={file.url} 
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
                        muted 
                        loop
                        onMouseEnter={(e) => e.target.play()}
                        onMouseLeave={(e) => e.target.pause()}
                      />
                    ) : (
                      <img 
                        src={file.url} 
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
                        alt={file.key}
                        loading="lazy"
                      />
                    )}
                    <div style={{
                      position: 'absolute',
                      bottom: 0, left: 0, right: 0,
                      padding: '0.25rem',
                      background: 'rgba(0,0,0,0.7)',
                      color: 'white',
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.6rem',
                      whiteSpace: 'nowrap',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis'
                    }}>
                      {file.key.split('/').pop()}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
