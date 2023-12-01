import { SVGProps } from "react";

export type IconSvgProps = SVGProps<SVGSVGElement> & {
  size?: number;
};

// Todo의 타입을 만들어줌
export type Todo = {
  id: string;
  title: string;
  is_done: boolean;
  created_at: Date;
};

export type CustomModalType = "detail" | "edit" | "delete";

export type FocusedTodoType = {
  focusedTodo: Todo | null;
  modalType: CustomModalType;
};
