import { useRef, useState } from 'react';

const TodoForm = ({ onAddTodo }) => {
  const inputRef = useRef(null);
  const [workingTodoTitle, setWorkingTodoTitle] = useState('');
  const handleWorkingTodoTitle = (event) =>
    setWorkingTodoTitle(event.target.value);

  const handleAddTodo = (event) => {
    event.preventDefault();

    const todoTitle = event.target.todoTitle.value.trim();
    if (todoTitle && todoTitle !== '') {
      onAddTodo(todoTitle);
      event.target.reset();
      inputRef.current.focus();
    }
  };

  return (
    <form onSubmit={handleAddTodo}>
      <label htmlFor='todoTitle'>Todo</label>
      <input
        ref={inputRef}
        type='text'
        id='todoTitle'
        name='todoTitle'
        placeholder={'Todo text'}
        value={workingTodoTitle}
        onChange={handleWorkingTodoTitle}
        required
      />
      <button type='submit'>Add Todo</button>
    </form>
  );
};

export default TodoForm;
