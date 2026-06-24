import { NavLink } from 'react-router';
import { useAuth } from '../contexts/AuthContext';
import styles from './Navigation.module.css';

const Navigation = () => {
  const { isAuthenticated } = useAuth();

  return (
    <nav>
      <ul className={styles.navList}>
        <li>
          <NavLink to={'/about'} className={styles.navLink}>
            About
          </NavLink>
        </li>

        {isAuthenticated ? (
          <>
            <li>
              <NavLink to={'/todos'} className={styles.navLink}>
                Todos
              </NavLink>
            </li>
            <li>
              <NavLink to={'/profile'} className={styles.navLink}>
                Profile
              </NavLink>
            </li>
          </>
        ) : (
          <li>
            <NavLink to={'/login'} className={styles.navLink}>
              Login
            </NavLink>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Navigation;
