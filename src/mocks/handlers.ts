import { http, HttpResponse } from "msw";
import { baseUrl } from "../utils/utils";

export const handlers = [
  http.get(`${baseUrl}/users`, () => {
    return HttpResponse.json([
      {
        id: 1,
        name: "Leanne Graham",
        username: "Bret",
        email: "Sincere@april.biz",
        address: {
          street: "Kulas Light",
          suite: "Apt. 556",
          city: "Gwenborough",
          zipcode: "92998-3874",
          geo: {
            lat: "-37.3159",
            lng: "81.1496",
          },
        },
        phone: "1-770-736-8031 x56442",
        website: "hildegard.org",
        company: {
          name: "Romaguera-Crona",
          catchPhrase: "Multi-layered client-server neural-net",
          bs: "harness real-time e-markets",
        },
      },
    ]);
  }),

  http.get(`${baseUrl}/posts`, () => {
    return HttpResponse.json([
      {
        userId: 1,
        id: 1,
        title:
          "sunt aut facere repellat provident occaecati excepturi optio reprehenderit",
        body: "quia et suscipit suscipit recusandae",
      },
      {
        userId: 1,
        id: 2,
        title: "qui est esse",
        body: "est rerum tempore vitae sequi sint",
      },
    ]);
  }),

  http.delete(`${baseUrl}/posts/:id`, () => {
    return HttpResponse.json({ message: "OK" }, { status: 200 });
  }),

  http.put(`${baseUrl}/posts/:id`, () => {
    return HttpResponse.json({ message: "OK" }, { status: 200 });
  }),

  http.get(`${baseUrl}/todos`, () => {
    return HttpResponse.json([
      {
        userId: 1,
        id: 1,
        title: "delectus aut autem",
        completed: false,
      },
      {
        userId: 1,
        id: 2,
        title: "quis ut nam facilis et officia qui",
        completed: false,
      },
    ]);
  }),
];
