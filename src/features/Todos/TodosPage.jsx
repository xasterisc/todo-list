import { useCallback, useEffect, useState } from 'react';
import TodoForm from './TodoForm';
import TodoList from './TodoList/TodoList';
import SortBy from '../../shared/SortBy';

const TodosPage = ({ token }) => {
  const [todoList, setTodoList] = useState([]);
  const [error, setError] = useState('');
  const [isTodoListLoading, setIsTodoListLoading] = useState(false);
  const [sortBy, setSortBy] = useState('creationDate');
  const [sortDirection, setSortDirection] = useState('desc');

  useEffect(() => {
    const fetchController = new AbortController();
    const { signal } = fetchController;

    const fetchTodos = async () => {
      const params = new URLSearchParams({
        sortBy,
        sortDirection,
      });
      const options = {
        method: 'GET',
        headers: { 'X-CSRF-TOKEN': token },
        credentials: 'include',
        signal,
      };
      try {
        setIsTodoListLoading(true);
        const response = await fetch(`/api/tasks?${params}`, options);
        if (!response.ok) {
          if (response.status === 401) {
            throw new Error('unauthorized');
          }
          throw new Error(response.message || 'failed to fetch todos');
        }
        const data = await response.json();
        setTodoList(data.tasks);
      } catch (err) {
        if (err.name !== 'AbortError') {
          setError(`Error: ${err.name} | ${err.message}`);
        }
      } finally {
        setIsTodoListLoading(false);
      }
    };
    if (token) {
      fetchTodos();
    }

    return () => fetchController.abort();
  }, [sortBy, sortDirection, token]);

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

  const handleSortByChange = useCallback((event) => {
    setSortBy(event.target.value);
  }, []);

  const handleSortDirectionChange = useCallback((event) => {
    setSortDirection(event.target.value);
  }, []);

  return (
    <>
      {error && (
        <div>
          <p>{error}</p>
          <button onClick={() => setError('')}>Clear Error</button>
        </div>
      )}
      {isTodoListLoading && <p>Loading todos ...</p>}
      <SortBy
        sortBy={sortBy}
        sortDirection={sortDirection}
        onSortByChange={handleSortByChange}
        onSortDirectionChange={handleSortDirectionChange}
      />
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
