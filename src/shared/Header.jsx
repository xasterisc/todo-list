import { useAuth } from '../contexts/AuthContext';
import Logoff from '../features/Logoff';
import Navigation from './Navigation';
import styles from './Header.module.css';

const Header = () => {
  const { isAuthenticated } = useAuth();

  return (
    <header className={styles.header}>
      <h1>Todo List</h1>
      <Navigation />
      {isAuthenticated && <Logoff />}
    </header>
  );
};

export default Header;
