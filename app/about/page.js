import styles from './about.module.css';

export default function About() {
  return (
    <div className={styles.container}>
      <div className={`${styles.portraitPlaceholder} fade-in`} />
      
      <div className={`${styles.content} fade-in`} style={{ animationDelay: '0.2s' }}>
        <p>
          I’m Yashvir, a B.Tech student interested in rather more things than I can reasonably fit into one career plan.
        </p>
        <p>
          I study technology, but I’m equally drawn toward cinema, writing, photography and questions that don't have particularly convenient answers.
        </p>
        <p>
          I like building things. I also like taking things apart — not only machines and systems, but ideas.
        </p>
        <p className={styles.indent}>
          Why does time feel like it moves?
          <br />
          What does the world actually look like independent of the way a human brain perceives it?
          <br />
          How much of what we call choice is actually choice?
          <br />
          Why can a three-minute scene in a film stay with you for years?
        </p>
        <p>
          I don't have particularly good answers to these questions.
        </p>
        <p>
          I'm interested in them anyway.
        </p>
        <p>
          This website is a record of the things I've made while trying to understand some of them: software, experiments, photographs, films, poems, and unfinished thoughts.
        </p>
        <p>
          Some are polished.
        </p>
        <p>
          Some aren't.
        </p>
        <p>
          That's intentional.
        </p>
      </div>

      <div className={`${styles.links} fade-in`} style={{ animationDelay: '0.4s' }}>
        <a href="#" className="text-mono">CV / Resume</a>
        <a href="#" className="text-mono">GitHub</a>
        <a href="#" className="text-mono">LinkedIn</a>
        <a href="mailto:hello@example.com" className="text-mono">Contact</a>
      </div>
    </div>
  );
}
