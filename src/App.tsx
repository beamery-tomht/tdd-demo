import {
  Body,
  BodyContent,
  Heading,
  LoadingCover,
  Stack,
} from "@beamery/lib-ds-components";
import { useEffect } from "react";
import { useTodosContext } from "./context/use-todos-context";
import { TodoForm } from "./components/todo-form";
import { TodoList } from "./components/todo-list";
import { TodoFilter } from "./components/todo-filter";

export function App() {
  const { fetchTodos, isLoading } = useTodosContext();

  useEffect(() => {
    const controller = fetchTodos();
    return () => controller.abort();
  }, [fetchTodos]);

  return (
    <Body style={{ minHeight: "100vh" }}>
      <BodyContent>
        <Stack gapBetweenChildren="x4">
          <Heading>Todu List</Heading>
          {isLoading ? (
            <LoadingCover heading={{ children: "Loading..." }} />
          ) : (
            <>
              <TodoFilter />
              <Stack direction="row">
                <TodoList />
                <TodoForm />
              </Stack>
            </>
          )}
        </Stack>
      </BodyContent>
    </Body>
  );
}
