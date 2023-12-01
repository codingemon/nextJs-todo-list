import { title } from "@/components/primitives";
import TodosTable from "@/components/todos-table";
import { fetchTodos } from "@/data/firestore";

// 서버 컴포넌트에서 API를 땡기자
async function fetchTodosApiCall() {
  console.log("fetchTodosApiCall called");
  const res = await fetch(`${process.env.BASE_URL}/api/todos/`, {
    cache: "no-store",
  });

  const contentTypeHeaderValue = res.headers.get("content-Type");

  // 수정: json인 경우에만 반환
  if (contentTypeHeaderValue?.includes("application/json")) {
    console.log("fetchTodosApiCall contentTypeCheck: ", contentTypeHeaderValue);
    return res.json();
  }

  return null;
}
// 서버 컴포넌트
export default async function TodosPage() {
  const response = await fetchTodosApiCall();

  // 수정: response가 null이 아니면서 data가 있는 경우에만 할당
  const fetchedTodos = response?.data ?? [];

  return (
    <div className="flex-col space-y-8">
      <h1 className={title()}>Todos</h1>
      <TodosTable todos={fetchedTodos} />
    </div>
  );
}
