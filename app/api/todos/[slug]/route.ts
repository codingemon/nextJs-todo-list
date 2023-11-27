import { NextRequest, NextResponse } from "next/server";
import { fetchATodo, deleteATodo } from "@/data/firestore";

// 할일 단일 조회
export async function GET(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  // 엔드포인트 가져오기
  const searchParams = request.nextUrl.searchParams;

  const query = searchParams.get("query");

  const fetchedTodo = await fetchATodo(params.slug);

  if (fetchedTodo === null) {
    // 204는 페이지 없을때
    return new Response(null, { status: 204 });
  }

  const respones = {
    message: "단일 할일 가져오기",
    data: fetchedTodo,
  };

  return NextResponse.json(respones, { status: 200 });
}

// 할일 단일 삭제
// id가 존재해야
export async function DELETE(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  const deletedTodo = await deleteATodo(params.slug);

  if (deletedTodo === null) {
    return new Response(null, { status: 204 });
  }

  const respones = {
    message: "삭제 성공",
    data: deletedTodo,
  };

  return NextResponse.json(respones, { status: 200 });
}

// 할일 단일 수정
export async function POST(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  const { title, is_done } = await request.json();

  const editedTodo = {
    id: params.slug,
    title,
    is_done: false,
  };

  const respones = {
    message: "단일 할일 수정 성공",
    data: {
      editedTodo,
    },
  };

  return NextResponse.json(respones, { status: 200 });
}