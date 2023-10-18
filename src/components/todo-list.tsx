import styled from "styled-components";
import {
  Card,
  List,
  ListItem,
  ActionMenu,
  Paragraph,
} from "@beamery/lib-ds-components";
import { theme } from "@beamery/lib-ds-theme";
import { useTodosContext } from "../context/use-todos-context";

const TodoListCard = styled(Card).attrs({ padding: "x4" })`
  border: ${theme.colors.borders.form} solid 1px;
  flex: 1;
  max-width: 400px;
`;

export const TodoList = () => {
  const { todos } = useTodosContext();
  return (
    <TodoListCard>
      <List itemBorder="between" data-automation="todo-list">
        {todos.map((todo) => (
          <ListItem
            dataAutomation={`todo-list/item/${todo.id}`}
            key={todo.id}
            text={{ children: todo.name }}
            meta={
              <Paragraph
                variant="smallCompact"
                color="secondary"
                interspersedText={[todo.task, new Date().toLocaleString()]}
              />
            }
            action={
              <ActionMenu
                startIcon="More"
                hiddenLabel="Edit Todo"
                variant="subtle"
                items={[
                  {
                    id: "1",
                    label: "Edit",
                    startIcon: "Edit",
                    elementType: "button",
                    onPress: () => console.log("Edit"),
                  },
                  {
                    id: "2",
                    label: "Delete",
                    startIcon: "Delete",
                    elementType: "button",
                    onPress: () => console.log("Share"),
                  },
                ]}
                aria-labelledby="menu"
              />
            }
          />
        ))}
      </List>
    </TodoListCard>
  );
};
