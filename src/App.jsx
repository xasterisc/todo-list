import './App.css';
import TodosPage from './features/Todos/TodosPage';
import Header from './shared/Header';
import Logon from './features/Logon';
import { useState } from 'react';

function App() {
  const [email, setEmail] = useState('');
  const [token, setTotken] = useState('');

  return (
    <div>
      <Header token={token} onSetToken={setTotken} onSetEmail={setEmail} />
      {token ? (
        <TodosPage token={token} />
      ) : (
        <Logon onSetEmail={setEmail} onSetToken={setTotken} />
      )}
    </div>
  );
}

export default App;
