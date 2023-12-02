import { title } from "@/components/primitives";
import TodosTable from "@/components/todos-table";
import { Todo } from "@/types";

// 서버 컴포넌트에서 API를 땡기자
async function fetchTodosApiCall() {
  console.log("fetchTodosApiCall called");
  const res = await fetch(`${process.env.BASE_URL}/api/todos/`, {
    cache: "no-store",
  });

  const contentTypeHeaderValue = res.headers.get("content-Type");

  // 수정중 json
  if (contentTypeHeaderValue?.includes("text/html")) {
    console.log(
      "fetchTodosApiCall / contentTypeCheck: ",
      contentTypeHeaderValue
    );
    return null;
  }

  return res.json();
}

// 서버 컴포넌트
export default async function TodosPage() {
  const response = await fetchTodosApiCall();

  const fetchedTodos = response?.data ?? [];

  return (
    <div className="flex-col space-y-8">
      <h1 className={title()}>Todos</h1>
      <TodosTable todos={fetchedTodos} />
    </div>
  );
}
