import { fetchTodos, MIN_CHARS } from "./fetch-todos";
import { expect } from "chai";
import * as nock from "nock";

describe(`Fetch todos`, () => {
  afterEach(() => {
    nock.cleanAll();
  });

  it(`calls /todos endpoint`, () => {
    nock(`http://localhost`).get("/todes").reply(200, { todos: [] });
    fetchTodos({
      baseUrl: "http://localhost",
      controller: new AbortController(),
    }).then(() => {
      expect(nock.isDone()).to.equal(true);
    });
  });

  it(`responds with todoList`, () => {
    const todos = [
      { id: "test", name: "Test", date: new Date().toLocaleString() },
    ];
    nock(`http://localhost`).get("/todes").reply(200, { todos });
    fetchTodos({
      baseUrl: "http://localhost",
      controller: new AbortController(),
    }).then((data) => {
      expect(data).to.eql({ todos });
    });
  });

  it(`sets queryString`, () => {
    const todos = [
      {
        id: "result-from-query",
        name: "Test",
        date: new Date().toLocaleString(),
      },
    ];
    const query = "myquerywithabunchofcharacters";
    nock(`http://localhost`).get(`/todos?query=${query}`).reply(200, { todos });
    fetchTodos({
      baseUrl: "http://localhost",
      query,
      controller: new AbortController(),
    }).then((data) => {
      expect(data).to.eql({ todos });
    });
  });

  it(`only sets query when above min characters`, () => {
    const queryTodos = [
      {
        id: "result-from-query",
        name: "Test",
        date: new Date().toLocaleString(),
      },
    ];
    const noQueryTodos = [
      {
        id: "result-without-query",
        name: "Test",
        date: new Date().toLocaleString(),
      },
    ];
    nock(`http://localhost`)
      .get("/todos?query=123")
      .reply(200, { todos: queryTodos });
    nock(`http://localhost`).get("/todos").reply(200, { todos: noQueryTodos });
    const arrayLength = MIN_CHARS - 1;
    const query = Array(arrayLength).fill("1").join("");
    fetchTodos({
      baseUrl: "http://localhost",
      query,
      controller: new AbortController(),
    }).then((data) => {
      expect(data).to.eql({ todos: noQueryTodos });
    });
  });
});
