import { useMemo } from 'react';
import TodoListItem from './TodoListItem';

const TodoList = ({ dataVersion, onCompleteTodo, onUpdateTodo, todoList }) => {
  const filteredTodoList = useMemo(() => {
    console.log(`Recalculating filtered todos (${dataVersion})`);
    return {
      version: dataVersion,
      todos: todoList.filter((todo) => !todo.isCompleted),
    };
  }, [dataVersion, todoList]);

  return (
    <>
      {filteredTodoList.todos.length === 0 ? (
        <p>Add todo above to get started</p>
      ) : (
        <ul>
          {filteredTodoList.todos.map((todo) => (
            <TodoListItem
              key={todo.id}
              todo={todo}
              onCompleteTodo={onCompleteTodo}
              onUpdateTodo={onUpdateTodo}
            />
          ))}
        </ul>
      )}
    </>
  );
};

export default TodoList;
