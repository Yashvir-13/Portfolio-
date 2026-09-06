import styles from './photography.module.css';
import photography from '@/content/photography.json';

export default function Photography() {
  return (
    <div className={styles.container}>
      <div className={styles.gallery}>
        {photography.map((photo, index) => {
          // Determine layout style based on index to create an irregular grid
          const isLarge = index % 3 === 0;
          const isOffset = index % 2 !== 0;
          
          return (
            <figure 
              key={photo.id} 
              className={`${styles.photoItem} fade-in ${isLarge ? styles.large : styles.standard} ${isOffset ? styles.offset : ''}`}
              style={{ animationDelay: `${0.2 + (index % 3) * 0.2}s` }}
            >
              <div className={`${styles.imagePlaceholder} cinematic-image`} />
              
              <figcaption className={styles.caption}>
                <div className={styles.meta}>
                  <span className="text-mono">{photo.location}</span>
                  <span className="text-mono">{photo.date}</span>
                </div>
                <p className={styles.captionText}>{photo.caption}</p>
              </figcaption>
            </figure>
          );
        })}
      </div>
    </div>
  );
}
