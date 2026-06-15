import { Link } from 'react-router';

const NotFoundPage = () => {
  return (
    <div>
      <h2>Error 404 page not found!</h2>
      <p>Sorry, the page you're looking for doesn't exist.</p>

      <div>
        <h3>Try these options:</h3>
        <ul>
          <li>
            <Link to='/'>Back to Home page</Link>
          </li>
          <li>
            <Link to='/todos'>Check your todos</Link>
          </li>
          <li>
            <Link to='/about'>Learn about this App</Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default NotFoundPage;
