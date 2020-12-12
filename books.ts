import { Application, Router } from "https://deno.land/x/oak/mod.ts";

const books = new Map<string, any>();
books.set("1", {
  id: 1,
  title: "The Hound of Baskervilles",
  author: "Conan Dayle, Arthur",
  nickname: "arthur",
});

const router = new Router();
router
  .get("/", ({ response }) => {
    response.body = "Hello World!";
  })
  .get("/book", ({ response }) => {
    response.body = Array.from(books.values());
  })
  .get("/book/:id", ({ response, params }) => {
    response.body =
      params?.id && books.has(params.id)
        ? books.get(params.id)
        : "Book not found.";
  });

const app = new Application();
app.use(router.routes());
app.use(router.allowedMethods());

await app.listen({ port: 8000 });
