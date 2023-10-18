describe("Todo List", () => {
  context(`Always`, () => {
    beforeEach(() => {
      cy.intercept("GET", "/todos", (req) => {
        req.reply({
          statusCode: 404,
          delay: 500,
        });
      }).as("fetchTodos");
    });

    it("renders loading cover on page load", () => {
      cy.visit("/list");
      cy.get("[data-automation=loading-cover]").should("be.visible");
    });

    it("requests todos on page load", () => {
      cy.visit("/list");
      cy.get("@fetchTodos.all").should("have.length", 1);
    });

    it("displays the add todo form", () => {
      cy.visit("/list");
      cy.get("[data-automation=add-todo-form]").should("be.visible");
    });
  });

  context(`Given todos in response`, () => {
    beforeEach(() => {
      const now = new Date(2018, 10, 30);
      cy.clock(now, ["Date"]);
      const todos = [
        {
          id: "1",
          name: "Todo 1",
          task: "Some task",
          date: now.toLocaleString(),
        },
        {
          id: "2",
          name: "Todo 2",
          task: "Some task",
          date: now.toLocaleString(),
        },
        {
          id: "3",
          name: "Todo 3",
          task: "Some task",
          date: now.toLocaleString(),
        },
        {
          id: "4",
          name: "Todo 4",
          task: "Some task",
          date: now.toLocaleString(),
        },
      ];
      cy.wrap(todos).as("todos");
      cy.intercept("GET", "/todos*", (req) => {
        req.reply({
          statusCode: 200,
          body: { todos },
          delay: 0,
        });
      }).as("fetchTodos");
    });

    it(`renders the page title`, () => {
      cy.visit("/list");
      cy.contains("Todo List").should("exist");
    });

    it("renders the todo list", () => {
      cy.visit("/list");
      cy.get("[data-automation=todo-list]").should("be.visible");
    });

    it("renders an item per todo in response", () => {
      cy.visit("/list");
      cy.get("@todos").each(
        (todo: { id: string; name: string; date: string }) => {
          cy.get(`[data-automation="todo-list/item/${todo.id}"]`)
            .should("be.visible")
            .and("contain.text", todo.name)
            .and("contain.text", todo.date);
        }
      );
    });

    it(`requests filtered todo `, () => {
      cy.visit("/list");

      cy.wait("@fetchTodos");

      cy.get("[data-automation=filter-todo-form").within(() => {
        cy.get('input[name="filter"]').type("Todo 1");
        cy.get("button[type=submit]").click();
      });

      cy.get("@fetchTodos")
        .its("request.query")
        .should("eql", { query: "Todo 1" });
      // });
    });

    it(`clears filter and sends updated request`, () => {
      cy.visit("/list");

      cy.wait("@fetchTodos");

      cy.get("[data-automation=filter-todo-form").within(() => {
        cy.get('input[name="filter"]').type("Todo 1");
        cy.get("button[type=submit]").click();
        cy.get(`[data-automation="searchfield/close"]`).click();
      });

      cy.get("@fetchTodos.1").its("request.query").should("eql", {});
    });
  });
});
