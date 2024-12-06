import TodoItem from "./TodoItem";
import styles from "../css/TodoList.module.css";

interface Todo {
  id: number;
  text: string;
  completed: boolean;
  time: string;
}

interface TodoListProps {
  todos: Todo[];
  updateTodo: (id: number, text: string) => void;
  toggleComplete: (id: number) => void;
  deleteTodo: (id: number) => void;
}

const TodoList = ({ todos, updateTodo, toggleComplete, deleteTodo }: TodoListProps) => {
  return (
    <ul className={styles.ul}>
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          {...todo}
          updateTodo={updateTodo}
          toggleComplete={toggleComplete}
          deleteTodo={deleteTodo}
        />
      ))}
    </ul>
  );
};

export default TodoList;
