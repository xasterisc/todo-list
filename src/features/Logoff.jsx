import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router';
import styles from './Logoff.module.css';

const Logoff = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const [isLoggingOff, setIsLoggingOff] = useState(false);

  const handleLogoff = async () => {
    setIsLoggingOff(true);
    setError('');

    const response = await logout();
    if (response.success) {
      navigate('/login');
    } else {
      setError(response.error);
      setIsLoggingOff(false);
    }
  };

  return (
    <div className={styles.wrapper}>
      <button
        className={styles.btnGrad}
        onClick={handleLogoff}
        disabled={isLoggingOff}
      >
        {isLoggingOff ? 'Logging off ...' : 'Log off'}
      </button>
      {error && <p className={styles.error}>{error}</p>}
    </div>
  );
};

export default Logoff;
