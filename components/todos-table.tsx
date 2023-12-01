"use client";

import React, { useState } from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Input,
  Button,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Spinner,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from "@nextui-org/react";

import { FocusedTodoType, Todo } from "@/types";
import { useRouter } from "next/navigation";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { VerticalDotsIcon } from "@/components/icons";
import { CustomModalType } from "@/types/index";
import CustomModal from "./custom-modal";

const TodosTable = ({ todos }: { todos: Todo[] }) => {
  // 할일 추가 가능 여부
  const [todoAddEnable, setTodoAddEnable] = useState(false);

  // 입력된 할일
  const [newTodoInput, setnewTodoInput] = useState("");

  // 로딩상태
  const [isLoding, setIsLoding] = useState<boolean>(false);

  // 띄우는 모달 상태
  const [currentModalData, setCurrentModalData] = useState<FocusedTodoType>({
    focusedTodo: null,
    modalType: "detail" as CustomModalType,
  });

  // 라우터
  const router = useRouter();

  // 할일 추가하기
  const addATodoHandler = async (title: string) => {
    if (!todoAddEnable) {
      return;
    }
    setTodoAddEnable(false);
    setIsLoding(true);
    await new Promise((f) => setTimeout(f, 600));
    await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/todos/`, {
      method: "post",
      body: JSON.stringify({
        title: title,
      }),
      cache: "no-store",
    });
    setnewTodoInput("");
    router.refresh();
    setIsLoding(false);
    notifySuccessEvent("할일을 추가했어요! 👨‍💻");
    console.log(`할일 추가완료 : ${newTodoInput}`);
    // const res = await fetch(`${process.env.BASE_URL}/api/todos/`);
  };

  // 할일 수정
  const editATodoHandler = async (
    id: string,
    editedTitle: string,
    edtiedIsDone: boolean
  ) => {
    setIsLoding(true);
    await new Promise((f) => setTimeout(f, 600));
    await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/todos/${id}`, {
      method: "post",
      body: JSON.stringify({
        title: editedTitle,
        is_done: edtiedIsDone,
      }),
      cache: "no-store",
    });
    router.refresh();
    setIsLoding(false);
    notifySuccessEvent("할일을 수정했어요! 👍");
    console.log(`할일 추가완료 : ${newTodoInput}`);
    // const res = await fetch(`${process.env.BASE_URL}/api/todos/`);
  };

  // 완료시 체크
  const applyIsDoneUI = (isDone: boolean) =>
    isDone ? "line-through text-gray-900/50 dark:text-white/40" : "";

  // 삭제
  const deleteATodoHandler = async (id: string) => {
    setIsLoding(true);
    await new Promise((f) => setTimeout(f, 600));
    await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/todos/${id}`, {
      method: "post",
      cache: "no-store",
    });
    router.refresh();
    setIsLoding(false);
    notifySuccessEvent("할일을 삭제했어요! 👍");
    console.log(`할일 삭제 완료 : ${newTodoInput}`);
    // const res = await fetch(`${process.env.BASE_URL}/api/todos/`);
  };

  const notifySuccessEvent = (msg: string) => toast.success(msg);

  // 모달
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const ModalComponent = () => {
    return (
      <Modal backdrop="blur" isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) =>
            currentModalData.focusedTodo && (
              <CustomModal
                focusedTodo={currentModalData.focusedTodo}
                modalType={currentModalData.modalType}
                onClose={onClose}
                onEdit={async (id, title, isDone) => {
                  console.log(id, title, isDone);
                  await editATodoHandler(id, title, isDone);
                  onClose();
                }}
                onDelete={async (id) => {
                  console.log("onDelete / id:", id);
                  await deleteATodoHandler(id);
                  onClose();
                }}
              />
            )
          }
        </ModalContent>
      </Modal>
    );
  };

  return (
    <div className="flex flex-col space-y-2">
      {ModalComponent()}
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
      <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
        <Input
          type="text"
          label="해보자! Go"
          value={newTodoInput}
          onValueChange={(changedInput) => {
            setnewTodoInput(changedInput);
            setTodoAddEnable(changedInput.length > 0);
          }}
        />
        {todoAddEnable ? (
          <Button
            color="warning"
            className="h-14"
            onPress={async () => {
              await addATodoHandler(newTodoInput);
            }}
          >
            Do it!
          </Button>
        ) : (
          <Popover placement="top">
            <PopoverTrigger>
              <Button color="default" variant="faded" className="h-14">
                Do it!
              </Button>
            </PopoverTrigger>
            <PopoverContent>
              <div className="px-1 py-2">
                <div className="text-small font-bold">🙋‍♂️</div>
                <div className="text-tiny">해야할일을 추가해주세요.</div>
              </div>
            </PopoverContent>
          </Popover>
        )}
      </div>
      <div className="h-6">
        {isLoding && <Spinner size="sm" color="warning" />}
      </div>

      <Table aria-label="Example static collection table">
        <TableHeader>
          <TableColumn>아이디</TableColumn>
          <TableColumn>할일내용</TableColumn>
          <TableColumn>완료여부</TableColumn>
          <TableColumn>생성일</TableColumn>
          <TableColumn>액션</TableColumn>
        </TableHeader>
        <TableBody emptyContent={"보여줄 데이터가 없어요. 작성해보세요 !"}>
          {todos &&
            todos.map((aTodo: Todo) => (
              <TableRow key={aTodo.id}>
                <TableCell className={applyIsDoneUI(aTodo.is_done)}>
                  {aTodo.id.slice(0, 4)}
                </TableCell>
                <TableCell className={applyIsDoneUI(aTodo.is_done)}>
                  {aTodo.title}
                </TableCell>
                <TableCell>
                  {aTodo.is_done ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="w-6 h-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="w-6 h-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636"
                      />
                    </svg>
                  )}
                </TableCell>
                <TableCell className={applyIsDoneUI(aTodo.is_done)}>
                  {`${aTodo.created_at}`}
                </TableCell>
                <TableCell>
                  <div className="relative flex justify-end items-center gap-2">
                    <Dropdown>
                      <DropdownTrigger>
                        <Button isIconOnly size="sm" variant="light">
                          <VerticalDotsIcon className="text-default-300" />
                        </Button>
                      </DropdownTrigger>
                      <DropdownMenu
                        onAction={(key) => {
                          console.log(`aTodo.id : ${aTodo.id} : key: ${key}`);
                          setCurrentModalData({
                            focusedTodo: aTodo,
                            modalType: key as CustomModalType,
                          });
                          onOpen();
                        }}
                      >
                        <DropdownItem key="detail">상세보기</DropdownItem>
                        <DropdownItem key="edit">수정</DropdownItem>
                        <DropdownItem key="delete">삭제</DropdownItem>
                      </DropdownMenu>
                    </Dropdown>
                  </div>
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default TodosTable;
