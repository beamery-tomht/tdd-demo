import * as fetch from "isomorphic-fetch";
import { Todo } from "../types/todos";

export const MIN_CHARS = 2;

export const fetchTodos = async ({
  baseUrl = "",
  query = "",
  controller = new AbortController(),
}: {
  baseUrl?: string;
  query?: string;
  controller?: AbortController;
} = {}) => {
  const queryString =
    query && query.length > MIN_CHARS ? `?query=${query}` : "";

  const url = `${baseUrl}/todos${queryString}`;

  const res = await fetch(url, {
    signal: controller.signal,
  });

  const data = (await res.json()) as { todos: Todo[] };

  return data;
};
