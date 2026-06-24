import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router';
import { useAuth } from '../contexts/AuthContext';
import styles from './LoginPage.module.css';

const LoginPage = () => {
  const { login, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [authError, setAuthError] = useState('');
  const [isLoggingOn, setIsLoggingOn] = useState(false);

  const from = location.state?.from?.pathname || '/todos';

  useEffect(() => {
    if (isAuthenticated) {
      navigate(from, { replace: true });
    }
  }, [isAuthenticated, navigate, from]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoggingOn(true);
    setAuthError('');

    try {
      const response = await login(email, password);
      if (!response.success) {
        setAuthError(response.error);
      }
    } catch (err) {
      setAuthError(`Error: ${err.name} | ${err.message}`);
    } finally {
      setIsLoggingOn(false);
    }
  };
  return (
    <>
      {authError && <p className='error'>{authError}</p>}
      <p className={styles.message}>
        You must log in to view the page at {from}
      </p>

      <form onSubmit={handleSubmit}>
        <label htmlFor='email'>email</label>
        <input
          type='email'
          id='email'
          name='email'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <label htmlFor='password'>password</label>
        <input
          type='password'
          id='password'
          name='password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type='submit' disabled={isLoggingOn}>
          {isLoggingOn ? 'Logging in...' : 'Log In'}
        </button>
      </form>
    </>
  );
};

export default LoginPage;
