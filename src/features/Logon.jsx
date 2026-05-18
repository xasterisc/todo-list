import { useState } from 'react';

const Logon = ({ onSetEmail, onSetToken }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [authError, setAuthError] = useState('');
  const [isLoggingOn, setIsLoggingOn] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoggingOn(true);
    try {
      const response = await fetch('/api/users/logon', {
        method: 'POST',
        headers: { 'Content-type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();
      console.dir(response);
      if (response.status === 200 && data.name && data.csrfToken) {
        onSetEmail(data.name);
        onSetToken(data.csrfToken);
      } else {
        setAuthError(`Authentication failed: ${data?.message}`);
      }
    } catch (error) {
      setAuthError(`Error: ${error.name} | ${error.message}`);
    } finally {
      setIsLoggingOn(false);
    }
  };

  return (
    <>
      {authError && <p>{authError}</p>}
      <form onSubmit={handleSubmit}>
        <label htmlFor='email'>email</label>
        <input
          type='email'
          id='email'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <label htmlFor='password'>password</label>
        <input
          type='password'
          id='password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type='submit' disabled={isLoggingOn}>
          {isLoggingOn ? 'Logging in...' : 'Log On'}
        </button>
      </form>
    </>
  );
};

export default Logon;
