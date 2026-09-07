import styles from './about.module.css';
import { getSettings } from '@/lib/content.js';

export default async function About() {
  const settings = await getSettings();

  const now = new Date();
  const timeString = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;

  const defaultAbout = `
    <p class="${styles.intro} drift-up" style="animation-delay: 0.4s">
      I am Yashvir, a multidisciplinary creator and B.Tech student exploring the intersection of technology, art, and human experience.
    </p>
    <p class="${styles.body} drift-up" style="animation-delay: 0.6s">
      I build software, write poetry, take photographs, and direct films. 
      I am less interested in the boundaries between these mediums than in what they can uncover together. 
      My work is driven by a desire to archive memories, dissect the passage of time, and build quiet digital spaces that invite reflection.
    </p>
    <p class="${styles.body} drift-up" style="animation-delay: 0.8s">
      Currently studying computer science, I spend most of my nights experimenting with web architecture, reading editorial design books, or documenting the empty streets of the city.
    </p>
  `;

  return (
    <div className={styles.container}>
      <div className={styles.topMeta}>
        <span className="text-mono fade-in">ARCHIVE / ABOUT</span>
        <span className="text-mono fade-in">{timeString}</span>
      </div>

      <div className={styles.content}>
        <div 
          className={`${styles.portrait} reveal-image cinematic-image`} 
          style={{ backgroundImage: settings.profile_pic_url ? `url(${settings.profile_pic_url})` : undefined }}
        />

        <div className={styles.textSection}>
          {settings.about_text ? (
            <div dangerouslySetInnerHTML={{ __html: settings.about_text }} />
          ) : (
            <div dangerouslySetInnerHTML={{ __html: defaultAbout }} />
          )}

          <div className={`${styles.links} fade-in`} style={{ animationDelay: '1.2s' }}>
            {settings.cv_url && <a href={settings.cv_url} target="_blank" className="text-mono">Download CV</a>}
            {settings.email && <a href={`mailto:${settings.email}`} className="text-mono">{settings.email}</a>}
            {!settings.cv_url && !settings.email && (
              <>
                <a href="#" className="text-mono">Download CV</a>
                <a href="mailto:hello@example.com" className="text-mono">hello@example.com</a>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
