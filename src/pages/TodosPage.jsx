import { useEffect, useReducer } from 'react';
import TodoForm from '../features/Todos/TodoForm';
import TodoList from '../features/Todos/TodoList/TodoList';
import SortBy from '../shared/SortBy';
import useDebounce from '../utils/useDebounce';
import FilterInput from '../shared/FilterInput';
import {
  initialTodoState,
  TODO_ACTIONS,
  todoReducer,
} from '../reducers/todoReducer';
import { useAuth } from '../contexts/AuthContext';
import { useSearchParams } from 'react-router';
import StatusFilter from '../shared/StatusFilter';
import styles from './TodosPage.module.css';

const TodosPage = () => {
  const { token } = useAuth();
  const [searchParams] = useSearchParams();
  const [state, dispatch] = useReducer(todoReducer, initialTodoState);
  const {
    todoList,
    error,
    filterError,
    isTodoListLoading,
    sortBy,
    sortDirection,
    filterTerm,
    dataVersion,
  } = state;

  const debouncedFilterTerm = useDebounce(filterTerm, 300);

  const statusFilter = searchParams.get('status') || 'all';

  const handleFilterChange = (newTerm) => {
    dispatch({
      type: TODO_ACTIONS.SET_FILTER,
      payload: { filterTerm: newTerm },
    });
  };
  useEffect(() => {
    const fetchController = new AbortController();
    const { signal } = fetchController;

    const fetchTodos = async () => {
      const paramsObject = {
        sortBy,
        sortDirection,
      };
      if (debouncedFilterTerm) {
        paramsObject.find = debouncedFilterTerm;
      }
      const params = new URLSearchParams(paramsObject);
      const options = {
        method: 'GET',
        headers: { 'X-CSRF-TOKEN': token },
        credentials: 'include',
        signal,
      };
      try {
        dispatch({
          type: TODO_ACTIONS.FETCH_START,
        });

        const response = await fetch(`/api/tasks?${params}`, options);
        if (!response.ok) {
          if (response.status === 401) {
            throw new Error('unauthorized');
          }
          throw new Error(response.message || 'failed to fetch todos');
        }
        const data = await response.json();

        dispatch({
          type: TODO_ACTIONS.FETCH_SUCCESS,
          payload: { tasks: data.tasks },
        });
      } catch (err) {
        if (err.name !== 'AbortError') {
          dispatch({
            type: TODO_ACTIONS.FETCH_ERROR,
            payload: {
              err,
              debouncedFilterTerm,
              sortBy,
              sortDirection,
            },
          });
        }
      }
    };
    if (token) {
      fetchTodos();
    }

    return () => fetchController.abort();
  }, [debouncedFilterTerm, sortBy, sortDirection, token]);

  const addTodo = async (todoTitle) => {
    const tempId = Date.now();
    const newTodo = {
      id: tempId,
      title: todoTitle,
      isCompleted: false,
    };

    dispatch({
      type: TODO_ACTIONS.ADD_TODO_START,
      payload: {
        newTodo,
      },
    });

    try {
      const options = {
        method: 'POST',
        body: JSON.stringify({
          title: newTodo.title,
          isCompleted: newTodo.isCompleted,
        }),
        headers: {
          'Content-Type': 'application/json',
          'X-CSRF-TOKEN': token,
        },
        credentials: 'include',
      };
      const response = await fetch('/api/tasks', options);
      if (!response.ok) {
        throw new Error(response.message || 'Failed to add todo');
      }
      const newTodoData = await response.json();
      dispatch({
        type: TODO_ACTIONS.ADD_TODO_SUCCESS,
        payload: {
          tempId,
          newTodoData,
        },
      });
    } catch (error) {
      dispatch({
        type: TODO_ACTIONS.ADD_TODO_ERROR,
        payload: {
          message: `Error adding todo: ${newTodo.title} | Error message: ${error.message}`,
          tempId,
        },
      });
    }
  };

  const completeTodo = async (id) => {
    const originalTodo = todoList.find((todo) => todo.id === id);

    dispatch({
      type: TODO_ACTIONS.COMPLETE_TODO_START,
      payload: { id },
    });

    try {
      const options = {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRF-TOKEN': token,
        },
        body: JSON.stringify({
          isCompleted: true,
        }),
        credentials: 'include',
      };
      const response = await fetch(`/api/tasks/${id}`, options);
      if (!response.ok) {
        throw new Error(response.message || 'Failed to complete todo');
      }
      dispatch({
        type: TODO_ACTIONS.COMPLETE_TODO_SUCCESS,
      });
    } catch (error) {
      dispatch({
        type: TODO_ACTIONS.COMPLETE_TODO_ERROR,
        payload: {
          message: `Error completing todo: ${originalTodo.title} | Error message: ${error.message}`,
          id,
          originalTodo,
        },
      });
    }
  };

  const updateTodo = async (editedTodo) => {
    const originalTodo = todoList.find((todo) => todo.id === editedTodo.id);

    dispatch({
      type: TODO_ACTIONS.UPDATE_TODO_START,
      payload: { editedTodo },
    });

    try {
      const options = {
        method: 'PATCH',
        body: JSON.stringify({
          title: editedTodo.title,
          isCompleted: editedTodo.isCompleted,
        }),
        headers: {
          'Content-Type': 'application/json',
          'X-CSRF-TOKEN': token,
        },
        credentials: 'include',
      };
      const response = await fetch(`/api/tasks/${editedTodo.id}`, options);
      if (!response.ok) {
        throw new Error(response.message || 'Failed to update todo');
      }
      dispatch({
        type: TODO_ACTIONS.UPDATE_TODO_SUCCESS,
      });
    } catch (error) {
      dispatch({
        type: TODO_ACTIONS.UPDATE_TODO_ERROR,
        payload: {
          message: `Error updating todo: ${editedTodo.title} || Error message: ${error.message}`,
          id: editedTodo.id,
          originalTodo,
        },
      });
    }
  };

  const handleSortByChange = (newSort) => {
    dispatch({
      type: TODO_ACTIONS.SET_SORT,
      payload: {
        sortBy: newSort,
        sortDirection,
      },
    });
  };

  const handleSortDirectionChange = (newDirection) => {
    dispatch({
      type: TODO_ACTIONS.SET_SORT,
      payload: {
        sortBy,
        sortDirection: newDirection,
      },
    });
  };

  return (
    <>
      {error && (
        <div className={styles.error}>
          <p className='error'>{error}</p>
          <button onClick={() => dispatch({ type: TODO_ACTIONS.CLEAR_ERROR })}>
            Clear Error
          </button>
        </div>
      )}
      {filterError && (
        <div className={styles.error}>
          <p className='error'>{filterError}</p>
          <button
            onClick={() => dispatch({ type: TODO_ACTIONS.CLEAR_FILTER_ERROR })}
          >
            Clear Filter Error
          </button>
          <button
            onClick={() => dispatch({ type: TODO_ACTIONS.RESET_FILTERS })}
          >
            Reset Filters
          </button>
        </div>
      )}
      {isTodoListLoading && <p>Loading todos ...</p>}
      <div className={styles.sortWrapper}>
        <SortBy
          sortBy={sortBy}
          sortDirection={sortDirection}
          onSortByChange={handleSortByChange}
          onSortDirectionChange={handleSortDirectionChange}
        />
        <StatusFilter />
      </div>
      <FilterInput
        filterTerm={filterTerm}
        onFilterChange={handleFilterChange}
      />
      <TodoForm onAddTodo={addTodo} />
      <TodoList
        todoList={todoList}
        dataVersion={dataVersion}
        onCompleteTodo={completeTodo}
        onUpdateTodo={updateTodo}
        statusFilter={statusFilter}
      />
    </>
  );
};

export default TodosPage;
