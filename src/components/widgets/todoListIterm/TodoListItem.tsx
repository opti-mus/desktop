import { TodoListItemsStyles, TodoLabelStyles, TodoItemStyles, TodoItemCheckboxStyles } from "./TodoListItem.styles";
import type { Todo } from "../../../types/config";

type TodoListItemProps = {
    todoList: Todo[];
    completedTodo: (id: string) => void;
    deleteTodo: (id: string) => void;
}

export const TodoListItem = ({ todoList, completedTodo, deleteTodo }: TodoListItemProps) => {

    return <TodoListItemsStyles>
        {todoList.map(todo => (
            <TodoItemStyles key={todo.id}>
                <TodoLabelStyles>
                    <TodoItemCheckboxStyles id={todo.id} checked={todo.completed} onChange={() => completedTodo(todo.id)} />
                    <label htmlFor={todo.id}>{todo.text}</label>
                </TodoLabelStyles>
                <button onClick={() => deleteTodo(todo.id)}>Delete</button>
            </TodoItemStyles>
        ))}
    </TodoListItemsStyles>
}