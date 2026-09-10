import { useRef, useState } from "react";
import { TodoListItemsStyles, TodoTaskStyles, TodoListStyles, TodoLabelStyles, TodoItemStyles } from "./TodoList.styles";
import { useGlobalStore } from "../../../state/state.global";
import { useMovableObject } from "../../../hooks/useMovableObject";
// import type { Todo } from '../../types/config';



export const TodoList = () => {
    const todoList = useGlobalStore.use.todoList()
    const addTodo = useGlobalStore.use.addTodo()
    const completedTodo = useGlobalStore.use.completedTodo()
    const deleteTodo = useGlobalStore.use.deleteTodo();

    const [todoText, setTodoText] = useState<string>("");

    const handleAddtodo = () => {
        if (todoText.trim() !== '') {
            const todo = {
                id: crypto.randomUUID(),
                text: todoText,
                completed: false,
            }
            addTodo(todo);
            setTodoText("");
        }
    }

    const handleClickEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            handleAddtodo();
        }
    }

    const todoRef = useRef<HTMLDivElement>(null)
    const { startMoveHandler } = useMovableObject({ refObject: todoRef })

    const handleClickTodo = (e: React.MouseEvent<HTMLDivElement>) => {
        startMoveHandler(e);
    }

    return <TodoListStyles ref={todoRef}>
        <h2 onMouseDown={handleClickTodo}>Todo List</h2>
        <TodoTaskStyles>
            <input type="text" placeholder="Add a new todo..." value={todoText} onChange={e => setTodoText(e.target.value)} onKeyDown={handleClickEnter} />
            <button onClick={handleAddtodo}>Add Todo</button>
        </TodoTaskStyles>
        <TodoListItemsStyles>
            {todoList.map(todo => (
                <TodoItemStyles key={todo.id}>
                    <TodoLabelStyles>
                        <input type="checkbox" id={todo.id} checked={todo.completed} onChange={() => completedTodo(todo.id)} />
                        <label htmlFor={todo.id}>{todo.text}</label>
                    </TodoLabelStyles>
                    <button onClick={() => deleteTodo(todo.id)}>Delete</button>
                </TodoItemStyles>
            ))}
        </TodoListItemsStyles>
    </TodoListStyles>
}
