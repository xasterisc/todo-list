const MAX_TODO_LENGTH = 255;

const isValidTodoTitle = (title) => {
  if (typeof title !== 'string') return false;
  const trimmed = title.trim();
  return trimmed !== '' && trimmed.length <= MAX_TODO_LENGTH;
};

const getTodoValidationError = (title) => {
  const trimmed = title.trim();
  if (trimmed === '') return 'Please enter a valid task.';
  if (trimmed.length > MAX_TODO_LENGTH)
    return `Task cannot exceed ${MAX_TODO_LENGTH} characters.`;
  return '';
};

export { isValidTodoTitle, MAX_TODO_LENGTH, getTodoValidationError };
