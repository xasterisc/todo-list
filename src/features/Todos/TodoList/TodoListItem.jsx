import TextInputWithLabel from '../../../shared/TextInputWithLabel';
import {
  isValidTodoTitle,
  getTodoValidationError,
} from '../../../utils/todoValidation';
import { sanitizeInput } from '../../../utils/security';
import { useEditableTitle } from '../../../hooks/useEditableTitle';
import { useState } from 'react';

const TodoListItem = ({ todo, onCompleteTodo, onUpdateTodo }) => {
  const {
    isEditing,
    workingTitle,
    startEditing,
    cancelEdit,
    updateTitle,
    finishEdit,
  } = useEditableTitle(todo.title);
  const [localError, setLocalError] = useState('');

  const handleEdit = (event) => {
    const newValue = event.target.value;
    updateTitle(newValue);

    const validationError = getTodoValidationError(newValue);
    if (validationError) {
      setLocalError(validationError);
    } else {
      setLocalError('');
    }
  };

  const handleCancel = () => {
    setLocalError('');
    cancelEdit();
  };

  const handleUpdate = (event) => {
    event.preventDefault();
    setLocalError('');

    if (!isEditing) return;

    const validationError = getTodoValidationError(workingTitle);
    if (validationError) {
      setLocalError(validationError);
      return;
    }

    const safeTitle = sanitizeInput(workingTitle);
    if (!safeTitle) {
      setLocalError('Invalid input detected. Please try again.');
      return;
    }

    finishEdit();
    onUpdateTodo({ ...todo, title: safeTitle });
  };

  return (
    <li>
      <form onSubmit={handleUpdate}>
        {isEditing ? (
          <>
            <TextInputWithLabel
              elementId={`edit${todo.id}`}
              labelText='Todo'
              value={workingTitle}
              onChange={handleEdit}
            />
            <button type='button' onClick={handleCancel}>
              Cancel
            </button>
            <button type='submit' disabled={!isValidTodoTitle(workingTitle)}>
              Update
            </button>
            {localError && <p className='error'>{localError}</p>}
          </>
        ) : (
          <>
            <label>
              <input
                type='checkbox'
                id={`checkbox${todo.id}`}
                checked={todo.isCompleted}
                onChange={() => onCompleteTodo(todo.id)}
              />
            </label>
            <span onClick={() => startEditing()}>{todo.title}</span>
          </>
        )}
      </form>
    </li>
  );
};

export default TodoListItem;
