import { createContext } from "react";
import {
  initialContextState,
  TodosContextState,
} from "./todos-context-initial-state";

export interface TodosContextProps extends TodosContextState {
  fetchTodos: (opts?: { query?: string }) => AbortController;
}

export const TodosContext = createContext<TodosContextProps>({
  ...initialContextState,
  fetchTodos: () => new AbortController(),
});
