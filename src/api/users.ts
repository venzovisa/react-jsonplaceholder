import type {
  BaseQueryFn,
  EndpointBuilder,
  FetchArgs,
  FetchBaseQueryError,
  FetchBaseQueryMeta,
} from "@reduxjs/toolkit/query";
import type { User } from "../models";

export const usersEndpoints = (
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
  getUserById: builder.query<User, number>({
    query: (id: number) => `/users/${id}`,
    providesTags: [{ type: "Users", id: "UserId" }],
  }),
  getUsers: builder.query<User[], null>({
    query: () => `/users`,
    providesTags: (result) =>
      result
        ? [
            ...result.map(({ id }) => ({ type: "Users", id } as const)),
            { type: "Users", id: "UserId" },
          ]
        : [{ type: "Users", id: "UserId" }],
  }),
  updateUserById: builder.mutation<
    Promise<null>,
    { id: number; user: Partial<User> }
  >({
    query: ({ id, user }) => ({
      url: `/users/${id}`,
      method: "PUT",
      body: JSON.stringify(user),
    }),
    invalidatesTags: ["Users"],
  }),
});
