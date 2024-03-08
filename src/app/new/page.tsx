import { prisma } from "@/db";
import { redirect } from "next/navigation";
import Link from "next/link";

export default function New() {
  return (
    <>
      <header className="flex pb-5">
        <h1 className="classNamelg lg:text-5xl font-bold tracking-tight text-black-500">New Todo: </h1>
      </header>
      <form action={createTodoItem} className="flex gap-2 flex-col">
        <input
          type="text"
          name="title"
          placeholder="Create a new todo item"
          className="border border-slate-300 text-slate-300 rounded px-2 py-1 hover:bg-zinc-700 focus-within:bg-zinc-700 focus-within:border-zinc-700 bg-transparent outline-none"
        ></input>
        <div className="flex gap-1 justify-end">
          <Link
            href=".."
            className="border border-slate-300 text-slate-300 rounded px-2 py-1 hover:bg-zinc-700 focus-within:bg-zinc-700 outline-none"
          >
            CANCEL
          </Link>
          <button
            type="submit"
            className="border border-slate-300 text-slate-300 rounded px-2 py-1 hover:bg-zinc-700 focus-within:bg-zinc-700 outline-none"
          >
            SAVE
          </button>
        </div>
      </form>
    </>
  );
}

async function createTodoItem(data: FormData) {
  "use server";

  const title = data.get("title")?.valueOf();

  if (typeof title !== "string" || title.length === 0) {
    return new Error("Invalid Title");
  }

  await prisma.todo.create({ data: { title: title, complete: false } });

  redirect("/");
}
	