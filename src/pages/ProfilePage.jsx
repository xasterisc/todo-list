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
    const fetchTodoStats = async () => {
      const options = {
        method: 'GET',
        headers: { 'X-CSRF-TOKEN': token },
        credentials: 'include',
      };

      try {
        setIsLoading(true);
        setError('');

        const [responseAll, responseCompleted] = await Promise.all([
          fetch('/api/tasks', options),
          fetch('/api/tasks?isCompleted=true', options),
        ]);

        if (!responseAll.ok) {
          if (responseAll.status === 401) throw new Error('unauthorized');
          throw new Error('Failed to fetch all todos');
        }

        if (!responseCompleted.ok) {
          if (responseCompleted.status === 401) throw new Error('unauthorized');
          throw new Error('Failed to fetch completed todos');
        }
        const [todosAll, todosCompleted] = await Promise.all([
          responseAll.json(),
          responseCompleted.json(),
        ]);

        const total = todosAll.pagination.total;
        const completed = todosCompleted.pagination.total;
        const active = total - completed;

        setStatistics({ total, completed, active });
      } catch (err) {
        setError(`Error loading statistics: ${err.message}`);
      } finally {
        setIsLoading(false);
      }
    };
    if (token) {
      fetchTodoStats();
    }
  }, [token]);

  return (
    <div>
      <h2>Profile Page</h2>

      <section>
        <h3>Account Information</h3>
        <pre>user: {email}</pre>
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
