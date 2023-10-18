import { FC, HTMLAttributes, useCallback, useState } from "react";
import { useThrottledLoading } from "@beamery/lib-ds-components";
import * as api from "../api";
import { Todo } from "../types/todos";
import { initialContextState } from "./todos-context-initial-state";
import { TodosContext } from "./todos-context";

export const TodosProvider: FC<HTMLAttributes<HTMLElement>> = ({
  children,
}) => {
  const [_isLoading, setIsLoading] = useState(initialContextState.isLoading);
  const [todos, setTodos] = useState<Todo[]>([]);

  const fetchTodos = useCallback(
    ({ query }: { query?: string } = {}): AbortController => {
      setIsLoading(true);

      const controller = new AbortController();
      api
        .fetchTodos({ query, controller })
        .then((data) => {
          setTodos(data.todos);
        })
        .finally(() => {
          setIsLoading(false);
        });

      return controller;
    },
    []
  );

  const { isLoading, data } = useThrottledLoading(_isLoading, todos);

  return (
    <TodosContext.Provider value={{ isLoading, fetchTodos, todos: data || [] }}>
      {children}
    </TodosContext.Provider>
  );
};
