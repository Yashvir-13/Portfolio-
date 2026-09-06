import styles from './about.module.css';

export default function About() {
  return (
    <div className={styles.container}>
      <div className={styles.topMeta}>
        <span className="text-mono fade-in">ARCHIVE / ABOUT</span>
        <span className="text-mono fade-in">02:17</span>
      </div>

      <div className={styles.content}>
        <div className={`${styles.portrait} reveal-image cinematic-image`} />

        <div className={styles.textSection}>
          <p className={`${styles.intro} drift-up`} style={{ animationDelay: '0.4s' }}>
            I am Yashvir, a multidisciplinary creator and B.Tech student exploring the intersection of technology, art, and human experience.
          </p>

          <p className={`${styles.body} drift-up`} style={{ animationDelay: '0.6s' }}>
            I build software, write poetry, take photographs, and direct films. 
            I am less interested in the boundaries between these mediums than in what they can uncover together. 
            My work is driven by a desire to archive memories, dissect the passage of time, and build quiet digital spaces that invite reflection.
          </p>

          <p className={`${styles.body} drift-up`} style={{ animationDelay: '0.8s' }}>
            Currently studying computer science, I spend most of my nights experimenting with web architecture, reading editorial design books, or documenting the empty streets of the city.
          </p>

          <div className={`${styles.links} fade-in`} style={{ animationDelay: '1.2s' }}>
            <a href="#" className="text-mono">Download CV</a>
            <a href="mailto:hello@example.com" className="text-mono">hello@example.com</a>
          </div>
        </div>
      </div>
    </div>
  );
}
