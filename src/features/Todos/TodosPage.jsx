import { useEffect, useState } from 'react';
import TodoForm from './TodoForm';
import TodoList from './TodoList/TodoList';

const TodosPage = ({ token }) => {
  const [todoList, setTodoList] = useState([]);
  const [error, setError] = useState('');
  const [isTodoListLoading, setIsTodoListLoading] = useState(false);

  useEffect(() => {
    const fetchTodos = async () => {
      const options = {
        method: 'GET',
        headers: { 'X-CSRF-TOKEN': token },
        credentials: 'include',
      };
      try {
        setIsTodoListLoading(true);
        const response = await fetch('/api/tasks', options);
        if (!response.ok) {
          if (response.status === 401) {
            throw new Error('unauthorized');
          }
          throw new Error(response.message || 'failed to fetch todos');
        }
        const data = await response.json();
        setTodoList(data.tasks);
      } catch (error) {
        setError(`Error: ${error.name} | ${error.message}`);
      } finally {
        setIsTodoListLoading(false);
      }
    };
    if (token) {
      fetchTodos();
    }
  }, [token]);

  const addTodo = async (todoTitle) => {
    const tempId = Date.now();
    const newTodo = {
      id: tempId,
      title: todoTitle,
      isCompleted: false,
    };
    setTodoList((prev) => [newTodo, ...prev]);

    try {
      const options = {
        method: 'POST',
        body: JSON.stringify({
          title: newTodo.title,
          isCompleted: newTodo.isCompleted,
        }),
        headers: {
          'Content-Type': 'application/json',
          'X-CSRF-TOKEN': token,
        },
        credentials: 'include',
      };
      const response = await fetch('/api/tasks', options);
      if (!response.ok) {
        throw new Error(response.message || 'Failed to add todo');
      }
      const newTodoData = await response.json();
      setTodoList((currentList) =>
        currentList.map((todo) => (todo.id === tempId ? newTodoData : todo))
      );
    } catch (error) {
      setError(
        `Error adding todo: ${newTodo.title} | Error message: ${error.message}`
      );
      setTodoList((currentList) =>
        currentList.filter((todo) => todo.id !== tempId)
      );
    }
  };

  const completeTodo = async (id) => {
    const originalTodo = todoList.find((todo) => todo.id === id);

    setTodoList((prevList) =>
      prevList.map((todo) =>
        todo.id === id ? { ...todo, isCompleted: true } : todo
      )
    );

    try {
      const options = {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRF-TOKEN': token,
        },
        body: JSON.stringify({
          isCompleted: true,
        }),
        credentials: 'include',
      };
      const response = await fetch(`/api/tasks/${id}`, options);
      if (!response.ok) {
        throw new Error(response.message || 'Failed to complete todo');
      }
    } catch (error) {
      setError(
        `Error completing todo: ${originalTodo.title} | Error message: ${error.message}`
      );
      setTodoList((currentList) =>
        currentList.map((todo) => (todo.id === id ? originalTodo : todo))
      );
    }
  };

  const updateTodo = async (editedTodo) => {
    const originalTodo = todoList.find((todo) => todo.id === editedTodo.id);

    const updatedTodos = todoList.map((todo) =>
      todo.id === editedTodo.id ? { ...editedTodo } : todo
    );
    setTodoList(updatedTodos);

    try {
      const options = {
        method: 'PATCH',
        body: JSON.stringify({
          title: editedTodo.title,
          isCompleted: editedTodo.isCompleted,
        }),
        headers: {
          'Content-Type': 'application/json',
          'X-CSRF-TOKEN': token,
        },
        credentials: 'include',
      };
      const response = await fetch(`/api/tasks/${editedTodo.id}`, options);
      if (!response.ok) {
        throw new Error(response.message || 'Failed to update todo');
      }
    } catch (error) {
      setError(
        `Error updating todo: ${editedTodo.title} || Error message: ${error.message}`
      );
      setTodoList((currentList) =>
        currentList.map((todo) =>
          todo.id === editedTodo.id ? originalTodo : todo
        )
      );
    }
  };
  return (
    <>
      {error && (
        <div>
          <p>{error}</p>
          <button onClick={() => setError('')}>Clear Error</button>
        </div>
      )}
      {isTodoListLoading && <p>Loading todos ...</p>}
      <TodoForm onAddTodo={addTodo} />
      <TodoList
        todoList={todoList}
        onCompleteTodo={completeTodo}
        onUpdateTodo={updateTodo}
      />
    </>
  );
};

export default TodosPage;
