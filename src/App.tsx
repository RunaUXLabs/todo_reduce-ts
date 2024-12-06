import { useReducer, useEffect, useCallback } from "react";
import TodoInput from "./components/TodoInput";
import TodoList from "./components/TodoList";
import styles from "./css/App.module.css";

// Todo 타입 정의
interface Todo {
  id: number;
  time: string;
  text: string;
  completed: boolean;
}

// 액션 타입 정의
type Action =
  | { type: "ADD_TODO"; payload: string }
  | { type: "UPDATE_TODO"; payload: { id: number; text: string } }
  | { type: "TOGGLE_COMPLETE"; payload: number }
  | { type: "DELETE_TODO"; payload: number };

const todoReducer = (state: Todo[], action: Action): Todo[] => {
  const dayOption: Intl.DateTimeFormatOptions = {
    year: "2-digit",
    month: "long",
    day: "numeric",
    weekday: "long",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  };
  const formatDate = (date: Date): string => {
    return date.toLocaleString("ko-KR", dayOption);
  };

  switch (action.type) {
    case "ADD_TODO":
      return [
        ...state,
        {
          id: Date.now(),
          time: formatDate(new Date()),
          text: action.payload,
          completed: false,
        },
      ];
    case "UPDATE_TODO":
      return state.map((todo) =>
        todo.id === action.payload.id
          ? { ...todo, text: action.payload.text, time: formatDate(new Date()) }
          : todo
      );
    case "TOGGLE_COMPLETE":
      return state.map((todo) =>
        todo.id === action.payload ? { ...todo, completed: !todo.completed } : todo
      );
    case "DELETE_TODO":
      return state.filter((todo) => todo.id !== action.payload);
    default:
      return state;
  }
};

function App() {
  const [todos, dispatch] = useReducer(todoReducer, [], () => {
    const storedTodos = localStorage.getItem("todos");
    return storedTodos ? JSON.parse(storedTodos) : [];
  });

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  // dispatch로 설정한 CRUD 함수
  const addTodo = useCallback((text: string) => dispatch({ type: "ADD_TODO", payload: text }), []);
  const updateTodo = useCallback(
    (id: number, text: string) => dispatch({ type: "UPDATE_TODO", payload: { id, text } }),
    []
  );
  const toggleComplete = useCallback((id: number) => dispatch({ type: "TOGGLE_COMPLETE", payload: id }), []);
  const deleteTodo = useCallback((id: number) => dispatch({ type: "DELETE_TODO", payload: id }), []);

  return (
    <div className={styles.app}>
      <h1>useReducer를 사용한<br />To-Do List(Typescript)</h1>
      <TodoInput addTodo={addTodo} />
      <TodoList
        todos={todos}
        updateTodo={updateTodo}
        toggleComplete={toggleComplete}
        deleteTodo={deleteTodo}
      />
    </div>
  );
}

export default App;
