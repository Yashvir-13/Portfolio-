import styles from './photography.module.css';
import photography from '@/content/photography.json';

export default function Photography() {
  return (
    <div className={styles.container}>
      <div className={styles.topMeta}>
        <span className="text-mono fade-in">ARCHIVE / PHOTOGRAPHY</span>
        <span className="text-mono fade-in">02:17</span>
      </div>

      <div className={styles.gallery}>
        {photography.map((photo, index) => {
          const isMassive = index % 4 === 0;
          const isRight = index % 2 !== 0;
          
          return (
            <figure 
              key={photo.id} 
              className={`${styles.photoItem} ${isMassive ? styles.massive : styles.standard} ${isRight ? styles.right : ''}`}
            >
              <div className={`${styles.imagePlaceholder} reveal-image cinematic-image`} style={{ animationDelay: `${0.2 + (index % 3) * 0.2}s` }} />
              
              <figcaption className={`${styles.caption} fade-in`} style={{ animationDelay: `${0.8 + (index % 3) * 0.2}s` }}>
                <span className="text-meta">{photo.location} / {photo.date}</span>
                <p className={styles.captionText}>{photo.caption}</p>
              </figcaption>
            </figure>
          );
        })}
      </div>
    </div>
  );
}
