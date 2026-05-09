const TodoListItem = ({ todo, onCompleteTodo }) => {
  return (
    <li>
      <input
        type='checkbox'
        checked={todo.isComplete}
        onChange={() => onCompleteTodo(todo.id)}
      />
      {todo.title}
    </li>
  );
};

export default TodoListItem;
