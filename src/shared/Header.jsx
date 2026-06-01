import { useAuth } from '../contexts/AuthContext';
import Logoff from '../features/Logoff';

const Header = () => {
  const { isAuthenticated } = useAuth();

  return (
    <>
      <h1>Todo List</h1>
      {isAuthenticated && (
        <div>
          <Logoff />
        </div>
      )}
    </>
  );
};

export default Header;
