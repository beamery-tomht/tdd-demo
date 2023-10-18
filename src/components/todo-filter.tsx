import { FormState } from "@beamery/lib-ds-components";
import { FC } from "react";
import { useTodosContext } from "../context/use-todos-context";

export const TodoFilter: FC<Record<string, unknown>> = () => {
  const { fetchTodos } = useTodosContext();
  return (
    <FormState.Provider>
      <FormState.Form
        dataAutomation="filter-todo-form"
        label="Todo List"
        onSubmit={(data) => {
          fetchTodos({ query: data.filter });
        }}
        direction="row"
      >
        <FormState.Input
          name="filter"
          label="Filter todo"
          hiddenLabel
          placeholder="Todo keywords"
          variant="search"
        />
        <FormState.Submit variant="secondary">Filter</FormState.Submit>
      </FormState.Form>
    </FormState.Provider>
  );
};
