import { useRef } from 'react';

const TodoForm = ({ onAddTodo }) => {
  const inputRef = useRef(null);

  const handleAddTodo = (event) => {
    event.preventDefault();

    console.log('Event object:', event);
    console.log('Event target:', event.target);
    console.log('Input value:', event.target.form.todoTitle.value);

    const todoTitle = event.target.form.todoTitle.value.trim();
    if (todoTitle && todoTitle !== '') {
      onAddTodo(todoTitle);
      event.target.form.reset();
      inputRef.current.focus();
    }
  };

  return (
    <form>
      <label htmlFor='todoTitle'>Todo</label>
      <input
        ref={inputRef}
        type='text'
        id='todoTitle'
        name='todoTitle'
        placeholder={'Todo text'}
        required
      />
      <button type='submit' onClick={handleAddTodo}>
        Add Todo
      </button>
    </form>
  );
};

export default TodoForm;
