import { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

const AuthProvider = ({ children }) => {
  const [name, setName] = useState('');
  const [token, setToken] = useState('');

  const login = async (userEmail, password) => {
    try {
      const options = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: userEmail, password }),
        credentials: 'include',
      };

      const res = await fetch('/api/users/logon', options);
      if (res.ok) {
        const data = await res.json();

        if (data.name && data.csrfToken) {
          setName(data.name);
          setToken(data.csrfToken);
          return { success: true };
        }
      }
      return {
        success: false,
        error: 'Authentication failed: Invalid data received.',
      };
    } catch (error) {
      return {
        success: false,
        error: `Network error during login: ${error.name} | ${error.message}`,
      };
    }
  };

  const logout = async () => {
    if (!token) {
      setName('');
      setToken('');
      return { success: true };
    }
    try {
      const options = {
        method: 'POST',
        headers: { 'X-CSRF-TOKEN': token },
        credentials: 'include',
      };

      const res = await fetch('/api/users/logoff', options);
      if (res.status === 200 || res.status === 401) {
        setName('');
        setToken('');
        return { success: true };
      } else {
        const data = await res.json();
        return {
          success: false,
          error: data.message || 'Logoff failed',
        };
      }
    } catch (error) {
      return {
        success: false,
        error: `Error logging off: ${error.name} | ${error.message}`,
      };
    }
  };

  const value = {
    name,
    token,
    isAuthenticated: !!token,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export { AuthProvider, useAuth };
