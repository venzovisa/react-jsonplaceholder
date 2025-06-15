import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { usersEndpoints } from "./users";
import { todosEndpoints } from "./todos";
import { postsEndpoints } from "./posts";
import { baseUrl } from "../utils/utils";

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl,
    prepareHeaders: (headers) => {
      return headers.set("Content-Type", "application/json");
    },
  }),
  tagTypes: ["Posts", "Users", "Todos"],
  endpoints: () => ({}),
})
  .injectEndpoints({
    endpoints: todosEndpoints,
  })
  .injectEndpoints({
    endpoints: postsEndpoints,
  })
  .injectEndpoints({
    endpoints: usersEndpoints,
  });

export const {
  useGetUsersQuery,
  useGetPostsQuery,
  useGetUserByIdQuery,
  useGetPostsByUserIdQuery,
  useGetTodosQuery,
  useDeletePostByIdMutation,
  useUpdatePostByIdMutation,
  useUpdateUserByIdMutation,
  useUpdateTodoByIdMutation,
} = apiSlice;
