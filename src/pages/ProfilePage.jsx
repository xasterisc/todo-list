import { useEffect, useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Link } from 'react-router';

const ProfilePage = () => {
  const { email, token } = useAuth();
  const [statistics, setStatistics] = useState({
    total: 0,
    completed: 0,
    active: 0,
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const controller = new AbortController();
    const { signal } = controller;

    const fetchStatistics = async () => {
      const options = {
        method: 'GET',
        headers: { 'X-CSRF-TOKEN': token },
        credentials: 'include',
        signal,
      };

      try {
        setIsLoading(true);
        setError('');

        const response = await fetch('/api/tasks', options);
        if (!response.ok) {
          if (response.status === 401) {
            throw new Error('unauthorized');
          }
          throw new Error(response.message || 'failed to fetch statistics');
        }
        const data = await response.json();

        const total = data.length;
        const completed = data.filter((todo) => todo.isCompleted).length;
        const active = total - completed;
        setStatistics({ total, completed, active });
      } catch (err) {
        setError(`Error loading statistics: ${err.message}`);
      } finally {
        setIsLoading(false);
      }
    };
    if (token) {
      fetchStatistics();
    }
    return () => controller.abort();
  }, [token]);

  return (
    <div>
      <h2>Profile Page</h2>

      <section>
        <h3>Account Information</h3>
        <pre>user email: {email}</pre>
      </section>

      <section>
        <h3>Statistics</h3>
        {isLoading ? (
          <p>
            <em>Loading stats...</em>
          </p>
        ) : error ? (
          <p style={{ color: 'red' }}>{error}</p>
        ) : statistics.total > 0 ? (
          <div>
            <p>
              <strong>Total todos: </strong>
              {statistics.total}
            </p>
            <p>
              <strong>Completed todos: </strong>
              {statistics.completed}
            </p>
            <p>
              <strong>Active todos: </strong>
              {statistics.active}
            </p>
          </div>
        ) : (
          <Link to='/todos'> Your todo list is empty — let's start one!</Link>
        )}
      </section>
    </div>
  );
};

export default ProfilePage;
