import { TodoItem } from "@/components/TodoItem";
import { prisma } from "@/db";
import Link from "next/link";

export type TodoType = {
  id: string;
  title: string;
  complete: boolean;
  deleted: boolean;
};

export default async function Home() {
  const todos = await getTodos();
  // await prisma.todo.create({data : {title: "test", complete: true}})

  return (
    <>
      <header className="mt-16 flex justify-between items-center pb-5">
        <h1 className="classNamelg lg:text-5xl font-bold tracking-tight text-black-500">Your Todo's</h1>
        <Link
          href="/new"
          className="border border-slate-300 text-slate-300 rounded-0 px-2 py-1 hover:bg-zinc-700 focus-within:bg-zinc-700 outline-none"
        >
          ADD NEW
        </Link>
      </header>
      <ul className="pl-4">
        {todos.map((todo) => (
          // <li key={todo.id}> {todo.title} </li>

          <TodoItem
            key={todo.id}
            {...todo}
            toggleTodo={toggleTodo}
            deleteTodo={deleteTodo}
          />
        ))}
      </ul>
    </>
  );
}

async function toggleTodo(id: string, complete: boolean) {
  "use server";
  await prisma.todo.update({
    where: {
      id: id,
    },
    data: {
      complete: complete,
    },
  });
}

async function deleteTodo(id: string): Promise<TodoType> {
  "use server";
  const deletedTodo = await prisma.todo.update({
    where: {
      id: id,
    },
    data: {
      deleted: true,
    },
  });

  return deletedTodo;
}

function getTodos() {
  return prisma.todo.findMany({
    where: {
      deleted: {
        not: true,
      },
    },
    orderBy: {
      createdAt: "asc",
    }
  });
}
