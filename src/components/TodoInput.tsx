import { useState } from "react";
import style from "../css/TodoInput.module.css";

interface TodoInputProps {
  addTodo: (text: string) => void;
}

const TodoInput = ({ addTodo }: TodoInputProps) => {
  const [input, setInput] = useState<string>("");

  const handleAdd = () => {
    if (input.trim()) {
      addTodo(input);
      setInput("");
    }
  };

  const handleKeyDown = (e: { keyCode: number; key: string; }) => {
    if (e.keyCode === 229) return;
    if (e.key === "Enter") handleAdd();
  };

  return (
    <div className={style.container}>
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="오늘 해야하는 일을 등록해 주세요🙌"
        className={style.todoInput}
      />
      <button type="button" onClick={handleAdd}>할 일 등록</button>
    </div>
  );
};

export default TodoInput;
