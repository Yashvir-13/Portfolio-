import styles from './about.module.css';
import { getSettings } from '@/lib/content.js';
export default async function About() {
  const settings = await getSettings();

  const now = new Date();
  const timeString = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;

  const defaultAbout = `
    <p class="${styles.intro} drift-up" style="animation-delay: 0.4s">
      I’m Yashvir. I study computer science, make software, take photographs, write sometimes, and have been trying to make films for longer than I’d like to admit.
    </p>
    <p class="${styles.body} drift-up" style="animation-delay: 0.5s">
      I tend to jump between things. I’ll spend a week building something, get distracted by a camera, disappear into a film, and eventually come back with another idea I probably don’t have time for.
    </p>
    <p class="${styles.body} drift-up" style="animation-delay: 0.6s">
      I’m interested in cinema, photography, technology, writing, time, memory, and whatever else happens to keep me awake at 2 AM. I like seeing what happens when I approach the same idea from a different direction.
    </p>
    <p class="${styles.body} drift-up" style="animation-delay: 0.7s">
      Most of the time, I don’t really know where something is going when I start it. Sometimes it works. Sometimes it doesn’t. Sometimes it sits around unfinished for a while and becomes something else later.
    </p>
    <p class="${styles.body} drift-up" style="animation-delay: 0.8s">
      These days, most of my nights are spent building software, reading, watching films, experimenting with whatever has caught my attention, or wandering around with a camera when the streets are quiet.
    </p>
    <p class="${styles.body} drift-up" style="animation-delay: 0.9s">
      I don’t have a particularly grand plan for any of this. I’m mostly curious, and I like seeing where that takes me.
    </p>
    <p class="${styles.body} drift-up" style="animation-delay: 1.0s">
      here’s who I am, what I do, and why I think I do it.
    </p>
    <p class="${styles.body} drift-up" style="animation-delay: 1.1s">
      Anyway, here we are.
    </p>
  `;

  return (
    <div className={styles.container}>
      <div className={styles.topMeta}>
        <span className="text-mono fade-in">ARCHIVE / ABOUT</span>
        <span className="text-mono fade-in">{timeString}</span>
      </div>

      <div className={styles.content}>
        <div className={styles.portraitWrapper}>
          {settings.profile_pic_url ? (
            <img 
              src={settings.profile_pic_url} 
              className={`${styles.portrait} reveal-image cinematic-image`}
              alt="Portrait"
            />
          ) : (
            <div className={`${styles.portrait} reveal-image cinematic-image`} />
          )}
        </div>

        <div className={styles.textSection}>
          {settings.about_text ? (
            <div className={styles.richText} dangerouslySetInnerHTML={{ __html: settings.about_text }} />
          ) : (
            <div className={styles.richText} dangerouslySetInnerHTML={{ __html: defaultAbout }} />
          )}

          <div className={`${styles.links} fade-in`} style={{ animationDelay: '1.2s' }}>
            {settings.cv_url && <a href={settings.cv_url} target="_blank" className="text-mono">Download CV</a>}
            {settings.email && <a href={`mailto:${settings.email}`} className="text-mono">{settings.email}</a>}
            {!settings.cv_url && !settings.email && (
              <>
                <a href="#" className="text-mono">Download CV</a>
                <a href="mailto:yashvir.126@gmail.com" className="text-mono">yashvir.126@gmail.com</a>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
