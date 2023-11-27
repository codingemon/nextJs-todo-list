import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  getDocs,
  setDoc,
  getDoc,
  doc,
  Timestamp,
  deleteDoc,
} from "firebase/firestore";

const firebaseConfig = {
  // 키를 숨김
  apiKey: process.env.API_KEY,
  authDomain: process.env.AUTH_DOMAIN,
  projectId: process.env.PROJECT_ID,
  storageBucket: process.env.STORAGE_BUCKET,
  messagingSenderId: process.env.MESSAGING_SENDER_ID,
  appId: process.env.APP_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// 모든 할일 가져오기
export async function fetchTodos() {
  //  모든 문서가져오기
  const querySnapshot = await getDocs(collection(db, "todos"));

  if (querySnapshot.empty) {
    return [];
  }

  const fetchedTodos = [];

  querySnapshot.forEach((doc) => {
    // doc.data() is never undefined for query doc snapshots
    console.log(doc.id, " => ", doc.data());
    // 가지고 온 todo
    const aTodo = {
      id: doc.id,
      title: doc.data()["title"],
      is_done: doc.data()["is_done"],
      created_at: doc.data()["created_at"].toDate().toLocaleTimeString("ko"),
    };
    fetchedTodos.push(aTodo);
  });
  return fetchedTodos;
}

// 할일 추가
export async function addATodo({ title }) {
  const newTodoRef = doc(collection(db, "todos"));

  const createdAtTimestamp = Timestamp.fromDate(new Date());

  const newTodoData = {
    id: newTodoRef.id,
    title: title,
    is_done: false,
    created_at: createdAtTimestamp,
  };

  await setDoc(newTodoRef, newTodoData);

  return {
    id: newTodoRef.id,
    title: title,
    is_done: false,
    created_at: createdAtTimestamp.toDate(),
  };
}

// 단일 할일 가져오기
export async function fetchATodo(id) {
  if (id === null) {
    return null;
  }
  const todoDocRef = doc(db, "todos", id);
  const todoDocSnap = await getDoc(todoDocRef);

  if (todoDocSnap.exists()) {
    console.log("Document data:", todoDocSnap.data());

    const fetchedTodo = {
      id: todoDocSnap.id,
      title: todoDocSnap.data()["title"],
      is_done: todoDocSnap.data()["is_done"],
      created_at: todoDocSnap.data()["created_at"].toDate(),
    };

    return fetchedTodo;
  } else {
    console.log("No such document!");
    return null;
  }
}

// 단일 할일 삭제
export async function deleteATodo(id) {
  const fetchedTodo = await fetchATodo(id);

  if (fetchedTodo === null) {
    return null;
  }

  await deleteDoc(doc(db, "todos", id));
  return fetchedTodo;
}

module.export = { fetchTodos, addATodo, fetchATodo, deleteATodo };