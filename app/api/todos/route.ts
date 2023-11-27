import { NextRequest, NextResponse } from "next/server";
// import dummyTodos from "@/data/dummy.json";
import { fetchTodos, addATodo } from "@/data/firestore";

// 할일 가져오기
export async function GET(request: NextRequest) {
  const fetchedTodos = await fetchTodos();
  const response = {
    message: "todos 다 가져오기",
    data: fetchedTodos,
  };

  return NextResponse.json(response, { status: 200 });
}

// 할일 추가
export async function POST(request: NextRequest) {
  const { title } = await request.json();

  const addedTodo = await addATodo({ title });

  const response = {
    message: "할일 추가 성공",
    data: addedTodo,
  };
  // 새로 만들면 201로 많이함
  return Response.json(response, { status: 201 });
}