import { useAuth } from '../contexts/AuthContext';
import Logoff from '../features/Logoff';
import Navigation from './Navigation';

const Header = () => {
  const { isAuthenticated } = useAuth();

  return (
    <>
      <h1>Todo List</h1>
      <Navigation />
      {isAuthenticated && (
        <div>
          <Logoff />
        </div>
      )}
    </>
  );
};

export default Header;
