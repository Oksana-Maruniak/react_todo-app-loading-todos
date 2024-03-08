import React, { useEffect, useState } from 'react';
import { Todo } from '../types/Todo';
import { Status } from '../types/Status';
import { getTodos } from '../api/todos';

type TodosContextType = {
  todos: Todo[];
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
  filterValue: Status;
  setFilterValue: React.Dispatch<React.SetStateAction<Status>>;
  errorMessage: string;
  setErrorMessage: React.Dispatch<React.SetStateAction<Status>>;
};

export const TodoContext = React.createContext<TodosContextType>({
  todos: [],
  setTodos: () => {},
  filterValue: Status.All,
  setFilterValue: () => {},
  errorMessage: '',
  setErrorMessage: () => {},
});

type Props = {
  children: React.ReactNode;
};

export const TodoProvider: React.FC<Props> = ({ children }) => {
  const [todos, setTodos] = useState<Todo[]>([]);

  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    getTodos()
      .then(setTodos)
      .catch(() => setErrorMessage(`Unable to load todos`));
  }, []);

  const [filterValue, setFilterValue] = useState<Status>(Status.All);

  const value = {
    todos,
    setTodos,
    filterValue,
    setFilterValue,
    errorMessage,
  };

  return (
    <TodoContext.Provider value={value}> {children} </TodoContext.Provider>
  );
};
