import type {
  BaseQueryFn,
  EndpointBuilder,
  FetchArgs,
  FetchBaseQueryError,
  FetchBaseQueryMeta,
} from "@reduxjs/toolkit/query";
import type { ID, Post } from "../models";

export const postsEndpoints = (
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
  getPostsByUserId: builder.query<Post[], ID>({
    query: (id: ID) => `/posts?userId=${id}`,
    providesTags: (result) =>
      result
        ? [
            ...result.map(({ id }) => ({ type: "Posts", id } as const)),
            { type: "Posts", id: "UserId" },
          ]
        : [{ type: "Posts", id: "UserId" }],
  }),
  getPosts: builder.query<Post[], null>({
    query: () => `/posts`,
    providesTags: (result) =>
      result
        ? [
            ...result.map(({ id }) => ({ type: "Posts", id } as const)),
            { type: "Posts", id: "PostId" },
          ]
        : [{ type: "Posts", id: "PostId" }],
  }),
  deletePostById: builder.mutation<null, number>({
    query: (id) => ({
      url: `/posts/${id}`,
      method: "DELETE",
    }),
    invalidatesTags: ["Posts"],
  }),
  updatePostById: builder.mutation<
    Promise<null>,
    { id: number; post: Partial<Post> }
  >({
    query: ({ id, post }) => ({
      url: `/posts/${id}`,
      method: "PUT",
      body: JSON.stringify(post),
    }),
    invalidatesTags: ["Posts"],
  }),
});
