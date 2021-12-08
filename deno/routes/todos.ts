import { Router } from "https://deno.land/x/oak/mod.ts";
import { Bson } from "https://deno.land/x/mongo@v0.28.1/mod.ts";
import { getDb } from "../helpers/db_client.ts";
const router = new Router();

interface Todo {
  id?: string;
  text: string;
}

let todos: Todo[] = [];

router.get("/todos", async (ctx) => {
  const todos = await getDb()
    .collection("todos")
    .find({}, { noCursorTimeout: false })
    .toArray();
  // const transformedTodos = todos.map((todo) => {
  //   return { id: todo._id, text: todo.text };
  // });
  ctx.response.body = { todos };
});

router.get("/todos/:todoId", async (ctx) => {
  const tid = ctx.params.todoId;
  const todo = await getDb()
    .collection("todos")
    .findOne({ _id: new Bson.ObjectID(tid) }, { noCursorTimeout: false });

  ctx.response.body = { todo };
});

router.post("/todos", async (ctx) => {
  const data = await ctx.request.body();
  const value = await data.value;
  const newTodo: Todo = {
    text: value.text,
  };
  const id = await getDb().collection("todos").insertOne(newTodo);

  newTodo.id = id.$oid;

  ctx.response.body = { message: "Created todo!", todo: newTodo };
});

router.put("/todos/:todoId", async (ctx) => {
  const tid = ctx.params.todoId!;
  const data = await ctx.request.body();
  const value = await data.value;
  await getDb()
    .collection("todos")
    .updateOne({ _id: new Bson.ObjectID(tid) }, { $set: { text: value.text } });
  ctx.response.body = { message: "Updated todo" };
});

router.delete("/todos/:todoId", async (ctx) => {
  const tid = ctx.params.todoId!;
  await getDb()
    .collection("todos")
    .deleteOne({ _id: new Bson.ObjectID(tid) });
  ctx.response.body = { message: "Deleted todo" };
});

export default router;
