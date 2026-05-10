import { useRef, useState } from 'react';

const TodoForm = ({ onAddTodo }) => {
  const inputRef = useRef(null);
  const [workingTodoTitle, setWorkingTodoTitle] = useState('');
  const handleWorkingTodoTitle = (event) =>
    setWorkingTodoTitle(event.target.value);

  const handleAddTodo = (event) => {
    event.preventDefault();

    if (workingTodoTitle && workingTodoTitle !== '') {
      onAddTodo(workingTodoTitle.trim());
      setWorkingTodoTitle('');
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
      <button type='submit' disabled={!workingTodoTitle.trim()}>
        Add Todo
      </button>
    </form>
  );
};

export default TodoForm;
