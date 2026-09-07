import styles from './login.module.css';

export default function Login() {
  return (
    <div className={styles.container}>
      <div className={styles.loginBox}>
        <h1 className="text-mono fade-in">CONTROL ROOM</h1>
        <p className="text-meta fade-in" style={{ animationDelay: '0.2s', marginBottom: '2rem' }}>
          Restricted access.
        </p>

        <form action="/api/auth/login" method="POST" className={`${styles.form} fade-in`} style={{ animationDelay: '0.4s' }}>
          <input 
            type="password" 
            name="password" 
            placeholder="ACCESS CODE" 
            className={styles.input}
            required
            autoFocus
          />
          <button type="submit" className={styles.button}>
            ENTER
          </button>
        </form>
      </div>
    </div>
  );
}
