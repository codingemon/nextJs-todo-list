import { title } from "@/components/primitives";
import { Counter } from "@/components/counter";

// 서버 컴포넌트에서 API를 땡기자
async function getInitialCount() {
  console.log("getInitialCount");
  await new Promise((f) => setTimeout(f, 3000));
  return 10;
}

// 서버 컴포넌트
export default async function CounterPage() {
  const fetchedInitialCount = await getInitialCount();

  return (
    <div className="flex flex-col space-y-16">
      <h1 className={title()}>Counter</h1>
      <Counter initialCount={10}>
        <h1> 서버 컴포넌트에서 들어옴</h1>
      </Counter>
    </div>
  );
}
