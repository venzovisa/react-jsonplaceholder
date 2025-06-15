import { http, HttpResponse } from "msw";
import { baseUrl } from "../utils/utils";
import { mockPosts, mockTodos, mockUsers } from "./mocks";

export const handlers = [
  http.get(`${baseUrl}/users`, () => {
    return HttpResponse.json(mockUsers);
  }),

  http.put(`${baseUrl}/users/:id`, () => {
    return HttpResponse.json({ message: "OK" }, { status: 200 });
  }),

  http.get(`${baseUrl}/posts`, () => {
    return HttpResponse.json(mockPosts);
  }),

  http.delete(`${baseUrl}/posts/:id`, () => {
    return HttpResponse.json({ message: "OK" }, { status: 200 });
  }),

  http.put(`${baseUrl}/posts/:id`, () => {
    return HttpResponse.json({ message: "OK" }, { status: 200 });
  }),

  http.get(`${baseUrl}/todos`, () => {
    return HttpResponse.json(mockTodos);
  }),

  http.put(`${baseUrl}/todos/:id`, () => {
    return HttpResponse.json({ message: "OK" }, { status: 200 });
  }),
];
