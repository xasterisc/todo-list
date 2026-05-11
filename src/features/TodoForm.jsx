import { useRef, useState } from 'react';
import TextInputWithLabel from '../shared/TextInputWithLabel';
import { isValidTodoTitle } from '../utils/todoValidation';

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
      <TextInputWithLabel
        elementId='todoTitle'
        labelText='Todo'
        onChange={handleWorkingTodoTitle}
        ref={inputRef}
        value={workingTodoTitle}
      />
      <button type='submit' disabled={!isValidTodoTitle(workingTodoTitle)}>
        Add Todo
      </button>
    </form>
  );
};

export default TodoForm;
