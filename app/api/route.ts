import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const respones = {
    message: "반가워",
    data: "오늘도 코딩을 해보자",
  };

  return Response.json(respones, { status: 200 });
}
