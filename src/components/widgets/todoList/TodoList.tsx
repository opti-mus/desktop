import { useRef, useState } from "react";
import { TodoTaskStyles, TodoListStyles } from "./TodoList.styles";
import { useMovableObject } from "../../../hooks/useMovableObject";
import { TodoListItem } from "../todoListIterm/TodoListItem";
import type { Todo } from "../../../types/config";
import { useBlockStore } from "../../../state/BlockStoreSlice";



export const TodoList = () => {

    const blockZIndices = useBlockStore((state) => state.blockZIndices);
    const myZIndex = blockZIndices['widjet-todo-list'] || 1;

    const [todoList, setTodoList] = useState<Todo[]>([]);
    const [todoText, setTodoText] = useState<string>("");

    const todoRef = useRef<HTMLDivElement>(null)
    const { startMoveHandler } = useMovableObject({ refObject: todoRef })

    const handleClickTodo = (e: React.MouseEvent<HTMLDivElement>) => {
        startMoveHandler(e);
    }

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

    const completedTodo = (id: string) => {
        const completedTodo = todoList.map(t => t.id === id ? { ...t, completed: !t.completed } : t);
        setTodoList([...completedTodo])
    }

    const deleteTodo = (id: string) => {
        const newTodoList = todoList.filter(t => t.id !== id);
        setTodoList([...newTodoList])
    }

    const handleClickEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            handleAddtodo();
        }
    }

    return <TodoListStyles ref={todoRef} id="widjet-todo-list" style={{ zIndex: myZIndex }}>
        <h2 onMouseDown={handleClickTodo}>Todo List</h2>
        <TodoTaskStyles>
            <input type="text" placeholder="Add a new todo..." value={todoText} onChange={e => setTodoText(e.target.value)} onKeyDown={handleClickEnter} />
            <button onClick={handleAddtodo}>Add Todo</button>
        </TodoTaskStyles>
        <TodoListItem todoList={todoList} completedTodo={completedTodo} deleteTodo={deleteTodo} />
    </TodoListStyles>
}
