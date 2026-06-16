import { useRef, useState } from 'react';
import TextInputWithLabel from '../../shared/TextInputWithLabel';
import {
  isValidTodoTitle,
  getTodoValidationError,
} from '../../utils/todoValidation';
import { sanitizeInput } from '../../utils/security';

const TodoForm = ({ onAddTodo }) => {
  const inputRef = useRef(null);
  const [workingTodoTitle, setWorkingTodoTitle] = useState('');
  const [localError, setLocalError] = useState('');

  const handleWorkingTodoTitle = (event) => {
    const newValue = event.target.value;
    setWorkingTodoTitle(newValue);

    const validationError = getTodoValidationError(newValue);
    if (validationError) {
      setLocalError(validationError);
    } else {
      setLocalError('');
    }
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

    onAddTodo(safeInput);
    setWorkingTodoTitle('');
    inputRef.current.focus();
  };

  return (
    <>
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
      {localError && <pre>{localError}</pre>}
    </>
  );
};

export default TodoForm;
