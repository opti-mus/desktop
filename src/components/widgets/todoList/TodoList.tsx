import { useState } from "react";
import { TodoTaskStyles, TodoListStyles } from "./TodoList.styles";
import { TodoListItem } from "../todoListIterm/TodoListItem";
import type { Todo } from "../../../types/config";
import { useBlockStore } from "../../../state/BlockStoreSlice";

type TodoListProps = {
    id: string;
}

export const TodoList = ({ id }: TodoListProps) => {

    const blockZIndices = useBlockStore((state) => state.blockZIndices);
    const myZIndex = blockZIndices[id] || 1;

    const [todoList, setTodoList] = useState<Todo[]>([]);
    const [todoText, setTodoText] = useState<string>("");

    const handleAddtodo = () => {
        if (todoText.trim() !== '') {
            const todo = {
                id: crypto.randomUUID(),
                text: todoText,
                completed: false,
            }
            setTodoList([...todoList, todo]);
            setTodoText("");
        }
    }

    const handleClickEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            handleAddtodo();
        }
    }

    return <TodoListStyles
        $zIndex={myZIndex}
        data-widjet>
        <h2>Todo List</h2>
        <TodoTaskStyles>
            <input type="text" placeholder="Add a new todo..." value={todoText} onChange={e => setTodoText(e.target.value)} onKeyDown={handleClickEnter} />
            <button onClick={handleAddtodo}>Add Todo</button>
        </TodoTaskStyles>
        <TodoListItem todoList={todoList} setTodoList={setTodoList} />
    </TodoListStyles>
}
