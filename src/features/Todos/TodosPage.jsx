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
    const newId = Date.now();
    const newTodo = {
      id: newId,
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
        currentList.map((todo) => (todo.id === newId ? newTodoData : todo))
      );
    } catch (error) {
      setError(
        `Error adding todo: ${newTodo.title} | Error message: ${error.message}`
      );
      setTodoList((currentList) =>
        currentList.filter((todo) => todo.id !== newId)
      );
    }
  };

  const completeTodo = (id) => {
    setTodoList((prevList) =>
      prevList.map((todo) =>
        todo.id === id ? { ...todo, isCompleted: true } : todo
      )
    );
  };

  const updateTodo = (editedTodo) => {
    const updatedTodos = todoList.map((todo) =>
      todo.id === editedTodo.id ? { ...editedTodo } : todo
    );
    setTodoList(updatedTodos);
  };
  return (
    <>
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
