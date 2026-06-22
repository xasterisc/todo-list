import styles from './AboutPage.module.css';

const AboutPage = () => {
  return (
    <>
      <h2>About This Todo App</h2>
      <p className={styles.pWrapper}>
        This is a React-based todo application that helps you organize and
        manage your daily tasks in a simple and efficient way.
      </p>

      <section>
        <h3>Features</h3>
        <ul>
          <li className={styles.liWrapper}>Add new todos</li>
          <li className={styles.liWrapper}>Mark todos as completed</li>
          <li className={styles.liWrapper}>Edit existing todos</li>
          <li className={styles.liWrapper}>Filter and search todos</li>
          <li className={styles.liWrapper}>Sort todos by date or title</li>
          <li className={styles.liWrapper}>Secure user authentication</li>
        </ul>
      </section>

      <section>
        <h3>Technologies Used</h3>
        <ul>
          <li className={styles.liWrapper}>React</li>
          <li className={styles.liWrapper}>React Router</li>
          <li className={styles.liWrapper}>Vite</li>
        </ul>
      </section>
    </>
  );
};

export default AboutPage;
