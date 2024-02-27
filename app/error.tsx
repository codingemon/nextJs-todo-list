"use client";

import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div>
      <h2>페이지에 문제가 생겼어요!!</h2>
      <button onClick={() => reset()}>다시 시도해볼까요?</button>
    </div>
  );
}
