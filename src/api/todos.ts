import type {
  BaseQueryFn,
  EndpointBuilder,
  FetchArgs,
  FetchBaseQueryError,
  FetchBaseQueryMeta,
} from "@reduxjs/toolkit/query";
import type { Todo } from "../models";

export const todosEndpoints = (
  builder: EndpointBuilder<
    BaseQueryFn<
      string | FetchArgs,
      unknown,
      FetchBaseQueryError,
      {},
      FetchBaseQueryMeta
    >,
    "Posts" | "Users" | "Todos",
    "api"
  >
) => ({
  getTodos: builder.query<Todo[], null>({
    query: () => `/todos`,
    providesTags: (result) =>
      result
        ? [
            ...result.map(({ id }) => ({ type: "Todos", id } as const)),
            { type: "Todos", id: "TodoId" },
          ]
        : [{ type: "Todos", id: "TodoId" }],
  }),
  updateTodoById: builder.mutation<
    Promise<null>,
    { id: number; todo: Partial<Todo> }
  >({
    query: ({ id, todo }) => ({
      url: `/todos/${id}`,
      method: "PUT",
      body: JSON.stringify(todo),
    }),
    invalidatesTags: ["Todos"],
  }),
});
