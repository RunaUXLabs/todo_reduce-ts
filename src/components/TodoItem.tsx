import { useState } from "react";
import styles from "../css/TodoItem.module.css";

interface TodoItemProps {
  id: number;
  text: string;
  completed: boolean;
  time: string;
  updateTodo: (id: number, text: string) => void;
  toggleComplete: (id: number) => void;
  deleteTodo: (id: number) => void;
}

const TodoItem = ({ id, text, completed, time, updateTodo, toggleComplete, deleteTodo }: TodoItemProps) => {
  const [editMode, setEditMode] = useState(false);
  const [editedText, setEditedText] = useState(text);

  const handleEdit = () => {
    if (editMode && editedText.trim()) {
      updateTodo(id, editedText);
    }
    setEditMode(!editMode);
  };

  // Enter 키 입력 감지
  const handleKeyDown = (e: { keyCode: number; key: string; }) => {
    if (e.keyCode === 229) return;
    if (e.key === 'Enter') handleEdit();
  };

  return (
    <li className={styles.li}>
      <input type="checkbox" checked={completed} onChange={() => toggleComplete(id)} />
      {editMode ? (
        <>
          <input
            type="text"
            value={editedText}
            onChange={(e) => setEditedText(e.target.value)}
            onKeyDown={handleKeyDown}
          />
        </>
      ) : (
        <div className={completed ? styles.completed : styles.notCompleted} >
          <span>{text}</span>
          <span>{time}</span>
        </div>
      )}
      <button type="button" onClick={handleEdit}>
        {editMode ? '수정 완료' : '수정'}
      </button>
      <button type="button" onClick={() => deleteTodo(id)}>삭제</button>
    </li>
  );
};

export default TodoItem;
