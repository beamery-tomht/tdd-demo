import styled from "styled-components";
import { theme } from "@beamery/lib-ds-theme";
import { Card, FormState } from "@beamery/lib-ds-components";
import { FC } from "react";

const TodoFormCard = styled(Card).attrs({ padding: "x4" })`
  border: ${theme.colors.borders.primary} solid 1px;
  height: min-content;
`;

export const TodoForm: FC<Record<string, unknown>> = () => {
  return (
    <TodoFormCard>
      <FormState.Provider>
        <FormState.Form
          dataAutomation="add-todo-form"
          label="Test form"
          onSubmit={(data) => console.log(data)}
        >
          <FormState.Input name="name" label="Todo name" />
          <FormState.Input name="task" label="Todo task" />
          <FormState.Submit>Create</FormState.Submit>
        </FormState.Form>
      </FormState.Provider>
    </TodoFormCard>
  );
};
