"use client";
import React, { useState, useEffect } from "react";
import {
  Button,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Input,
  Checkbox,
  Link,
  CircularProgress,
  Switch,
} from "@nextui-org/react";
import { CustomModalType, FocusedTodoType, Todo } from "@/types";
import { useRouter } from "next/navigation";

const CustomModal = ({
  focusedTodo,
  modalType,
  onClose,
  onEdit,
  onDelete,
}: {
  focusedTodo: Todo;
  modalType: CustomModalType;
  onClose: () => void;
  onEdit: (id: string, title: string, isDone: boolean) => void;
  onDelete: (id: string) => void;
}) => {
  // 수정된 선택
  const [isDone, setIsDone] = useState<boolean>(focusedTodo.is_done);

  // 로딩 상태
  const [isLoading, setIsLoading] = useState(false);

  // 수정된 입력
  const [editedTodoInput, setEditedTodoInput] = useState<string>("");

  useEffect(() => {
    setEditedTodoInput(focusedTodo.title);
  }, []);

  const DetailModal = () => {
    return (
      <>
        <ModalHeader className="flex flex-col gap-1">
          HaeBoJa 수정하기
        </ModalHeader>
        <ModalBody>
          <p>
            <span className="font-bold">id : </span>
            {focusedTodo.id}
          </p>
          <p>
            <span className="font-bold">할일 내용 : </span>
            {focusedTodo.title}
          </p>

          <div className="flex py-2 space-x-2">
            {/* 할일 했는지 여부 체크 */}
            <span className="font-bold">완료여부 : </span>
            {`${isDone ? "완료" : "미완료"}`}
          </div>
          <div className="flex py-1  space-x-2">
            {/* 할일 했는지 여부 체크 */}
            <span className="font-bold">작성일 : </span>
            <p>{`${focusedTodo.created_at}`}</p>
          </div>
        </ModalBody>
        <ModalFooter>
          <Button color="default" onPress={onClose}>
            닫기
          </Button>
        </ModalFooter>
      </>
    );
  };

  const EditModal = () => {
    return (
      <>
        <ModalHeader className="flex flex-col gap-1">
          HaeBoJa 수정하기
        </ModalHeader>
        <ModalBody>
          <p>
            <span className="font-bold">id : </span>
            {focusedTodo.id}
          </p>
          <p>입력된 할일 : {editedTodoInput}</p>
          <Input
            autoFocus
            label="할일 내용"
            placeholder="할일을 입력해주세요"
            variant="bordered"
            defaultValue={focusedTodo.title}
            isRequired
            value={editedTodoInput}
            onValueChange={setEditedTodoInput}
          />

          <div className="flex py-2 space-x-2">
            {/* 할일 했는지 여부 체크 */}
            <span className="font-bold">완료여부 : </span>
            <Switch
              color="warning"
              defaultSelected={focusedTodo.is_done}
              onValueChange={setIsDone}
              aria-label="Automatic updates"
            ></Switch>
            {`${isDone ? "완료" : "미완료"}`}
          </div>
          <div className="flex py-1  space-x-2">
            {/* 할일 했는지 여부 체크 */}
            <span className="font-bold">작성일 : </span>
            <p>{`${focusedTodo.created_at}`}</p>
          </div>
        </ModalBody>
        <ModalFooter>
          <Button color="default" onPress={onClose}>
            닫기
          </Button>
          <Button
            color="warning"
            variant="flat"
            onPress={() => {
              setIsLoading(true);
              onEdit(focusedTodo.id, editedTodoInput, isDone);
            }}
          >
            {isLoading ? (
              <CircularProgress
                size="sm"
                color="warning"
                aria-label="Loading..."
              />
            ) : (
              "수정"
            )}
          </Button>
        </ModalFooter>
      </>
    );
  };

  const DeleteModal = () => {
    return (
      <>
        <ModalHeader className="flex flex-col gap-1">
          HaeBoJa 수정하기
        </ModalHeader>
        <ModalBody>
          <p>
            <span className="font-bold">id : </span>
            {focusedTodo.id}
          </p>
          <p>
            <span className="font-bold">할일 내용 : </span>
            {focusedTodo.title}
          </p>

          <div className="flex py-2 space-x-2">
            {/* 할일 했는지 여부 체크 */}
            <span className="font-bold">완료여부 : </span>
            {`${isDone ? "완료" : "미완료"}`}
          </div>
          <div className="flex py-1  space-x-2">
            {/* 할일 했는지 여부 체크 */}
            <span className="font-bold">작성일 : </span>
            <p>{`${focusedTodo.created_at}`}</p>
          </div>
        </ModalBody>
        <ModalFooter>
          <Button color="default" onPress={onClose}>
            닫기
          </Button>
          <Button
            color="warning"
            variant="flat"
            onPress={() => {
              setIsLoading(true);
              onDelete(focusedTodo.id);
            }}
          >
            {isLoading ? (
              <CircularProgress
                size="sm"
                color="danger"
                aria-label="Loading..."
              />
            ) : (
              "삭제"
            )}
          </Button>
        </ModalFooter>
      </>
    );
  };

  const getModal = (type: CustomModalType) => {
    switch (type) {
      case "detail":
        return DetailModal();
      case "delete":
        return DeleteModal();
      case "edit":
        return EditModal();
      default:
        break;
    }
  };

  return <>{getModal(modalType)}</>;
};

export default CustomModal;
