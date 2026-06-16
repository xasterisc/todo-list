import { useRef, useState } from 'react';
import TextInputWithLabel from '../../shared/TextInputWithLabel';
import {
  isValidTodoTitle,
  getTodoValidationError,
  MAX_TODO_LENGTH,
} from '../../utils/todoValidation';
import { sanitizeInput } from '../../utils/security';

const TodoForm = ({ onAddTodo }) => {
  const inputRef = useRef(null);
  const [workingTodoTitle, setWorkingTodoTitle] = useState('');
  const [localError, setLocalError] = useState('');

  const handleWorkingTodoTitle = (event) => {
    setWorkingTodoTitle(event.target.value);
    // Clear any existing errors as soon as the user starts typing again
    if (localError) setLocalError('');
  };

  const handleAddTodo = (event) => {
    event.preventDefault();
    setLocalError('');

    const validationError = getTodoValidationError(workingTodoTitle);
    if (validationError) {
      setLocalError(validationError);
      return;
    }

    const safeInput = sanitizeInput(workingTodoTitle);
    if (!safeInput) {
      setLocalError('Invalid input detected. Please try again.');
      return;
    }

    if (safeInput) {
      onAddTodo(safeInput);
      setWorkingTodoTitle('');
      inputRef.current.focus();
    }
  };

  return (
    <>
      {localError && <p>{localError}</p>}
      <form onSubmit={handleAddTodo}>
        <TextInputWithLabel
          elementId='todoTitle'
          labelText='Todo'
          onChange={handleWorkingTodoTitle}
          ref={inputRef}
          value={workingTodoTitle}
          maxLength={MAX_TODO_LENGTH}
        />
        <button type='submit' disabled={!isValidTodoTitle(workingTodoTitle)}>
          Add Todo
        </button>
      </form>
    </>
  );
};

export default TodoForm;
