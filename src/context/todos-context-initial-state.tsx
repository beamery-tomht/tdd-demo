import { Todo } from "../types/todos";

export interface TodosContextState {
  isLoading: boolean;
  todos: Todo[];
}

export const initialContextState: TodosContextState = {
  isLoading: false,
  todos: [],
};
