import { title } from "@/components/primitives";
import TodosTable from "@/components/todos-table";
import { fetchTodos } from "@/data/firestore";

// 서버 컴포넌트에서 API를 땡기자
async function fetchTodosApiCall() {
  console.log("fetchTodosApiCall");
  const res = await fetch(`${process.env.BASE_URL}/api/todos/`);
  return res.json();
}

// 서버 컴포넌트
export default async function TodosPage() {
  const response = await fetchTodosApiCall();

  return (
    <div className="flex-col space-y-8">
      <h1 className={title()}>Todos</h1>
      <TodosTable todos={response.data ?? []} />
    </div>
  );
}
